import { useNavigate, useParams } from "react-router-dom";
import NotFoundImage from "./assests/no_data_found.png"; // Correct the image path

const JobDetails = ({ jobs = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Log ID and job data for debugging
  console.log("Job ID from URL:", id);
  console.log("Job data:", jobs);

  // Find the job by id, comparing as strings (no type conversion needed)
  const job = jobs.find((job) => job.id === id); // Compare directly as strings

  const handleBackClick = () => {
    navigate("/"); // Navigate back to the job listing page
  };

  // If no job is found, show the not available image and message
  if (!job) {
    return (
      <div className="flex flex-col items-center mt-6">
        <img src={NotFoundImage} alt="Job not available" className="w-64 h-64 object-cover" />
        <p className="text-xl font-semibold mt-4">Sorry, this job is not available anymore.</p>
      </div>
    );
  }

  // Render job details
  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="p-2 bg-blue-500 text-white rounded mb-4"
      >
        Back to Job Listings
      </button>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <p className="text-lg">{job.company}</p>
        <p className="mt-2">{job.description || "No description available."}</p>

        {/* Display additional job details */}
        <div className="mt-4">
          <p><strong>Employment Type:</strong> {job.employment_type || "Not specified"}</p>
          <p><strong>Application Deadline:</strong> {job.application_deadline || "No deadline"}</p>
          <p><strong>Qualifications:</strong> {job.qualifications || "Not listed"}</p>
          <p><strong>Job Category:</strong> {job.job_category || "Not specified"}</p>
          <p><strong>Is Remote Work:</strong> {job.is_remote_work ? "Yes" : "No"}</p>
          <p><strong>Number of Openings:</strong> {job.number_of_openings || "Not specified"}</p>
          <p><strong>Location:</strong> {job.location || "Not listed"}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
