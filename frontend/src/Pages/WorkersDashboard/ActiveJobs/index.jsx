import "./index.css"

const ActiveJobDetails = [
    {
        UniqueId:1,
        JobId:"#JOB001",
        EmployeeName:"Ramesh Kumar",
        Role:"Plumbing",
        RequestStatus:"In Progress",
        RequestDate:"10 May 2024",
        Status:"In Progress"
    },
    {
        UniqueId:2,
        JobId:"#JOB002",
        EmployeeName:"Priya Patel",
        Role:"Electical",
        RequestStatus:"In Progress",
        RequestDate:"11 May 2024",
        Status:"In Progress"
    },
    {
        UniqueId:3,
        JobId:"#JOB003",
        EmployeeName:"Vikas Singh",
        Role:"Cleaning",
        RequestStatus:"Completed",
        RequestDate:"10 May 2024",
        Status:"Completed"
    },
    {
        UniqueId:4,
        JobId:"#JOB004",
        EmployeeName:"Amit Sharma",
        Role:"Plumbing",
        RequestStatus:"Completed",
        RequestDate:"09 May 2024",
        Status:"Completed"
    }
]

const ActiveJobs = () => {
    return (
        <div className="active-jobs-container">
            <div className="active-jobs-header-container">
                <h1 className="active-jobs-title">Active Jobs</h1>
                <h1 className="active-jobs-details">View All</h1>
            </div>
            <hr className="horizantal-line" />
            <ul className="active-jobs-container">
                {ActiveJobDetails.map((job) => (
                    <li key={job.UniqueId} className="acitve-jobs-list-container">
                        <h1 className="job-id">{job.JobId}</h1>
                        <h1 className="employee-name">{job.EmployeeName}</h1>
                        <h1 className="role">{job.Role}</h1>
                        <button 
                            className="request-status" 
                            style={
                                job.Status === "Completed" 
                                ? { color:"#14532D", backgroundColor:"#DCFCE7" } 
                                : { color:"#1E3A8A", backgroundColor:"#DBEAFE" }
                            }
                        >
                            {job.RequestStatus}
                        </button>
                        <h1 className="request-date">{job.RequestDate}</h1>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActiveJobs