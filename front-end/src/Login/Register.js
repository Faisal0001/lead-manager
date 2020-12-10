import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './css/Register.css'
import { Link } from 'react-router-dom'

export class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			username: "",
			email: "",
			password1: "",
			password2: "",
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = (e) => {
		e.preventDefault()
		console.log('submit')
	}

	render() {
		const { username, email, password1, password2 } = this.state
		return (
			<div className='register'>
				<div className="register__form">
					<h2>Register</h2>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="username">Username</label>
						<input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
						<label htmlFor="email">Email</label>
						<input type="text" name="email" id="email" value={email} onChange={this.handleChange} />
						<label htmlFor="password1">Password</label>
						<input type="text" name="password1" id="password1" value={password1} onChange={this.handleChange} />
						<label htmlFor="password2">Confirem Password</label>
						<input type="text" name="password2" id="password2" value={password2} onChange={this.handleChange} />
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
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
