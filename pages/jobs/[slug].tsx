import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  console.log('TCL: Home -> router', router);

  return <></>;
}
