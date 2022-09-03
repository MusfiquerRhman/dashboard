import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

function Sidebar({ children }) {
    let loggedin = localStorage.getItem('userInformations') !== null;

    return (
        <>
            {loggedin &&
                <div className='container'>
                    <div className='sidebar__container'>
                        <div className='sidebar__links'>
                            <NavLink to='/' className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
                                <span className='sidebar__link--text'>Coupons</span>
                            </NavLink>
                            <NavLink to='/vendors' className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
                                <span className='sidebar__link--text'>Vendors</span>
                            </NavLink>
                            <NavLink to='/category' className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
                                <span className='sidebar__link--text'>Category</span>
                            </NavLink>
                            <NavLink to='/users' className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
                                <span className='sidebar__link--text'>Users</span>
                            </NavLink>
                            <NavLink to='/profile' className={`sidebar__link ${(navData) => (navData.isActive ? "active" : '')}`}>
                                <span className='sidebar__link--text'>Profile</span>
                            </NavLink>
                        </div>
                    </div>
                    <main style={{ width: '100%', margin: '0 2rem' }}>{children}</main>
                </div>
            }
        </>
    )
}

export default Sidebar

