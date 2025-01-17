import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Shared/Navbar/Nav';
import SharedFooter from '../../Shared/Footer/SharedFooter';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
        </div>
    );
};

export default Home;