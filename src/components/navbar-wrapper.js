import React, {Component} from 'react';
import PropTypes from 'prop-types'

import Styles from '../styles/styles'
import Navbar from './navbar'

export default class NavbarWrapper extends Component{
	constructor(props){
		super(props)
		this.state = {
			isScrolling: false
		}
		this.startScroll = this.startScroll.bind(this)
		this.stopScroll = this.stopScroll.bind(this)
	}
	startScroll(){
		this.setState({
			isScrolling: true
		})
	}
	stopScroll(){
		this.setState({
			isScrolling: false
		})	
	}
	componentDidMount(){

		let timer = null
		window.addEventListener('scroll', ()=>{
			if(timer !== null){
				clearTimeout(timer)
				if(!this.state.isScrolling){
					this.startScroll()
				}
			}
			timer = setTimeout(()=>{
				if(this.state.isScrolling){
					this.stopScroll()
				}
			}, 250)
		})
	}
	componentWillUnmount(){
		window.removeEvenetListener('scroll')
	}
	render(){
		return (
	        <div className="navbar-wrapper" style={{...Styles.navbarWrapperStyles}}>
	        	<Navbar backgroundColor="#000000" height="90px" isScrolling={this.state.isScrolling} />
	        </div>
    	);	
	}
    
}
