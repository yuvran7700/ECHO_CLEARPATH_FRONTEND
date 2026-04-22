import styles from '../styles/APIDoc.module.css'
import Navbar from '../components/APINavbar'
import DocsSidebar from '../components/APIScrollBar';
import APICards from '../components/APICards';
import HTTPTable from '../components/HTTPTable'
import ADAGE from '../components/ADAGE';
import APINav from '@/components/ApiComponents/ApiNavBar';

const APIDoc = () => {
    return (
        <div className={styles.page}>
            <APINav />    
            <div className={styles.body}> 
                <DocsSidebar />
                <div className={styles.container}>
                    <section id="overview">
                        <h2>Overview</h2>
                        <p>Clearpath API provides a suite of microservices for weather intelligence, 
                            real-time social signal collection and predictive transport analytics across 
                            the Sydney metropolitan area. This reference covers requests, errors, data 
                            formats, and the endpoints for all three services. </p> 
                        <p>
                            Clearpath API uses RESTful endpoints that accept form-encoded request bodies 
                            and returns standard JSON response bodies. It uses standard HTTP responses 
                            codes and bodies. </p>
                        <APICards />
                    </section>
                    <section id="statcodes">
                        <HTTPTable />
                    </section>
                    <section id="ADAGE">
                        <ADAGE />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default APIDoc;