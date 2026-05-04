
import "./index.css"

const AdminHeader = () => (
    <div className="header-container1">
        <div className="header-container2">
            <img src="/images/admin.png" alt="admin logo" className="admin-logo"/>
            <h1 className="admin-title">Admin Dashboard</h1>
        </div>
        <div className="header-container3">
            <div className="admin-profile">
                <div className="admin-details-container">
                    <img src="/images/notifications.png" alt="notifications" className="notifications"/>
                    <button className="notification-button">3</button>
                </div>
                <div className="admin-profile-container">
                    <div className="profile">
                        <img src="/images/profile picture.png" alt="profile picture" className="profile-picture"/>
                    </div>
                    <select id="options" name="">
                        <option value="name" className="option-value">Rakesh Kumar</option>
                        <option value="logout" className="option-value">Logout</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
)

export default AdminHeader