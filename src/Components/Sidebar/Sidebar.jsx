import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const CustomNavLinks = ({text, link}) => (
    <NavLink end to={link} className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
        <span className='sidebar__link--text'>{text}</span>
    </NavLink>
)

function Sidebar({ children }) {
    let loggedin = localStorage.getItem('userInformations') !== null;

    return (
        <>
            {loggedin &&
                <div className='container'>
                    <div className='sidebar__container'>
                        <div className='sidebar__links'>
                            <CustomNavLinks link='/' text="Coupons"/>
                            <CustomNavLinks link='/vendors' text="Vendors"/>
                            <CustomNavLinks link='/category' text="Category"/>
                            <CustomNavLinks link='/users' text="Users"/>
                            <CustomNavLinks link='/profile' text="Profile"/>
                        </div>
                    </div>
                    <main style={{ width: '100%', margin: '0 2rem' }}>{children}</main>
                </div>
            }
        </>
    )
}

export default Sidebar

