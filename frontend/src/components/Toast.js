export function initToastContainer() {
  if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

export function showToast(message, type = 'success', duration = 5000) {
  initToastContainer();
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <span class="toast-close">&times;</span>
  `;
  
  container.appendChild(toast);
  
  const closeBtn = toast.querySelector('.toast-close');
  
  const removeToast = () => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  closeBtn.addEventListener('click', removeToast);
  
  // Auto-remove after duration
  setTimeout(removeToast, duration);
}
