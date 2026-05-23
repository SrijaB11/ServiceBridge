import React, { useState, useEffect, useCallback } from "react";
import Worker from "../Worker";
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
            <div className="flex justify-center items-center h-[80vh] w-full">
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
        <div className="flex min-h-screen w-full font-['Roboto',sans-serif]">
            <div className="flex-1 overflow-x-auto bg-[#f0fdf4]">
                <div className="p-5 min-h-screen w-full max-w-[1400px] mx-auto">
                    
                    <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7.5 cursor-pointer">
                        {statsDetails.map((detail) => (
                            <li
                                key={detail.uniqueId}
                                className="bg-gradient-to-br from-white to-[#f8fff8] rounded-2xl p-5 flex items-center gap-4 shadow-[0_4px_12px_rgba(16,185,129,0.08)] border border-[#d1fae5] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)] hover:border-[#a7f3d0]"
                            >
                                <img
                                    src={detail.profileIcon}
                                    alt="profile-icons"
                                    className="h-10 w-10"
                                />
                                <div className="flex-1">
                                    <h1 className="text-[13px] text-[#047857] mb-2 font-black tracking-[0.3px]">
                                        {detail.title}
                                    </h1>
                                    <h1 className="text-[28px] text-[#064e3b] mb-2 font-black">
                                        {detail.value}
                                    </h1>
                                    {/* <div className="flex items-center gap-1.5">
                                        <img 
                                            src={detail.incrementIcon} 
                                            alt="increment" 
                                            className="h-3 w-3"
                                        />
                                        <span className="text-[11px] text-[#10b981] font-medium">
                                            {detail.status}
                                        </span>
                                    </div> */}
                                </div>
                            </li>
                        ))}
                    </ul>

                    
                    <div className="flex flex-col">
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(16,185,129,0.06)] overflow-hidden w-full border border-[#d1fae5] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.1)] hover:border-[#a7f3d0]">
                                <div className="[&>div]:!p-0 [&>div]:!bg-transparent [&>div]:!shadow-none">
                                    <Worker onTotalWorkersChange={handleTotalWorkersChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;