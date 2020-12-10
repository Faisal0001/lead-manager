import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addLead } from '../redux/leadsReducer'
import './css/Form.css'

export class Form extends Component {
	static propTypes = {
		addLead: PropTypes.func.isRequired,
		error: PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			message: '',
		}
	}

	handleChange = (e) => this.setState({
		[e.target.name]: e.target.value
	})

	handleSubmit = (e) => {
		e.preventDefault()
		const data = this.state
		this.props.addLead(data)
		this.setState({
			name: '',
			email: '',
			message: '',
		})

	}

	componentDidMount() {
		// this.props.alert.show('It works')
	}

	render() {
		const { name, email, message } = this.state
		return (
			<div className='form'>
			<h2>Add Lead</h2>
				<form onSubmit={this.handleSubmit} autoComplete='off'>
					<label htmlFor="name">Name</label>
					<input autoComplete="false"  type="text" name="name" id="name" value={name} onChange={this.handleChange} />
					<label htmlFor="email">Email</label>
					<input autoComplete="false"  type="text" name="email" id="email" value={email} onChange={this.handleChange} />
					<label htmlFor="message">Message</label>
					<textarea  type="text" name="message" id="message" value={message} onChange={this.handleChange} />
					<input type="submit" value='Submit' />
				</form>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
	error: state.leads.error,
})

const mapDispatchToProps = {
	addLead : (data) => addLead(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
