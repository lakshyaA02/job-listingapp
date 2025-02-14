import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`); // Navigate to job details page
  };

  return (
    <div
      className="p-4 border rounded shadow cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{job.company}</p>

      {/* Display additional job details */}
      <div className="mt-2 text-gray-600 dark:text-gray-400">
        <p>
          <strong>Deadline:</strong> {job.application_deadline || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {job.job_category || "N/A"}
        </p>
        <p>
          <strong>Employment Type:</strong> {job.employment_type || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
