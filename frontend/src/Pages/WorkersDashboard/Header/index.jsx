
import "./index.css"

const Header = () => (
    <div className="header-container1">
        <div className="header-container2">
            <img src="/images/worker.png" alt="worker logo" className="worker-logo"/>
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
                    <img src="/images/notifications.png" alt="notifications" className="notifications"/>
                    <button className="notification-button">3</button>
                </div>
                <div className="workers-profile-container">
                    <div className="profile">
                        <img src="/images/profile picture.png" alt="profile picture" className="profile-picture"/>
                    </div>
                    <h1 value="name" className="option-value options">Rakesh Kumar</h1>
                </div>
            </div>
        </div>
    </div>
)

export default Header