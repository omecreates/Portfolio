import './styles/variables.css';
import './styles/main.css';
import { renderHome } from './pages/Home';
import './components/BackgroundAnimations';

const appElement = document.querySelector('#app');
if (appElement) {
  renderHome(appElement).catch(err => {
    console.error('[Portfolio] Failed to render page:', err);
    appElement.innerHTML = `<div style="color:#E63946;font-family:monospace;padding:2rem;">
      <h2>Render Error</h2><pre>${err.message}</pre>
    </div>`;
  });
}
