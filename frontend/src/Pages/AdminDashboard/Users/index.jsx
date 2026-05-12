import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from '../../../redux/slices/workerSlice';
const Users = () => {
    const dispatch = useDispatch();
   
    const { workers, currentWorker, loading, error } = useSelector(
        (state) => state.workers
    );
    useEffect(() => {
        dispatch(fetchWorkers());
    }, [dispatch]);
    console.log('Current Redux State:', { workers, currentWorker, loading, error });
    if (loading) return <div className="loading">Loading user details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    const user = currentWorker || (workers.length > 0 ? workers[0] : null);
    return (
        <div className="table-wrapper">
            <div className="table-title">User Details</div>
           
            {user ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-data">
                            <td data-label="Field">Full Name</td>
                            <td data-label="Value">{user.fullName || user.name || 'N/A'}</td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Email</td>
                            <td data-label="Value">{user.email}</td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Phone</td>
                            <td data-label="Value">{user.phone}</td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Location</td>
                            <td data-label="Value">{user.location}</td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Role</td>
                            <td data-label="Value">
                                <span className="badge">Worker</span>
                            </td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Services</td>
                            <td data-label="Value">{user.services || 'N/A'}</td>
                        </tr>
                        <tr className="table-data">
                            <td data-label="Field">Address</td>
                            <td data-label="Value">{user.address}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};
export default Users;
