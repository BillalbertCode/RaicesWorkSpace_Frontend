import Header from '@/components/Layout/Header';
import { ArticleProvider } from '@/contexts/ArticleContext';
import { TokenProvider } from '@/contexts/TokenContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
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
              border: '2px solid #4ca1da'
            },
            
          }}
        />
      </ArticleProvider>
    </TokenProvider>
  )
}

export default MyApp;