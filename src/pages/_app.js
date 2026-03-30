import Header from '@/components/Layout/Header';
import { ArticleProvider } from '@/contexts/ArticleContext';
import { TokenProvider } from '@/contexts/TokenContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [mockingReady, setMockingReady] = useState(false);

  useEffect(() => {
    async function initMocks() {
      // Solo en el navegador
      if (typeof window !== 'undefined') {
        // Importación dinámica para evitar errores en el servidor durante el build
        const { worker } = await import('../mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js',
          },
        });
        setMockingReady(true);
      }
    }
    
    initMocks();
  }, []);

  // No renderizamos la app hasta que MSW esté listo para interceptar
  if (!mockingReady) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-primary">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Iniciando Demo...</span>
        </div>
      </div>
    );
  }

  return (
    <TokenProvider>
      <ArticleProvider>
        <Header></Header>
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            duration: 5000,
            style:{
              border: '2px solid #2834e2',
              background: 'linear-gradient(90deg, rgba(62,58,180,1) 0%, rgba(135,29,253,1) 100%)',
              color:'#fff'
            },
          }}
        />
      </ArticleProvider>
    </TokenProvider>
  )
}

export default MyApp;