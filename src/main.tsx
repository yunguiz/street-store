import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // <-- Essencial para carregar os estilos

createRoot(document.getElementById('root')!).render(<App />);