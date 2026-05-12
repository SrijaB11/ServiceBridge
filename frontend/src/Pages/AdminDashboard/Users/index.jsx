// src/Pages/AdminDashboard/Users/index.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from '../../../redux/slices/workerSlice';

const Users = () => {
    const dispatch = useDispatch();
    const { workers, loading, error } = useSelector((state) => state.workers);

    useEffect(() => {
        dispatch(fetchWorkers());
    }, [dispatch]);

    console.log('Workers Data:', workers);

    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="table-wrapper">
            <div className="table-title">All Users ({workers.length})</div>

            {workers.length > 0 ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Role</th>
                            <th>Services</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map((user, index) => (
                            <tr key={user._id || user.id || index} className="table-row">
                                <td>{index + 1}</td>
                                <td>{user.fullName || user.name || user.full_name || 'N/A'}</td>
                                <td>{user.email || 'N/A'}</td>
                                <td>{user.phone || 'N/A'}</td>
                                <td>{user.location || 'N/A'}</td>
                                <td>
                                    <span className="badge badge-worker">Worker</span>
                                </td>
                                <td>{user.services || user.service || 'N/A'}</td>
                                <td>{user.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No users found in database.</p>
            )}
        </div>
    );
};

export default Users;