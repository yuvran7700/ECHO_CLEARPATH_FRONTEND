import styles from '../styles/APIDoc.module.css'
import DocsSidebar from '../components/APIScrollBar';
import AlertCollection from '@/components/AlertCollection';
import APINav from '@/components/ApiComponents/ApiNavBar';

const APIAlertCollected = () => {
    return (
        <div>
            <div className={styles.page}>
                <APINav />     
            <div className={styles.body}>
                <DocsSidebar />
                <div className={styles.container}>
                    <AlertCollection />
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default APIAlertCollected;