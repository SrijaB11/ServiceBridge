import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

const Users = () => {
    // State management
    const [userDetailsList, setUserDetailsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Constant, so no setter needed
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    // Fetch data on mount
    useEffect(() => {
        getCustomersData();
    }, []);

    const getCustomersData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5000/admin/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                const list = (data.data || data).map(user => ({
                    id: user.id || user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    location: user.location
                }));
                setUserDetailsList(list);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditForm({ ...user });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const saveEdit = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/admin/customers/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                setEditingId(null);
                setEditForm({});
                getCustomersData(); 
                alert("Updated successfully!");
            } else {
                alert("Failed to update");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating customer");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this customer?")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/admin/customers/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                setUserDetailsList(prev => prev.filter(u => String(u.id) !== String(id)));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Logic for filtering and pagination
    const filteredUsers = userDetailsList.filter(user =>
        (user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <h1 style={{ marginTop: "10px", marginBottom: "20px", marginLeft: "10px", fontSize: "28px", color: "#10b981" }}>
                Customer Details
            </h1>

            <div className={styles.usersContainer}>
                <div className={styles.header}>
                    <h3 className={styles.title}>👥 Customer Directory</h3>
                    <input
                        type="text"
                        placeholder="🔍 Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className={styles.searchInput}
                    />
                </div>

                {loading ? <p>Loading...</p> : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.usersTable}>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            {editingId === user.id ? (
                                                <input
                                                    name="fullName"
                                                    value={editForm.fullName}
                                                    onChange={handleEditChange}
                                                    className={styles.inlineInput}
                                                />
                                            ) : (
                                                user.fullName
                                            )}
                                        </td>
                                        <td>
                                            {editingId === user.id ? (
                                                <input
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleEditChange}
                                                    className={styles.inlineInput}
                                                />
                                            ) : (
                                                user.email
                                            )}
                                        </td>
                                        <td>
                                            {editingId === user.id ? (
                                                <input
                                                    name="phone"
                                                    value={editForm.phone}
                                                    onChange={handleEditChange}
                                                    className={styles.inlineInput}
                                                />
                                            ) : (
                                                user.phone
                                            )}
                                        </td>
                                        <td>
                                            {editingId === user.id ? (
                                                <input
                                                    name="location"
                                                    value={editForm.location}
                                                    onChange={handleEditChange}
                                                    className={styles.inlineInput}
                                                />
                                            ) : (
                                                user.location
                                            )}
                                        </td>
                                        <td style={{ display: "flex", gap: "30px", cursor: "pointer" }}>
                                            {editingId === user.id ? (
                                                <>
                                                    <button onClick={saveEdit} className={styles.saveBtn}>Save</button>
                                                    <button onClick={cancelEditing} className={styles.cancelBtn}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditing(user)} className={styles.editBtn}>Edit</button>
                                                    <button onClick={() => handleDelete(user.id)} className={styles.deleteBtn}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Users;