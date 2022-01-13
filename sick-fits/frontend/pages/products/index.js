import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import Search from '../../components/Search';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <>
      <Search />
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
}
