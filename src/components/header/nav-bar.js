import React, { Component } from 'react';
import history from '../../history';

export default class NavBar extends Component {


    render() {
        return (
            <div className='nav-bar'>
                <div className='nav-bar-links'>
                    <a className='nav-bar__link' onClick={() => history.push('/')}>Home</a>
                    <a className='nav-bar__link' onClick={() => history.push('/lifeUpdates')}>Life Updates</a>
                    <a className='nav-bar__link' onClick={() => history.push('/media')}>Media</a>
                    <a className='nav-bar__link' onClick={() => history.push('/blog')}>Blog</a>
                </div>


            </div>
        )
    }
}