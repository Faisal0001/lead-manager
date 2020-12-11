import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './css/Login.css'
import { login } from '../redux/authReducer';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {useAlert} from 'react-alert'



export const Login = ({isAuthenticated, login}) => {
	const [user, setUser] = useState({email: "", password: ""})
	const alert = useAlert()

	if (isAuthenticated) {
		return <Redirect to='/' />
	}
	const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value })

	const validateForm = () => {
		const errors = []
		if (!user.email) errors.push(alert.error('Email can not be empty.'))
		if (!user.password) errors.push(alert.error('Password can not be empty.'))
		if (errors.length > 0) {
			return errors
		} else return true
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm() === true) {
			login(user)
			setUser({ email: '',  password: '' })
		}
	}

	return (
		<div className='login'>
			<div className="login__form">
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
					<label htmlFor="password">Password</label>
					<input type="text" name="password" id="password" value={user.password} onChange={handleChange} />
					<input type="submit" value='Log In' />
					<div className="login__register">
						<p>Don't have an account?</p>
						<Link to='/register'><button>Register</button></Link>
					</div>
				</form>
			</div>
		</div>
	)
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
	login: (user) => login(user)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)

