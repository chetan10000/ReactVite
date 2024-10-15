import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'




// Import all of Bootstrap's JS
const gameHistoryKey = 'gameHistory';
localStorage.setItem(gameHistoryKey,"");

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
