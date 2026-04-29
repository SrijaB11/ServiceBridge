import { Link } from "react-router-dom"
import "./index.css"

const AdminNavBar = () => {
    return (
        <nav className="navbar-container1">
            <div className="navbar-container2">
                <img src="/images/service-bridge-logo.png" alt="logo" className="webiste-logo"/>
                <div>
                    <h1 className="navbar-title">Service Bridge</h1>
                    <p className="navbar-prfile">Admin</p>
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
                    <Link to="/users" className="navbar-tabs-container">
                        <img src="/images/users.png" alt="total users" className="navbar-logo" />
                        <p className="tab-name">Users</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/active-jobs" className="navbar-tabs-container">
                        <img src="/images/workers.png" alt="workers" className="navbar-logo" />
                        <p className="tab-name">Workers</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/recent-requests" className="navbar-tabs-container">
                        <img src="/images/requests.png" alt="requests" className="navbar-logo" />
                        <p className="tab-name">Requests</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/reviews" className="navbar-tabs-container">
                        <img src="/images/companies.png" alt="companies" className="navbar-logo" />
                        <p className="tab-name">Companies</p>
                    </Link>
                </li>
                <li className="navbar-list-items">
                    <Link to="/profile" className="navbar-tabs-container">
                        <img src="/images/payments.png" alt="payments" className="navbar-logo" />
                        <p className="tab-name">Payments</p>
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

export default AdminNavBar