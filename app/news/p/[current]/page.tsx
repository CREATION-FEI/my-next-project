import { notFound } from 'next/navigation';
import { getCategoryDetail, getNewsList } from '@/app/_libs/microcms';
import NewsList from '@/app/_components/NewsList';
import Pagination from '@/app/_components/Pagination';
import { NEWS_LISTT_LIMIT } from '@/app/_constants';

type Props = {
  params: {
    id: string;
    current: string;
  };
};

export default async function Page({ params }: Props) {
  const props = await params;
  const current = parseInt(props.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }
  const category = await getCategoryDetail(props.id).catch(notFound);
  const { contents: news, totalCount } = await getNewsList({
    filters: `category[equls]${category.id}`,
    limit: NEWS_LISTT_LIMIT,
    offset: NEWS_LISTT_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
