import styles from '../styles/APIDoc.module.css'
import Navbar from '../components/APINavbar'
import DocsSidebar from '../components/APIScrollBar';
import APICards from '../components/APICards';
import HTTPTable from '../components/HTTPTable'
import Collected from '../components/Collected';

const APIDocCollected = () => {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.body}>
                <DocsSidebar />
                <div className={styles.container}>
                    <Collected />
                </div>
            </div>
        </div>
    );
};

export default APIDocCollected;