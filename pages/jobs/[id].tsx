import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import Link from 'next/link';
import Image from 'next/image';
import PinIcon from '../src/assets/PinIcon.svg';
import FavoritesIcon from '../src/assets/FavoritesIcon.svg';
import ShareIcon from '../src/assets/ShareIcon.svg';

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

const containerStyle = {
  //map styles
  width: '100%',
  height: '50%',
  zIndex: '-1',
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
  const center = {
    lat: currentJob.location.lat,
    lng: currentJob.location.long,
  };
  const splitedDescription = currentJob.description.split('\n').map(
    (
      str: string,
      index: number, // split the description function
    ) =>
      str === '  Responsopilities:' || str === 'Compensation & Benefits:' ? (
        <p className="mt-8 mb-4 text-xl font-bold" key={index}>
          {str}
        </p>
      ) : (
        <p className="" key={index}>
          {str}
        </p>
      ),
  );
  return (
    <div className="flex flex-row justify-center w-full h-full gap-32 pt-8 pb-20">
      <div className="w-2/5 text-blue-900">
        <div className="flex flex-row justify-between pb-2 text-3xl font-bold tracking-wider">
          Job Details
          <div className="flex flex-row items-end gap-4 text-lg text-gray-500">
            <div className="">
              <Image src={FavoritesIcon} className="inline mr-2 text-white" alt="pin" />
              Save to my list
            </div>

            <div className="">
              <Image src={ShareIcon} className="inline mr-2" alt="pin" />
              Share
            </div>
          </div>
        </div>
        <hr />
        <button className="w-32 mt-10 mb-8 text-xs text-white bg-blue-900 rounded-lg h-14">
          APPLY NOW
        </button>
        <div className="flex flex-row justify-between w-full">
          <div className="w-2/3 text-2xl font-bold">{currentJob.title}</div>
          <div className="flex flex-col w-1/4 text-xl font-bold flex-nowrap">
            <div className="">
              &#8364; {currentJob.salary.replace(/k/g, ' 000').replace(/-/g, '—')}
            </div>
            <div className="text-xs">Brutto, per year</div>
          </div>
        </div>
        <div className="text-lg text-slate-400">{timeDistance}</div>
        <div className="text-lg">{splitedDescription}</div>
        <button className="w-32 mt-10 mb-20 text-xs text-white bg-blue-900 rounded-lg h-14">
          APPLY NOW
        </button>
        <div className="text-3xl font-bold">
          Additional info <hr />
        </div>
        <div className="w-full mt-4 text-lg">
          Employment type
          <div className="flex flex-row gap-2 font-bold flex-nowrap">
            {currentJob.employment_type.map((type: string | undefined) => (
              <div
                className="w-56 h-12 pt-2 mt-2.5 text-center border-2 border-solid rounded-lg bg-slate-200"
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
                className="w-56 h-12 mt-2.5 pt-2 text-center rounded-lg text-amber-700 bg-amber-100"
                key={index}>
                {benefit}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 text-3xl font-bold">
          Attached images <hr />
          <div className="flex flex-row gap-8">
            {currentJob.pictures.map((pictureUrl: string, index: number) => (
              <img className="object-cover mt-5 w-52 h-28" src={pictureUrl} alt="" key={index} />
            ))}
          </div>
        </div>
        <Link href={'/'}>
          <button className="h-12 mt-24 -ml-24 text-xs font-semibold rounded-lg w-52 bg-slate-200">
            RETURN TO JOB BOARD
          </button>
        </Link>
      </div>
      <div className="w-1/5 h-96">
        <div className="w-full p-8 pl-16 pr-16 rounded-t-lg h-1/2 text-slate-200 bg-slate-600">
          <div className="text-xl text-slate-50">{currentJob.name}</div>
          <span className="">
            <Image src={PinIcon} className="inline mr-2" alt="pin" />
            {currentJob.address}
          </span>
          <div className="">{currentJob.phone}</div>
          <div className="">{currentJob.email}</div>
        </div>
        <LoadScriptNext googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_TOKEN}`}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            mapContainerClassName={'rounded-b-lg'}
            center={center}
            zoom={7}>
            <Marker position={{ lat: currentJob.location.lat, lng: currentJob.location.lon }} />
            <></>
          </GoogleMap>
        </LoadScriptNext>
      </div>
    </div>
  );
}
