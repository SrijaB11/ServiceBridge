import Users from "../Users"
import Worker from "../Worker"
import RecentRequests from "../RecentRequests"
import CustomerComplaints from "../CustomerComplaints"
import WorkerVerification from "../Certifications"
import styles from './index.module.css'

const AdminDetails = [
    {
        UniqueId: 1,
        ProfileIcon: "/images/total-users.png",
        Title: "Total Users",
        Value: "1,256",
        IncrementIcon: "/images/increment-arrow.png",
        Status: "12.5% from last month"
    },
    {
        UniqueId: 2,
        ProfileIcon: "/images/workers-users.png",
        Title: "Total Workers",
        Value: "342",
        IncrementIcon: "/images/increment-arrow.png",
        Status: "8.3% from last month"
    },
    {
        UniqueId: 3,
        ProfileIcon: "/images/total-requests.png",
        Title: "Total Requests",
        Value: "1,782",
        IncrementIcon: "/images/increment-arrow.png",
        Status: "15.7% from last month"
    },
    {
        UniqueId: 4,
        ProfileIcon: "/images/total-revnue.png",
        Title: "Total Revenue",
        Value: "2,45,678",
        IncrementIcon: "/images/increment-arrow.png",
        Status: "20.4% from last month"
    }
]

const AdminDashboard = () => {
    return (
        <div className={styles["app-layout"]}>
            <div className={styles["main-content"]}>
                <div className={styles.main}>
                    {/* Stats Cards Grid */}
                    {/* <ul className={styles["admin-dashboard-container1"]}>
                        {AdminDetails.map((detail) => (
                            <li
                                className={styles["admin-dashboard-container2"]}
                                key={detail.UniqueId}
                            >
                                <img
                                    src={detail.ProfileIcon}
                                    alt="profile-icons"
                                    className={styles["admin-dashboard-logo"]}
                                />
                                <div className={styles["stats-content"]}>
                                    <h1 className={styles["admin-title"]}>
                                        {detail.Title}
                                    </h1>
                                    {detail.Title === "Total Revenue" ? (
                                        <div className={styles["rupee-container"]}>
                                            <img
                                                src="/assets/Images/rupee-symbol.png"
                                                alt="rupee"
                                                className={styles["rupee-symbol"]}
                                            />
                                            <h1 className={styles.value}>
                                                {detail.Value}
                                            </h1>
                                        </div>
                                    ) : (
                                        <h1 className={styles.value}>
                                            {detail.Value}
                                        </h1>
                                    )}
                                    <div className={styles["admin-dashboard-details-container"]}>
                                        <img
                                            src={detail.IncrementIcon}
                                            alt="increment"
                                            className={styles.increment}
                                        />
                                        <p className={styles.status}>
                                            {detail.Status}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul> */}

                    {/* Two Column Layout */}
                    <div className={styles["two-column-layout"]}>
                        {/* Left Column */}
                        <div className={styles["left-column"]}>
                            <div className={styles["component-wrapper"]}>
                                <RecentRequests />
                            </div>
                            <div className={styles["component-wrapper"]}>
                                <WorkerVerification />
                            </div>
                            <div className={styles["component-wrapper"]}>
                                <Users />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className={styles["right-column"]}>
                            <div className={styles["component-wrapper"]}>
                                <CustomerComplaints />
                            </div>
                            <div className={styles["component-wrapper"]}>
                                <Worker />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard