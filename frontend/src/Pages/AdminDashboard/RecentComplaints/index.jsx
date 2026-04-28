import "./index.css"

const RecentComplaintsDetails = [
    {
        UniqueId:1,
        JobId:"#JOB001",
        EmployeeName:"Suresh Yadav",
        CustomerName:"Ramesh Kumar",
        ComplaintTitle:"Poor Work Quality",
        ComplaintStatus:"Pending",
        ComplaintDate:"12 May 2024",
        Status:"Resolve"
    },
    {
        UniqueId:2,
        JobId:"#JOB002",
        EmployeeName:"Mahesh Das",
        CustomerName:"Priya Patel",
        ComplaintTitle:"Behaviour Issue",
        ComplaintStatus:"Pending",
        ComplaintDate:"11 May 2024",
        Status:"Resolve"
    },
    {
        UniqueId:3,
        JobId:"#JOB003",
        EmployeeName:"Vikram Singh",
        CustomerName:"Amit Sharma",
        ComplaintTitle:"Delay in Service",
        ComplaintStatus:"Resolved",
        ComplaintDate:"10 May 2024",
        Status:"Resolved"
    }
]

const RecentComplaints = () => {
    return (
        <div className="recent-complaints-container">
            <div className="recent-complaints-header-container">
                <h1 className="recent-complaints-title">Recent Complaints</h1>
                <h1 className="recent-complaints-details">View All</h1>
            </div>
            <hr className="horizantal-line" />
            <ul className="active-jobs-container">
                {RecentComplaintsDetails.map((Complaint) => (
                    <li key={Complaint.UniqueId} className="recent-complaints-list-container">
                        <div>
                            <h1 className="complaint-id">{Complaint.CustomerName}</h1>
                            <h1 className="complaint-name">{`Aganist : ${Complaint.EmployeeName}`}</h1>
                        </div>
                        <div>
                            <h1 className="complaint-title">{Complaint.ComplaintTitle}</h1>
                            <h1 className="complaint-date">{Complaint.ComplaintDate}</h1>
                        </div>
                        {
                            Complaint.Status !== "Resolved"
                                ?
                                    <>
                                        <button className="complaint-request-status" style={{border:"2px solid #FFF7ED",color:"#EA580C",backgroundColor:"#FFF7ED"}}>Pending</button>
                                        <button className="complaint-request-status" style={{border:"2px solid #166534",color:"#FFFFFF",backgroundColor:"#166534"}}>Resolve</button>
                                    </>
                                :
                                    <>
                                        <button className="complaint-request-status" style={{border:"2px solid #90EE90",color:"#166534",backgroundColor:"#90EE90"}}>Resolved</button>
                                        <button className="complaint-request-status" style={{border:"2px solid #166534",color:"#166534",backgroundColor:"#ffffff"}}>View</button>
                                    </>
                        }
                        <h1 className="request-date">{Complaint.RequestDate}</h1>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentComplaints