import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import JobBlock from './src/components/JobBlock';
import Link from 'next/link';

// export { getStaticProps } from './'

// export const getTodos = async () => {
//   axios
//     .get('', {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer,
//       },
//     })
//     .then((res) => res.data);
// };

// export const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
//   timeout: 30000,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     config.headers = {
//       ...config.headers,
//       Authorization: Bearer ${token ? token : ''},
//     };
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default function Home({ joblist }: any) {
  // const { data, isLoading, error } = useQuery<any, Error>({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     axios
  //       .get('', {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ,
  //         },
  //       })
  //       .then((res) => res.data);
  //   },
  // });

  // if (isLoading) return 'Loading...';
  // if (error) return error?.message;

  return (
    <div className="jobListPageWrapper">
      {joblist.map((job: any, index: number) => (
        <div className="jobListBlock" key={job.id}>
          <img className="jobListBlock__image" src={job.pictures[0]} alt="" />
          <Link href={`/jobs/${job.id}`} className="jobListBlock__information">
            <div className="jobListBlock__information__title">{job.title}</div>
          </Link>
        </div>
      ))}
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
