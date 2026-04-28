import "./index.css"

const RecentRequestsDetails = [
    {
        UniqueId:1,
        JobId:"#REQ001",
        User:"Ramesh Kumar",
        Worker:"Suresh Yadav",
        Service:"Plumbing",
        Status:"Pending",
        Date:"12 May 2024",
    },
    {
        UniqueId:2,
        JobId:"#REQ002",
        User:"Amit Sharma",
        Worker:"Vikram Singh",
        Service:"Electrical",
        Status:"Accepted",
        Date:"12 May 2024",
    },
    {
        UniqueId:3,
        JobId:"#REQ003",
        User:"Priya Patel",
        Worker:"Mahesh Das",
        Service:"Carpentary",
        Status:"In Progress",
        Date:"11 May 2024",
    },
    {
        UniqueId:4,
        JobId:"#REQ004",
        User:"Sunil Verma",
        Worker:"Rakesh Kumar",
        Service:"Cleaning",
        Status:"Completed",
        Date:"11 May 2024",
    },
    {
        UniqueId:5,
        JobId:"#REQ005",
        User:"Neha Gupta",
        Worker:"Pawan Yadav",
        Service:"Plumbing",
        Status:"Cancelled",
        Date:"10 May 2024",
    }
]

const RecentRequests = () => {
    return (
        <div className="recent-requests-container">
            <div className="recent-requests-header-container">
                <h1 className="recent-requests-title">Recent Requests</h1>
                <h1 className="recent-requests-details">View All</h1>
            </div>
            <hr className="horizantal-line" />
            <ul className="recent-requests-list">
                {RecentRequestsDetails.map((request) => (
                    <li className="recent-requests-details-container" key={request.UniqueId}>
                        <div className="recent-requests-profile">
                            <h1 className="recent-requests-joid">{request.JobId}</h1>
                            <h1 className="recent-requests-username">{request.User}</h1>
                            <h1 className="recent-requests-worker">{request.Worker}</h1>
                            <h1 className="recent-requests-service">{request.Service}</h1>
                            {
                                request.Status === "Completed" ? (
                                    <button style={{backgroundColor:"#E6F4EA",color:"#2E7D32",border:"2px solid #E6F4EA",padding:"10px",borderRadius:"6px",cursor:"pointer"}}>Completed</button>
                                ) : request.Status === "Cancelled" ? (
                                    <button style={{backgroundColor:"#F8D7DA",color:"#C62828",border:"2px solid #E6F4EA",padding:"10px",borderRadius:"6px",cursor:"pointer"}}>Cancelled</button>
                                ) : request.Status === "Accepted" ? (
                                    <button style={{backgroundColor:"#DFF0D8",color:"#3C763D",border:"2px solid #E6F4EA",padding:"10px",borderRadius:"6px",cursor:"pointer"}}>Accepted</button>
                                ) : request.Status === "Pending" ? (
                                    <button style={{backgroundColor:"#F6E7C1",color:"#D39E00",border:"2px solid #E6F4EA",padding:"10px",borderRadius:"6px",cursor:"pointer"}}>Pending</button>
                                ) : (
                                    <button style={{backgroundColor:"#D9EDF7",color:"#31708F",border:"2px solid #E6F4EA",padding:"10px",borderRadius:"6px",cursor:"pointer"}}>In Progress</button>
                                )
                            } 
                            <h1 className="recent-requests-date">{request.Date}</h1>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentRequests