import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '@/components/Layout';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function MyAppWithQueryClient({ Component, pageProps }) {
  return (
    <>
      <Toaster
          position="top-center"
          reverseOrder={true}
        />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyAppWithQueryClient;
