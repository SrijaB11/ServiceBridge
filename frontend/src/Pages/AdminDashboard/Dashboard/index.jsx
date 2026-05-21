import React, { Component } from "react";
import Worker from "../Worker";
import RecentRequests from "../RecentRequests";
import styles from './index.module.css';

class AdminDashboard extends Component {
    componentDidMount() {
        this.Status()
    }

    Status = async () => {
        const GetStatus = await fetch("http://localhost:5000/admin/status",{method:"GET"})
        console.log(GetStatus)
    }

    render() {
        return (
            <div className={styles["app-layout"]}>
                <div className={styles["main-content"]}>
                    <div className={styles.main}>
                        {/* Stats Cards */}
                        {/* <ul className={styles["admin-dashboard-container1"]}>
                            {adminDetails.map((detail) => (
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

                        <div className={styles["two-column-layout"]}>
                            <div className={styles["left-column"]}>
                                <div className={styles["component-wrapper"]}>
                                    <Worker onTotalWorkersChange={this.updateTotalWorkers} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;