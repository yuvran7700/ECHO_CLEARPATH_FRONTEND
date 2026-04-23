import styles from '../styles/APIDoc.module.css'
import DocsSidebar from '../components/APIScrollBar';
import APICards from '../components/APICards';
import HTTPTable from '../components/HTTPTable'
import Collected from '../components/Collected';
import APINav from '@/components/ApiComponents/ApiNavBar';

const APIDocCollected = () => {
    return (
        <div>
            <div className={styles.page}>
                <APINav />     
            <div className={styles.body}>
                <DocsSidebar />
                <div className={styles.container}>
                    <Collected />
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default APIDocCollected;