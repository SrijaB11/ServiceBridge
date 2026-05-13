import "./index.css";

const UserDetails=[
    {
        UniqueId:1,
        fullName:"Deepak Mahesh",
        email:"deepak@gmail.com",
        phone:123456789,
        location:"KPHB Colony, Hyderabad Telangana",
        role:"Software Developer at Google",
        services:"",
        address:"KPHB Colony, Hyderabad Telangana"
    }
]

function Users() {
    return (
        <div className="table-wrapper">
            <div className="table-title">User Details</div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <ul>
                        {
                            UserDetails.map((User) => (
                                <>
                                    <tr className="table-data">
                                        <td data-label="Field">Full Name</td>
                                        <td data-label="Value">{User.fullName}</td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Email</td>
                                        <td data-label="Value">{User.email}</td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Phone</td>
                                        <td data-label="Value">{User.phone}</td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Location</td>
                                        <td data-label="Value">{User.location}</td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Role</td>
                                        <td data-label="Value">
                                            <span className="badge">User</span>
                                        </td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Services</td>
                                        <td data-label="Value">{User.services}</td>
                                    </tr>
                                    <tr className="table-data">
                                        <td data-label="Field">Address</td>
                                        <td data-label="Value">{User.address}</td>
                                    </tr>
                                </>
                            ))
                        }
                    </ul>
                </tbody>
            </table>
        </div>
    );
}

export default Users;