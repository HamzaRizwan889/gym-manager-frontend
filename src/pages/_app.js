// pages/_app.js
import { ApolloProvider } from '@apollo/client';
import client from '../../utils/apolloClient';
import './styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
