import React, { Component } from 'react';

import Styles from '../styles/styles'
import NavbarWrapper from './navbar-wrapper'

export default class App extends Component {
  render() {
    return (
      <div className="main-container" style={{...Styles.mainContainerStyles}}>
      	<NavbarWrapper />
      </div>
    )
  }
}
