import { dehydrate, QueryClient } from '@tanstack/react-query';
// import { getTodos } from '../..';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(['todos'], () => getTodos());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
