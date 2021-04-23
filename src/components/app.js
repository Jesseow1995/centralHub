import React, { Component } from 'react';
import MainPage from './mainPage';
import NavBar from './header/nav-bar';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='central-hub'>
          <NavBar />

          {this.props.children}
        </div>
      </div>
    );
  }
}
