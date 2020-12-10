import React, { Component } from 'react'
import './css/Leads.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteLead, getLeads } from '../redux/leadsReducer'

export class Leads extends Component {
	static propTypes = {
		leads: PropTypes.array.isRequired,
		deleteLead: PropTypes.func.isRequired,
	}
	componentDidMount() {
		this.props.getLeads()
	}

	render() {
		const leads = this.props.leads
		const deleteLead = (id) => this.props.deleteLead(id)
		return (
			<div className='leads'>
			<div className="leads__table">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Message</th>
							<th>Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{leads.map(lead => {
							const { id, name, email, message, created_at } = lead
							return <tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td>{email}</td>
								<td>{message}</td>
								<td>{created_at}</td>
								<td><button onClick={() => deleteLead(id)}>Delete</button></td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	leads: state.leads.leads
})

const mapDispatchToProps = {
	getLeads: () => getLeads(),
	deleteLead: (id) => deleteLead(id),
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads)

