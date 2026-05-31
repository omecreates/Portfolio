require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Profile endpoint
app.get('/api/profile', (req, res) => {
  res.json({
    name: "PD Shaheed Ali",
    role: "ECE Engineer & Embedded Systems Developer",
    tagline: "Bridging physical circuits and low-level code to build robust hardware-software ecosystems.",
    bio: "I am an Electronics and Communication Engineering student at VIT (Vellore Institute of Technology). I specialize in designing micro-controller firmware, real-time operating systems (FreeRTOS), FPGA digital logic, and high-quality PCB routing. I build reliable devices that solve real-world automation and instrumentation challenges.",
    stats: {
      institution: "VIT University",
      graduationYear: "2027",
      location: "Chennai, India"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/pdshahidali/",
      github: "https://github.com/omecreates"
    }
  });
});

// Projects endpoint
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: "IoT Smart Grid Monitor Node",
      description: "ARM Cortex-M based node analyzing AC lines in real-time. Features SPI sensor communication, local frequency/voltage deviation math, and cellular MQTT transmission.",
      techBadges: ["Embedded C", "FreeRTOS", "ARM Cortex", "MQTT", "PCB Design"],
      githubUrl: "https://github.com/omecreates/smart-grid-node",
      featured: true
    },
    {
      id: 2,
      title: "Autonomous Maze-Solving FPGA Robot",
      description: "Built micro-ROS node on an ESP32 interacting with digital state machines inside an Intel Cyclone FPGA. Uses ultrasonic arrays and flood-fill logic.",
      techBadges: ["Verilog", "micro-ROS", "FPGA", "Control Systems"],
      githubUrl: "https://github.com/omecreates/maze-fpga-bot",
      featured: true
    },
    {
      id: 3,
      title: "Wearable BLE ECG Monitor",
      description: "Ultra-low power wearable ECG using ESP32-S3 and AD8232 frontend. Runs IIR filters to clean noise, and streams data over BLE to a custom mobile dashboard.",
      techBadges: ["ESP32-S3", "BLE", "AD8232", "DSP", "Mobile App"],
      githubUrl: "https://github.com/omecreates/ble-ecg-wearable",
      featured: false
    },
    {
      id: 4,
      title: "Digitally Controlled Buck-Boost Converter",
      description: "A 4-layer PCB for a 100W synchronous buck-boost converter. Closed-loop PID controller designed in STM32 to regulate output voltage with sub-millisecond response.",
      techBadges: ["KiCad", "STM32", "Power Electronics", "PID Control"],
      githubUrl: "https://github.com/omecreates/sync-buck-boost",
      featured: false
    }
  ]);
});

// Skills endpoint
app.get('/api/skills', (req, res) => {
  res.json([
    {
      category: "Hardware & PCB Design",
      items: ["KiCad", "Altium Designer", "High-speed Routing", "Analog Frontends", "I2C / SPI / UART / CAN"]
    },
    {
      category: "Embedded Firmware",
      items: ["Embedded C/C++", "FreeRTOS", "Verilog (FPGA)", "STM32 CubeMX", "ESP-IDF / Arduino"]
    },
    {
      category: "IoT & Networking",
      items: ["MQTT / CoAP", "BLE / Wi-Fi", "micro-ROS", "HTTP/REST APIs"]
    },
    {
      category: "Tools & Software",
      items: ["Git / GitHub", "Python", "Linux Bash", "MATLAB & Simulink"]
    }
  ]);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  const messageData = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()
  };

  // Set up Nodemailer transporter using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email to portfolio owner
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact: ${subject} from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #E63946; margin-bottom: 4px;">New Portfolio Message</h2>
        <hr style="border: none; border-top: 1px solid #eee; margin-bottom: 20px;" />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 12px; border-left: 4px solid #E63946; border-radius: 4px;">${message}</p>
      </div>
    `,
    replyTo: email
  };

  // Auto-reply to sender
  const autoReplyOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;">
        <h2 style="color: #E63946;">Hey ${name}, got your message!</h2>
        <p>Thanks for reaching out. I've received your message and will get back to you as soon as possible.</p>
        <p style="color: #888; font-size: 13px; margin-top: 32px;">— PD Shaheed Ali</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyOptions);
    console.log(`[Email Sent] From: ${name} (${email}) - Subj: ${subject}`);
  } catch (emailError) {
    console.error("Failed to send email:", emailError);
    return res.status(500).json({ error: "Failed to send email. Please check server email configuration." });
  }

  // Save message to messages.json as backup
  const filePath = path.join(__dirname, 'messages.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let messages = [];
    if (!err && data) {
      try {
        messages = JSON.parse(data);
      } catch (e) {
        messages = [];
      }
    }
    messages.push(messageData);
    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (writeErr) => {
      if (writeErr) console.error("Failed to save message to file:", writeErr);
    });
  });

  return res.status(200).json({ success: "Message sent successfully! PD Shaheed Ali will contact you soon." });
});

// ✅ FIXED: bind to 0.0.0.0 for Render compatibility
function startServer(port) {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server is successfully running on http://0.0.0.0:${port}`);
  });

  server.on('error', (err) => {
    if ((err.code === 'EACCES' || err.code === 'EADDRINUSE') && port < 5010) {
      console.warn(`Port ${port} is blocked or in use. Retrying on port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server startup failed:', err);
    }
  });
}

startServer(PORT);