import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './css/Register.css'
import { Link } from 'react-router-dom'
import { register } from '../redux/authReducer'
import { Redirect } from 'react-router-dom'

export const Register = ({ isAuthenticated }) => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	})

	if (isAuthenticated) {
		return <Redirect to='/' />
	}

	const handleChange = (e) => setUser({ [e.target.name]: e.target.value })

	const validateForm = () => {
		const errors = []
		if (!user.username) errors.push(alert.error('Username can not be empty.'))
		if (!user.email) errors.push(alert.error('Email can not be empty.'))
		if (!user.password1) errors.push(alert.error('Password can not be empty.'))
		if (!user.password1 !== user.password2) errors.push(alert.error('Confirm can not be empty.'))
		if (errors.length > 0) {
			return errors
		} else return true
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm() === true) {
			const data = {
				username: user.username,
				email: user.email,
				password: user.password1,
			}
			register(data)
			setUser({ email: '', password: '' })
		}
	}


	return (
		<div className='register'>
			<div className="register__form">
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" value={user.username} onChange={handleChange} />
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" value={user.email} onChange={handleChange} />
					<label htmlFor="password1">Password</label>
					<input type="text" name="password1" id="password1" value={user.password1} onChange={handleChange} />
					<label htmlFor="password2">Confirem Password</label>
					<input type="text" name="password2" id="password2" value={user.password2} onChange={handleChange} />
					<input type="submit" value='Register' />
					<div className="register__login">
						<p>Already Have an account?</p>
						<Link to='/login'><button>Login</button></Link>
					</div>
				</form>
			</div>
		</div>
	)
}

Register.propTypes = {
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { register })(Register)
