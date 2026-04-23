import styles from '../styles/APIDoc.module.css'
import DocsSidebar from '../components/APIScrollBar';
import APIForecast from '@/components/APIForecast';
import APINav from '@/components/ApiComponents/ApiNavBar';

const APIForecastPage = () => {
    return (
        <div>
            <div className={styles.page}>
                <APINav />     
            <div className={styles.body}>
                <DocsSidebar />
                <div className={styles.container}>
                    <APIForecast />
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default APIForecastPage;