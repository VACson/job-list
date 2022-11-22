import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PinIcon from '../src/assets/PinIcon';
import FavoritesIcon from '../src/assets/FavoritesIcon';
import FavoritesIconMobile from '../src/assets/FavoritesIconMobile';
import ShareIcon from '../src/assets/ShareIcon';

import GoogleMapBlock from '../src/components/GoogleMap/GoogleMapBlock';
import JobDetailDescription from '../src/components/Description/JobDetailDescription';

export const getTodos = async () => {
  // get request to job details
  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/?id=635ee6d304601d61a71951f6`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })
    .then((res) => res.data);
};

export default function Job() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery(['job'], getTodos);
  if (isLoading) return 'isLoading';
  const currentJob = data.filter(
    (job: { id: string | string[] | undefined }) => job.id === router.query.id,
  )[0];
  const timeDistance = currentJob.updatedAt // change time string to time to now
    ? `Updated ${formatDistanceToNow(new Date(currentJob.updatedAt))} ago`
    : `Posted ${formatDistanceToNow(new Date(currentJob.createdAt))} ago`;
  console.log(currentJob);
  return (
    <div className="flex flex-col justify-center w-full h-full gap-32 p-4 pt-8 pb-20 xl:flex-row">
      <div className="w-full text-[#3A4562] xl:w-2/5">
        <div className="flex flex-col flex-wrap justify-between pb-2 text-3xl font-bold tracking-wider xl:flex-row">
          Job Details
          <div className="flex flex-row order-1 gap-4 font-normal xl:text-lg xl:order-1-none">
            <div className="flex flex-row">
              <div className="hidden h-5 mr-2 xl:block text-[#70778B] hover:text-yellow-400 ">
                <FavoritesIcon />
              </div>
              <div className="mr-2 xl:hidden text-[#70778B] hover:text-yellow-400">
                <FavoritesIconMobile />
              </div>
              Save to my list
            </div>
            <div className="flex flex-row">
              <div className="mr-2 text-[#70778B] hover:text-blue-400">
                <ShareIcon />
              </div>
              Share
            </div>
          </div>
          <hr className="w-full mt-[9px] xl:mb-0 mb-6 xl:order-1" />
        </div>
        <button className="hidden w-32 mt-10 mb-8 text-xs text-white rounded-lg bg-button-bg xl:block h-14">
          APPLY NOW
        </button>
        <div className="flex flex-row flex-wrap justify-between w-full">
          <div className="w-11/12 text-2xl font-bold xl:w-2/3">{currentJob.title}</div>
          <div className="flex flex-col order-1 w-2/4 text-xl font-bold xl:w-1/3 text-end xl:order-none flex-nowrap">
            <div className="order-1 xl:order-none">
              &#8364; {currentJob.salary.replace(/k/g, ' 000').replace(/-/g, '—')}
            </div>
            <div className="text-xs">Brutto, per year</div>
          </div>
          <div className="w-2/5 text-lg text-grey-text">{timeDistance}</div>
        </div>
        <div className="text-lg">
          <JobDetailDescription description={currentJob.description} />
        </div>
        <div className="flex justify-center w-full mt-10 mb-20 xl:justify-start">
          <button className="w-32 text-xs text-white rounded-lg bg-button-bg h-14">
            APPLY NOW
          </button>
        </div>
        <div className="flex flex-col">
          <div className="mt-20 text-3xl font-bold xl:order-1">
            Attached images <hr />
            <div className="flex flex-row w-full gap-8 overflow-auto">
              {currentJob.pictures.map((pictureUrl: string, index: number) => (
                <img className="object-cover mt-5 w-52 h-28" src={pictureUrl} alt="" key={index} />
              ))}
            </div>
          </div>
          <div className="mt-16 text-3xl font-bold">
            Additional info <hr />
          </div>
          <div className="w-full mt-4 text-lg">
            Employment type
            <div className="flex flex-row gap-2 font-bold flex-nowrap">
              {currentJob.employment_type.map((type: string | undefined) => (
                <div
                  className="w-56 h-12 pt-2 mt-2.5 border-slate-400 border-[1px] text-center rounded-lg bg-slate-200"
                  key={type}>
                  {type}
                </div>
              ))}
            </div>
          </div>
          <div className="text-lg ">
            Benefits
            <div className="flex flex-row gap-2 font-bold flex-nowrap">
              {currentJob.benefits.map((benefit: string, index: number) => (
                <div
                  className="w-56 h-12 mt-2.5 pt-2 text-center rounded-lg border-amber-400 border-[1px] text-amber-700 bg-amber-100"
                  key={index}>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Link href={'/'}>
          <button className="hidden h-12 mt-24 text-xs font-semibold rounded-lg xl:block xl:-ml-24 w-52 bg-slate-200">
            &#10094; RETURN TO JOB BOARD
          </button>
        </Link>
      </div>
      <div className="rounded-lg xl:w-100 h-109 pb-9">
        <div className="mt-16 mb-2.5 text-3xl font-bold text-blue-900 xl:hidden">
          Contacts <hr />
        </div>
        <div className="w-full p-8 pl-16 pr-16 mt-5 rounded-t-lg xl:mt-0 h-1/2 text-slate-200 bg-[#2A3047]">
          <div className="text-xl text-slate-50">{currentJob.name}</div>
          <span className="flex flex-row">
            <div className="mr-2">
              <PinIcon />
            </div>
            {currentJob.address}
          </span>
          <div className="">{currentJob.phone}</div>
          <div className="">{currentJob.email}</div>
        </div>
        <GoogleMapBlock lat={currentJob.location.lat} lng={currentJob.location.long} />
      </div>
    </div>
  );
}
