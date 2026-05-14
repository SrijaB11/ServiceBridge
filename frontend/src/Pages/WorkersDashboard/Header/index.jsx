import styles from "./index.module.css";

const Header = () => (
    <div className={styles["header-container1"]}>
        <div className={styles["header-container2"]}>
            <img
                src="/images/worker.png"
                alt="worker logo"
                className={styles["worker-logo"]}
            />

            <h1 className={styles["worker-title"]}>
                Workers Dashboard
            </h1>
        </div>

        <div className={styles["header-container3"]}>
            <div className={styles["header-details-container1"]}>
                <div>
                    <h1 className={styles["worker-heading"]}>
                        Availability
                    </h1>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <label className={styles.switch}>
                        <input type="checkbox" id="toggle" />

                        <span className={styles.slider}></span>
                    </label>

                    <span id="statusText">Unavailable</span>
                </div>
            </div>

            <div className={styles["workers-profile"]}>
                <div className={styles["workers-details-container"]}>
                    <img
                        src="/images/notifications.png"
                        alt="notifications"
                        className={styles.notifications}
                    />

                    <button
                        className={styles["notification-button"]}
                    >
                        3
                    </button>
                </div>

                <div className={styles["workers-profile-container"]}>
                    <div className={styles.profile}>
                        <img
                            src="/images/profile picture.png"
                            alt="profile picture"
                            className={styles["profile-picture"]}
                        />
                    </div>

                    <h1
                        value="name"
                        className={`${styles["option-value"]} ${styles.options}`}
                    >
                        Rakesh Kumar
                    </h1>
                </div>
            </div>
        </div>
    </div>
);

export default Header;