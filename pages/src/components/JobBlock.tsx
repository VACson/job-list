export default function JobBlock(job: any) {
  return (
    <div className="">
      {/* <img src={job.pictures[0]} alt="" /> */}
      <div className="">{job.title}</div>
      <div className="">{job.name}</div>
      <div className="">{job.address}</div>
      <div className="">{job.employment_type}</div>
    </div>
  );
}
