import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './components/ThemeContext/ThemeContext';
import './i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ленивая загрузка компонентов
const App = React.lazy(() => import('./App'));

// Создание корня и рендеринг
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </Suspense>
);
