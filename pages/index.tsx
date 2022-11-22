import Head from 'next/head';
import Link from 'next/link';
import PinIcon from './src/assets/PinIcon';
import FavoritesIcon from './src/assets/FavoritesIcon';

import { formatDistanceToNow } from 'date-fns';
export default function Home({ joblist }: any) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-slate-200 xl:pt-8">
      {joblist.map((job: any, index: number) => {
        const timeDistance = job.updatedAt // change time string to time to now
          ? `Updated ${formatDistanceToNow(new Date(job.updatedAt))} ago`
          : `Posted ${formatDistanceToNow(new Date(job.createdAt))} ago`;
        return (
          <div
            className="flex flex-row flex-wrap w-full p-3 text-gray-400 rounded-lg shadow-lg shadow-black/7 bg-slate-100 xl:bg-slate-50 xl:w-3/4"
            key={job.id}>
            <div className="w-1/6 p-3 xl:w-1/12">
              <img
                className="w-full mt-4 rounded-full aspect-square xl:mt-0 xl:w-20"
                src={job.pictures[0]}
                alt=""
              />
            </div>
            <div className="flex flex-row flex-wrap justify-between w-5/6 xl:w-11/12 xl:flex-row">
              <div className="flex flex-row flex-wrap items-end justify-between w-full xl:flex-col xl:order-1 xl:w-2/6">
                <div className="flex flex-col justify-center xl:h-full">stars</div>
                <div className="hidden xl:block text-[#70778B] hover:text-yellow-400">
                  <FavoritesIcon />
                </div>
                <div className="text-lg text-slate-400">{timeDistance}</div>
              </div>
              <div className="w-full xl:w-3/5">
                <Link href={`/jobs/${job.id}`} className="xl:font-bold text-grayblue xl:text-xl">
                  <div className="">{job.title}</div>
                </Link>
                <div className="pt-2 pb-2">{job.name}</div>

                <div className="flex flex-row">
                  <div className="mr-2">
                    <PinIcon />
                  </div>
                  {job.address}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  const joblist = await res.json();

  return {
    props: {
      joblist,
    },
  };
}
