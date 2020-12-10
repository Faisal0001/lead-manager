import React, { useState, } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addLead } from '../redux/leadsReducer'
import { useAlert } from 'react-alert'
import './css/Form.css'

const Form = ({ addLead, error }) => {
	const alert = useAlert()

	const [lead, setLead] = useState({
		name: '',
		email: '',
		message: '',
	})
	const handleChange = (e) => setLead({
		...lead,
		[e.target.name]: e.target.value
	})
	const validateForm = () => {
		const errors = []
		if (!lead.name) errors.push(alert.error('Name can not be empty.'))
		if (!lead.email) errors.push(alert.error('Email can not be empty.'))
		if (!lead.message) errors.push(alert.error('Message can not be empty.'))
		if (errors.length > 0) {
			return errors
		} else return true
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm() === true) {
			addLead(lead)
			setLead({ name: '', email: '', message: '' })
		}
	}
	return (
		<div className='form'>
			<h2>Add Lead</h2>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<label htmlFor="name">Name</label>
				<input autoComplete="false" type="text" name="name" id="name" value={lead.name} onChange={handleChange} />
				<label htmlFor="email">Email</label>
				<input autoComplete="false" type="email" name="email" id="email" value={lead.email} onChange={handleChange} />
				<label htmlFor="message">Message</label>
				<textarea type="text" name="message" id="message" value={lead.message} onChange={handleChange} />
				<input type="submit" value='Submit' />
			</form>
		</div>
	)
}

Form.propTypes = {
	addLead: PropTypes.func.isRequired,
	error: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	error: state.leads.error,
})

const mapDispatchToProps = {
	addLead: (data) => addLead(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
