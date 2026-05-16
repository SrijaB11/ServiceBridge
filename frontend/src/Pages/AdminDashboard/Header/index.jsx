import styles from "./index.module.css"

const AdminHeader = () => (
    <div className={styles["header-container1"]}>
        <div className={styles["header-container2"]}>
            <img 
                src="/images/admin.png" 
                alt="admin logo" 
                className={styles["admin-logo"]}
            />
            
            <h1 className={styles["admin-title"]}>
                Admin Dashboard
            </h1>
        </div>

        <div className={styles["header-container3"]}>
            <div className={styles["admin-profile"]}>
                
                <div className={styles["admin-details-container"]}>
                    <img 
                        src="/images/notifications.png" 
                        alt="notifications" 
                        className={styles["notifications"]}
                    />

                    <button className={styles["notification-button"]}>
                        3
                    </button>
                </div>

                <div className={styles["admin-profile-container"]}>
                    <div className={styles.profile}>
                        <img 
                            src="/images/profile picture.png" 
                            alt="profile picture" 
                            className={styles["profile-picture"]}
                        />
                    </div>

                    <h1 className={`${styles["option-value"]} ${styles.options}`}>
                        Rakesh Kumar
                    </h1>
                </div>
            </div>
        </div>
    </div>
)

export default AdminHeader