import 'normalize.css';
import { LoaderProvider } from '../contexts/LoaderContext';
import { UserProvider } from '../contexts/UserContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
      <LoaderProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </LoaderProvider>
  )
}

export default MyApp
