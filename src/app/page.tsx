import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Index
                </p>
            </div>
            <div className={styles.description}>
                <a href={"/home"}>
                    Go to Home
                </a>
            </div>
            <div className={styles.description}>
                <a href={"/login"}>
                   Login
                </a>
            </div>
        </main>
    );
}
