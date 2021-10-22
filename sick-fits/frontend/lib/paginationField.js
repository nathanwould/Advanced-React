import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    // tells Apollo we will take care of everything
    keyArgs: false,
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cache! Gonna send them to Apollo!`
        // );
        return items;
      }
      // fallback to network
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      return merged;
      // console.log(args)
    },
  };
}
