import "./index.css"

const RequestsDetails = [
    {
        UniqueId:1,
        ProfileImage:"/images/male-logo.png",
        WorkerName:"Amit Sharma",
        LocationIcon:"/images/location.png",
        WorkTitle:"Plumbing Service",
        Location:"Jaipur, Rajasthan",
        Date:"12 May 2024",
        Rupee:"/images/rupee.png",
        Cost:600
    },
    {
        UniqueId:2,
        ProfileImage:"/images/female-logo.png",
        WorkerName:"Neha Gupta",
        LocationIcon:"/images/location.png",
        WorkTitle:"Electrical Work",
        Location:"Jaipur, Rajasthan",
        Date:"12 May 2024",
        Rupee:"/images/rupee.png",
        Cost:750
    },
    {
        UniqueId:3,
        ProfileImage:"/images/male-logo.png",
        WorkerName:"Sunil Verma",
        LocationIcon:"/images/location.png",
        WorkTitle:"Carperntary Work",
        Location:"Jaipur, Rajasthan",
        Date:"11 May 2024",
        Rupee:"/images/rupee.png",
        Cost:900
    }
]

const Requests = () => {
    return (
        <div className="requests-container">
            <div className="requests-header-container">
                <h1 className="requests-title">Incoming Requests</h1>
                <h1 className="requests-details">View All</h1>
            </div>
            <hr className="horizantal-line" />
            <ul className="requests-list">
                {RequestsDetails.map((request) => (
                    <li className="requests-details-container" key={request.UniqueId}>
                        <div className="requests-profile">
                            <img src={request.ProfileImage} alt={request.WorkerName} className="requests-logo"/>
                            <div>
                                <h1 className="person-name">{request.WorkerName}</h1>
                                <div className="requests-person-details">
                                    <img src={request.LocationIcon} alt="work-icon" className="location" />
                                    <p className="person-work">{request.WorkTitle}</p>
                                </div>
                                <div className="requests-person-details">
                                    <img src={request.LocationIcon} alt="location-icon" className="location" />
                                    <p className="person-location">{request.Location}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="requests-date">{request.Date}</h1>
                            <div className="request-money-container">
                                <img src="/assets/Images/rupee.png" alt="rupee" className="rupee-logo" />
                                <p className="requests-value">{request.Cost}</p>
                            </div>
                        </div>
                        <div className="requests-button-container">
                            <button type="button" className="accept accept-button">Accept</button>
                            <button type="button" className="reject reject-button">Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Requests