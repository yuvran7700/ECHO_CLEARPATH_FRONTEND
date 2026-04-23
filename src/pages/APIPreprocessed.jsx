import styles from '../styles/APIDoc.module.css'
import DocsSidebar from '../components/APIScrollBar';
import Preprocessed from '../components/Preprocessed';
import APINav from '@/components/ApiComponents/ApiNavBar';

const APIDocCollected = () => {
    return (
        <div>
            <div className={styles.page}>
                <APINav />     
            <div className={styles.body}>
                <DocsSidebar />
                <div className={styles.container}>
                    <Preprocessed />
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default APIDocCollected;