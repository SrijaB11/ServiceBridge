import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkers } from '../../../redux/slices/workerSlice';
import styles from "./index.module.css";

const UsersTable = () => {
    const dispatch = useDispatch();

    const { workers, loading, error } = useSelector(
        (state) => state.workers
    );

    useEffect(() => {
        dispatch(fetchWorkers());
    }, [dispatch]);

    console.log('Workers Data:', workers);

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading users...
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                Error: {error}
            </div>
        );
    }

    return (
        <div className={styles["table-wrapper"]}>
            <div className={styles["table-title"]}>
                All Users ({workers.length})
            </div>

            {workers.length > 0 ? (
                <table className={styles["user-table"]}>
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
                            <tr
                                key={user._id || user.id || index}
                                className={styles["table-row"]}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    {user.fullName ||
                                     user.name ||
                                     user.full_name ||
                                     'N/A'}
                                </td>
                                <td>{user.email || 'N/A'}</td>
                                <td>{user.phone || 'N/A'}</td>
                                <td>{user.location || 'N/A'}</td>
                                <td>
                                    <span className={`${styles.badge} ${styles["badge-worker"]}`}>
                                        Worker
                                    </span>
                                </td>
                                <td>{user.services || user.service || 'N/A'}</td>
                                <td>{user.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={styles["no-data"]}>
                    No users found in database.
                </p>
            )}
        </div>
    );
};

export default UsersTable