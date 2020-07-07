import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = () => {
    const style = {
        width: "100%",
        minHeight: "100vh",
        background: "url(/images/background9.jpg) center no-repeat",
        backgroundSize: 'cover',
    }
    return (
        <section style={style}>
            <Dashboard />
        </section>
    );
}

export default DashboardPage;
