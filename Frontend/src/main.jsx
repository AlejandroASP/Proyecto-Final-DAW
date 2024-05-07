import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomProvider>
    <App />
  </CustomProvider>
)