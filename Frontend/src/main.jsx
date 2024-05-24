import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomProvider>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </CustomProvider>
);