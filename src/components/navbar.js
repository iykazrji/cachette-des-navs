import React, {Component} from 'react'
import PropTypes from 'prop-types'

import MainStyles from '../styles/styles'

export default class Navbar extends Component{
	constructor(props){
		super(props)
		this.state = {
			navHeight: null,
			lastScrollTop: 0,
			delta: 5,
			isNavVisible: true
		}
		this.hasScrolled = this.hasScrolled.bind(this)
		this.renderNavbar = this.renderNavbar.bind(this)
		this.checkNavVisibility = this.checkNavVisibility.bind(this)
	}
	componentDidMount(){
		this.setState({
			navHeight: this.node.offsetHeight,
		})
		this.checkNavVisibility()

	}
	componentWillUnmount(){
		// Clear the intervals, timeouts and EventListeners we s we'd Create in the
		// ComponentDidMount Method
		clearInterval(this.checkNavVisibility)
	}

	// This will simply return an interval we can clear once we Unmount the component...
	checkNavVisibility(){
		return (
			setInterval(()=>{
				if(this.props.isScrolling){
					this.hasScrolled()
				}
			}, 250)
		)
	}    
	hasScrolled(){
		let scrollTop = document.body.scrollTop
		// Make sure User has scrolled past the Delta...
		if(Math.abs(this.state.lastScrollTop - scrollTop) <= this.state.delta){
			return
		}
		// If User scrolled down and are past the navbar, set Visible to false
	    // This is necessary so you never see what is "behind" the navbar.
	    if (scrollTop > this.state.lastScrollTop && scrollTop > this.state.navHeight){
	    	// Scrolling Down
	    	this.setState({
	    		isNavVisible: false
	    	})
	    }else{
	    	// Scrolling Up
	    	if(scrollTop + window.innerHeight < document.body.clientHeight) {
	            this.setState({
	            	isNavVisible: true
	            })
	        }
	    }
	   	// Reset the LastScrollTop state to The current Scroll Position
	    this.setState({
	    	lastScrollTop: scrollTop
	    })
	}
	renderNavbar(){
		// Declare possible styles...
		let styles = {
			generalStyles:{
				backgroundColor: this.props.backgroundColor,
				height: this.props.height,
				transition: 'all 0.4s ease-in'
			},
			visibleStyles:{
				transform: 'translateY(0px)',
			},
			hiddenStyles: {
				transform: 'translateY(-'+this.props.height+')',
			}
		}
		if(this.state.isNavVisible){
			return(
				<div className="navbar-component nav-visible" style={{...MainStyles.navbarStyles, ...styles.generalStyles, ...styles.visibleStyles}} ref={ (node)=>{this.node = node} }>
				</div>
			)
		}else{
			return(
				<div className="navbar-component nav-hidden" style={{...MainStyles.navbarStyles, ...styles.generalStyles, ...styles.hiddenStyles}} ref={ (node)=>{this.node = node} }>
				</div>	
			)
		}		
	}
    render(){
		return (this.renderNavbar())	
    }
}
