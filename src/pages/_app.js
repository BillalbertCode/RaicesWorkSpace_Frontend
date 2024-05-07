import Header from '@/components/Layout/Header';
import { ArticleProvider } from '@/contexts/ArticleContext';
import { TokenProvider } from '@/contexts/TokenContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css'
function MyApp({ Component, pageProps }) {
  return (
    <TokenProvider>
      <ArticleProvider>
        <Header></Header>
        <Component {...pageProps} />;
      </ArticleProvider>
    </TokenProvider>
  )
}

export default MyApp;