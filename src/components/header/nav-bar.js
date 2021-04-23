import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import history from '../../history';

export default class NavBar extends Component {


    render() {
        return (
            <div className='nav-bar'>
                <div>
                    {/* <NavLink exact to='/' className='nav-bar-link'>Home</NavLink>
                    <NavLink exact to='/lifeUpdates' className='nav-bar-link'>Life Updates</NavLink>
                    <NavLink exact to='/media' className='nav-bar-link'>Media</NavLink> */}
                    <a className='nav-bar__link' onClick={() => history.push('/')}>Home</a>
                    <a className='nav-bar__link' onClick={() => history.push('/lifeUpdates')}>Life Updates</a>
                    <a className='nav-bar__link' onClick={() => history.push('/media')}>Media</a>
                    <a className='nav-bar__link' onClick={() => history.push('/blog')}>Blog</a>


                </div>


            </div>
        )
    }
}