import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux'


export class Alerts extends Component {
	// static propTypes = {
	// 	error: PropTypes.object.isRequired,
	// }

	componentDidUpdate(prevProps) {
		const { error, alert } = this.props
		if (error !== prevProps.error) {
			if (error.name) {
				alert.error('Name is required')
			}
			if (error.email) {
				alert.error('Email is required')
			}
		}

	}
	render() {
		return (
			<Fragment />
		)
	}
}

const mapStateToProps = (state) => ({
	error: state.leads.error.message,
})


export default connect(mapStateToProps, null)(withAlert()(Alerts))
