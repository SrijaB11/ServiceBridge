
import "./index.css"

const Header = () => (
    <div className="header-container1">
        <div className="header-container2">
            <img src="/assets/Images/worker.png" alt="worker logo" className="worker-logo"/>
            <h1 className="worker-title">Workers Dashboard</h1>
        </div>
        <div className="header-container3">
            <div className="header-details-container1">
                <div>
                    <h1 className="worker-heading">Availability</h1>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <label class="switch">
                        <input type="checkbox" id="toggle"/>
                        <span class="slider"></span>
                    </label>
                    <span id="statusText">Unavailable</span>
                </div>
            </div>
            <div className="workers-profile">
                <div className="workers-details-container">
                    <img src="/assets/Images/notifications.png" alt="notifications" className="notifications"/>
                    <button className="notification-button">3</button>
                </div>
                <div className="workers-profile-container">
                    <div className="profile">
                        <img src="/assets/Images/profile picture.png" alt="profile picture" className="profile-picture"/>
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

export default Header