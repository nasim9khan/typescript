import { NextPage } from 'next';
import { useGetProductQuery } from '../services/productsApi';

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

export default Home;
