import { Component } from "react";
import styles from "./index.module.css";

class Users extends Component {
    state = { 
        UserDetailsList: [],
        loading: true,
        searchTerm: "",
        currentPage: 1,
        itemsPerPage: 5
    };

    componentDidMount() {
        this.GetCustomersData();
    }

    GetCustomersData = async () => {
        this.setState({ loading: true });
        const JwtToken = localStorage.getItem("token");
        try {
            const UserDetails = await fetch("http://localhost:5000/admin/customers", {
                method: "GET",
                headers: { Authorization: `Bearer ${JwtToken}` }
            });
            const FetchedUserDetails = await UserDetails.json();
            console.log(FetchedUserDetails)
            if (UserDetails.ok === true && UserDetails.status === 200) {
                const UpdatedUsersData = FetchedUserDetails["data"].map((User) => ({
                    id: User.id,
                    CustomerName: User.fullName,
                    Email: User.email,
                    Location: User.location,
                    MobileNo: User.phone,
                }));
                this.setState({ UserDetailsList: UpdatedUsersData, loading: false });
            } else {
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            this.setState({ loading: false });
        }
    };

    handleSearch = (event) => {
        this.setState({ searchTerm: event.target.value, currentPage: 1 });
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage });
    };

    getStatusBadgeClass = (status) => {
        switch(status) {
            case 'Active': return styles.statusActive;
            case 'Inactive': return styles.statusInactive;
            case 'Blocked': return styles.statusBlocked;
            default: return styles.statusActive;
        }
    };

    render() {
        const { UserDetailsList, loading, searchTerm, currentPage, itemsPerPage } = this.state;

        // Filter users based on search term
        const filteredUsers = UserDetailsList.filter(user =>
            user.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.MobileNo?.includes(searchTerm)
        );

        // Pagination logic
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

        return (
            <>
                <h1 style={{marginTop:"10px",marginBottom:"20px",marginLeft:"10px",fontSize:"28px",color:"#10b981"}}>Customer Details</h1>
                <div className={styles.usersContainer}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>👥 Customer Directory</h3>
                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                placeholder="🔍 Search by name, email or phone..."
                                value={searchTerm}
                                onChange={this.handleSearch}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Loading customers...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.tableWrapper}>
                                <table className={styles.usersTable}>
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Email</th>
                                            <th>Mobile No</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.length > 0 ? (
                                            currentUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className={styles.customerName}>
                                                            <span className={styles.avatar}>
                                                                {user.CustomerName?.charAt(0)}
                                                            </span>
                                                            {user.CustomerName}
                                                        </div>
                                                    </td>
                                                    <td>{user.Email}</td>
                                                    <td>{user.MobileNo}</td>
                                                    <td>{user.Location}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className={styles.noData}>
                                                    No customers found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className={styles.pagination}>
                                    <button
                                        onClick={() => this.handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={styles.pageBtn}
                                    >
                                        ← Previous
                                    </button>
                                    <span className={styles.pageInfo}>
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => this.handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={styles.pageBtn}
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}

                            <div className={styles.footer}>
                                <span className={styles.totalCount}>
                                    Total Customers: {filteredUsers.length}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    }
}

export default Users;