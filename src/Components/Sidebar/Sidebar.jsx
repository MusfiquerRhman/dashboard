import React from 'react';
import { NavLink } from 'react-router-dom';
import foodAndWine from "../../Assets/icons8-food-and-wine-96.png";
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
                        <div className="sidebar__iconbox">
                            <img src={foodAndWine} alt="Food and Wine" className='sidebar__icon'/>
                        </div>
                        <div className='sidebar__links' style={{marginTop: '0'}}>
                            <CustomNavLinks link='/' text="Coupons"/>
                            <CustomNavLinks link='/vendors' text="Vendors"/>
                            <CustomNavLinks link='/category' text="Category"/>
                            <CustomNavLinks link='/users' text="Users"/>
                            <CustomNavLinks link='/profile' text="Profile"/>
                        </div>
                    </div>
                    <main style={{ width: '100%', marginLeft: '270px' }}>{children}</main>
                </div>
            }
        </>
    )
}

export default Sidebar

