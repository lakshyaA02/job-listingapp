import React from "react";

function JobList({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </div>
  );
}

export default JobList;