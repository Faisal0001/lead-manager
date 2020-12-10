import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authReducer'
import './css/Header.css'

export const Header = ({ isAuthenticated, user, logout }) => {
	const authinks = (<div className='user'>
		<h3>Hello, {user.username}</h3>
		<button onClick={logout}>Logout</button>
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

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
})


export default connect(mapStateToProps, { logout })(Header)
