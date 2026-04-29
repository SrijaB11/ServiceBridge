import { Link } from "react-router-dom"
import "./index.css"

const NavBar = () => {
    return (
        <nav className="navbar-container1">
            <div className="navbar-container2">
                <img src="/assets/Images/service-bridge-logo.png" alt="logo" className="webiste-logo"/>
                <div>
                    <h1 className="navbar-title">Service Bridge</h1>
                    <p className="navbar-prfile">Worker</p>
                </div>
            </div>
            <ul className="navbar-list">
                <li className="navbar-list-items">
                    <Link to="/" className="navbar-tabs-container">
                        <img src="/images/dashboard.png" alt="dashboard" className="navbar-logo" />
                        <p className="tab-name">Dashboard</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/requests" className="navbar-tabs-container">
                        <img src="/images/requests.png" alt="requests" className="navbar-logo" />
                        <p className="tab-name">Requests</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/active-jobs" className="navbar-tabs-container">
                        <img src="/images/active jobs.png" alt="active jobs" className="navbar-logo" />
                        <p className="tab-name">Active Jobs</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/earnings" className="navbar-tabs-container">
                        <img src="/images/earnings-image.png" alt="earnings" className="navbar-logo" />
                        <p className="tab-name">Earnings</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/reviews" className="navbar-tabs-container">
                        <img src="/images/reviews.png" alt="reviews" className="navbar-logo" />
                        <p className="tab-name">Reviews</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/profile" className="navbar-tabs-container">
                        <img src="/images/profile-img.png" alt="profile" className="navbar-logo" />
                        <p className="tab-name">Profile</p>
                    </Link>
                </li>
                <li className="navbar-list-items"> 
                    <Link to="/logout" className="navbar-tabs-container">
                        <img src="/images/logout.png" alt="logout" className="navbar-logo" />
                        <p className="tab-name">Logout</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar