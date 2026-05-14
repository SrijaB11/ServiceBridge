import Requests from "../Requests";
import ActiveJobDetails from "../History";
import styles from "./index.module.css";

const WorkersDetails = [
    {
        UniqueId:1,
        ProfileIcon:"/images/total-jobs.png",
        Title:"Total Jobs",
        Value:56,
        IncrementIcon:"/images/increment-arrow.png",
        Status:"14.3% from last month"
    },
    {
        UniqueId:2,
        ProfileIcon:"/images/earnings.png",
        Title:"Earnings",
        Value:"45,230",
        IncrementIcon:"/images/increment-arrow.png",
        Status:"18.6% from last month"
    },
    {
        UniqueId:3,
        ProfileIcon:"/images/rating.png",
        Title:"Rating",
        Value:4.7,
        IncrementIcon:"/images/increment-arrow.png",
        Status:"2.1% from last month"
    },
    {
        UniqueId:4,
        ProfileIcon:"/images/pending-requests.png",
        Title:"Pending Requests",
        Value:8,
        IncrementIcon:"/images/increment-arrow.png",
        Status:"5.0% from last month"
    }
];

const WorkersDashboard = () => {
    return (
        <div className={styles["app-layout"]}>
            <div className={styles["main-content"]}>
                <div className={styles.main}>
                    <ul className={styles["workers-dashboard-container1"]}>
                        {WorkersDetails.map((detail) => (
                            <li
                                className={styles["workers-dashboard-container2"]}
                                key={detail.UniqueId}
                            >
                                <img
                                    src={detail.ProfileIcon}
                                    alt="profile-icons"
                                    className={styles["workers-dashboard-logo"]}
                                />

                                <div>
                                    <h1 className={styles.title}>
                                        {detail.Title}
                                    </h1>

                                    {detail.Title === "Earnings" ? (
                                        <div className={styles["rupee-container"]}>
                                            <img
                                                src="/images/rupee-symbol.png"
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

                                    <div
                                        className={
                                            styles["workers-dashboard-details-container"]
                                        }
                                    >
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
                    </ul>

                    <Requests />

                    <ActiveJobDetails />
                </div>
            </div>
        </div>
    );
};

export default WorkersDashboard;