import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './css/Login.css'
import { login } from '../redux/authReducer';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Login extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool,
	}
	constructor(props) {
		super(props)

		this.state = {
			username: "",
			password: "",
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.login(this.state)
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to='/' />
		}
		const { username, password } = this.state
		return (
			<div className='login'>
				<div className="login__form">
					<h2>Login</h2>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
						<label htmlFor="password">Password</label>
						<input type="text" name="password" id="password" value={password} onChange={this.handleChange} />
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
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
	login: (user) => login(user)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
