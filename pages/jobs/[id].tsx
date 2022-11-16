import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/router';

export const getTodos = async () => {
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
  console.log('TCL: Home -> router', router.query.id);
  const { data, isLoading, error } = useQuery(['job'], getTodos);
  if (isLoading) return 'isLoading';
  const currentJob = data.filter(
    (job: { id: string | string[] | undefined }) => job.id === router.query.id,
  )[0];

  const timeDistance = currentJob.updatedAt
    ? `Updated ${formatDistanceToNow(new Date(currentJob.updatedAt))} ago`
    : `Posted ${formatDistanceToNow(new Date(currentJob.createdAt))} ago`;
  console.log(timeDistance);
  return (
    <div className="jobDetailedPage">
      <div className="jobDetails">
        <div className="">Job Details</div>
        <div className="">
          {currentJob.title}
          {console.log(currentJob)}
        </div>
        <div className="">
          {currentJob.salary}
          <br /> Brutto, per year
        </div>
        <div className="">{timeDistance}</div>
        <div className="jobDetails__description">
          {currentJob.description.split('\n').map((str: string, index: number) => (
            <p className="jobDetails__description__paragraph" key={index}>
              {str}
            </p>
          ))}
        </div>
        <button>APPLY NOW</button>
        <div className="">Additional info</div>
        <div className="">
          Employment type
          {currentJob.employment_type.map((type: string | undefined) => (
            <div className="" key={type}>
              {type}
            </div>
          ))}
        </div>
        <div className="">
          Benefits
          {currentJob.benefits.map((benefit: string, index: number) => (
            <div className="" key={index}>
              {benefit}
            </div>
          ))}
        </div>
        <div className="">
          Attached images
          {currentJob.pictures.map((pictureUrl: string, index: number) => (
            <img src={pictureUrl} alt="" key={index} />
          ))}
        </div>
        <button>RETURN TO JOB BOARD</button>
      </div>
      <div className="asideCard">Card</div>
    </div>
  );
}
