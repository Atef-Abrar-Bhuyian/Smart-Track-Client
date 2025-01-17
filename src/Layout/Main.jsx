import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Pages/Shared/Navbar/Nav';
import SharedFooter from '../Pages/Shared/Footer/SharedFooter';



const Main = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <SharedFooter></SharedFooter>
        </div>
    );
};

export default Main;