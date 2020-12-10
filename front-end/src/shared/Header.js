import React, { Component } from 'react'
import './css/Header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../redux/authReducer'

export class Header extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired,
	}

	render() {
		const { isAuthenticated, user } = this.props.auth
		const authinks = (<div className='user'>
			<h3>Hello, {user.username}</h3>
			<button onClick={() => this.props.logout()}>Logout</button>
		</div>)
		const guestLinks = (<nav>
			<ul>
				<Link className='link' to='/register'>
					<li>Register</li>
				</Link>
				<Link className='link' to='/login'>
					<li>Login</li>
				</Link>
			</ul>
		</nav>)

		return (
			<div className='header'>
				<header>
					<div className="header__heading">
						<Link className='link' to='/'><h2>Lead Manager</h2></Link>
					</div>
					{isAuthenticated ? authinks : guestLinks}
				</header>
			</div>

		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Header)
