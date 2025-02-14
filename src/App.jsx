import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Compount/NavBar";
import JobCard from "./Compount/JobCard";
import JobDetails from "./Compount/JobDetails";

const API_URL = "https://jsonfakery.com/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (companyFilter ? job.company.toLowerCase() === companyFilter.toLowerCase() : true)
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Define the range of pages to display (e.g., 5 pages before and after the current page)
  const pageRange = 2;  // Number of pages before and after the current page to show
  let pageNumbers = [];

  for (let i = Math.max(currentPage - pageRange, 1); i <= Math.min(currentPage + pageRange, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <div className="max-w-5xl mx-auto p-4">
          <Routes>
            {/* Home Page - Job Listings */}
            <Route
              path="/"
              element={
                <>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Search by title..."
                      className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                      className="p-2 border rounded dark:bg-gray-800 dark:text-white"
                      onChange={(e) => setCompanyFilter(e.target.value)}
                    >
                      <option value="">All Companies</option>
                      {[...new Set(jobs.map((job) => job.company))].map((company, index) => (
                        <option key={index} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    {currentJobs.length > 0 ? (
                      currentJobs.map((job) => <JobCard key={job.id} job={job} />)
                    ) : (
                      <p>No jobs found.</p>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                      <button
                        className="p-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      >
                        Previous
                      </button>

                      {/* Display page numbers and allow jumping */}
                      <div className="flex gap-2">
                        {pageNumbers.map((page) => (
                          <button
                            key={page}
                            className={`p-2 rounded ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}

                        {/* Last page button */}
                        {totalPages > pageRange * 2 + 1 && (
                          <button
                            className="p-2 bg-gray-300 dark:bg-gray-700 rounded"
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            Last
                          </button>
                        )}
                      </div>

                      <button
                        className="p-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              }
            />

            {/* Job Details Page */}
            <Route path="/job/:id" element={<JobDetails jobs={jobs} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
