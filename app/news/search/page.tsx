import { getNewsList } from '@/app/_libs/microcms';
import { NEWS_LISTT_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import SearchField from '@/app/_components/SearchField';

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const props = await searchParams;
  const { contents: news } = await getNewsList({
    limit: NEWS_LISTT_LIMIT,
    q: props.q,
  });
  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
