import { NextPage } from 'next';
import { useGetProductQuery } from '../services/productsApi';
import { wrapper } from '../store/store';
import { productsApi } from '../services/productsApi';

const Home: NextPage = () => {
  const { data, error, isLoading } = useGetProductQuery(1);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading product.</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </main>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    // 1. Initiate the query
    store.dispatch(productsApi.endpoints.getProduct.initiate(1));
    // 2. Await all running queries via the util namespace
    await Promise.all(store.dispatch(productsApi.util.getRunningQueriesThunk()));
    return { props: {} };
  }
);


export default Home;
