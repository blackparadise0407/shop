import React, { useEffect } from 'react';
import { Header } from '../components';
import { Hero } from '../components';
import { makeRequest } from '../utils/api';
const Home = () => {
    const fetchData = async () => {
        try {
            const res = await makeRequest({
                method: "GET",
                url: "/api/categories"
            })
            console.log(res);

            return res;
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Header />
            <Hero />
        </div>
    );
}

export default Home;
