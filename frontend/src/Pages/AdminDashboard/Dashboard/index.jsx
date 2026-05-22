import React, { useState, useEffect, useCallback } from "react";
import Worker from "../Worker";
import styles from './index.module.css';
import { TailSpin } from "react-loader-spinner";

const AdminDashboard = () => {
    const [statsDetails, setStatsDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const mergeStats = useCallback((fetchedStats) => {
        const stats = fetchedStats?.stats || {};

        const dashboardStats = [
            {
                uniqueId: 1,
                profileIcon: "/images/total-customers.png",
                title: "Total Customers",
                value: stats.totalCustomers?.toLocaleString() || "0",
                incrementIcon: "/images/increment-arrow.png",
                status: "12.5% from last month",
            },
            {
                uniqueId: 2,
                profileIcon: "/images/total-workers.png",
                title: "Total Workers",
                value: stats.totalWorkers?.toLocaleString() || "0",
                incrementIcon: "/images/increment-arrow.png",
                status: "Fetching...",
            },
            {
                uniqueId: 3,
                profileIcon: "/images/total-requests.png",
                title: "Total Requests",
                value: stats.totalBookings?.toLocaleString() || "0",
                incrementIcon: "/images/increment-arrow.png",
                status: "15.7% from last month",
            },
            {
                uniqueId: 4,
                profileIcon: "/images/total-services.png",
                title: "Total Services",
                value: stats.totalServices?.toLocaleString() || "0",
                incrementIcon: "/images/increment-arrow.png",
                status: "20.4% from last month",
            }
        ];

        setStatsDetails(dashboardStats);
    }, []);

    const fetchStats = useCallback(async () => {
        const jwtToken = localStorage.getItem("token");
        
        try {
            const response = await fetch("http://localhost:5000/admin/stats", {
                method: "GET",
                headers: { Authorization: `Bearer ${jwtToken}` }
            });

            if (response.ok) {
                const fetchedData = await response.json();
                mergeStats(fetchedData);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    }, [mergeStats]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleTotalWorkersChange = (newCount) => {
        setStatsDetails(prevStats => 
            prevStats.map(stat => 
                stat.uniqueId === 2 ? { ...stat, value: newCount.toLocaleString() } : stat
            )
        );
    };

    if (loading) {
        return (
            <div className={styles["loader-container"]}>
                <TailSpin
                    height="80"
                    width="80"
                    color="#4fa94d"        
                    ariaLabel="loading"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div className={styles["app-layout"]}>
            <div className={styles["main-content"]}>
                <div className={styles.main}>
                    <ul className={styles["admin-dashboard-container1"]}>
                        {statsDetails.map((detail) => (
                            <li
                                className={styles["admin-dashboard-container2"]}
                                key={detail.uniqueId}
                            >
                                <img
                                    src={detail.profileIcon}
                                    alt="profile-icons"
                                    className={styles["admin-dashboard-logo"]}
                                />
                                <div className={styles["stats-content"]}>
                                    <h1 className={styles["admin-title"]}>
                                        {detail.title}
                                    </h1>
                                    <h1 className={styles.value}>
                                        {detail.value}
                                    </h1>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles["two-column-layout"]}>
                        <div className={styles["left-column"]}>
                            <div className={styles["component-wrapper"]}>
                                <Worker onTotalWorkersChange={handleTotalWorkersChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;