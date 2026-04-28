
import RecentRequests from "../RecentRequests"
import RecentComplaints from "../RecentComplaints"
import "./index.css"

const AdminDetails = [
    {
        UniqueId:1,
        ProfileIcon:"/assets/Images/total-users.png",
        Title:"Total Users",
        Value:"1,256",
        IncrementIcon:"/assets/Images/increment-arrow.png",
        Status:"12.5% from last month"
    },
    {
        UniqueId:2,
        ProfileIcon:"/assets/Images/workers-users.png",
        Title:"Total Workers",
        Value:"342",
        IncrementIcon:"/assets/Images/increment-arrow.png",
        Status:"8.3% from last month"
    },
    {
        UniqueId:3,
        ProfileIcon:"/assets/Images/total-requests.png",
        Title:"Total Requests",
        Value:"1,782",
        IncrementIcon:"/assets/Images/increment-arrow.png",
        Status:"15.7% from last month"
    },
    {
        UniqueId:4,
        ProfileIcon:"/assets/Images/total-revnue.png",
        Title:"Total Revenue",
        Value:"2,45,678",
        IncrementIcon:"/assets/Images/increment-arrow.png",
        Status:"20.4% from last month"
    }
]

const AdminDashboard = () => {
    return (
        <div className="app-layout">
            <div className="main-content">
                <div className="main">
                    <ul className="admin-dashboard-container1">
                        {AdminDetails.map((detail) => (
                            <li className="admin-dashboard-container2" key={detail.UniqueId}>
                                <img src={detail.ProfileIcon} alt="profile-icons" className="admin-dashboard-logo"/>
                                <div>
                                    <h1 className="admin-title">{detail.Title}</h1>
                                    {detail.Title === "Total Revenue" ? (
                                        <div className="rupee-container">
                                            <img src="/assets/Images/rupee-symbol.png" alt="rupee" className="rupee-symbol"/>
                                            <h1 className="value">{detail.Value}</h1>
                                        </div>
                                    ) : (
                                        <h1 className="value">{detail.Value}</h1>
                                    )}
                                    <div className="admin-dashboard-details-container">
                                        <img src={detail.IncrementIcon} alt="increment" className="increment"/>
                                        <p className="status">{detail.Status}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <RecentRequests />
                    <RecentComplaints />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard