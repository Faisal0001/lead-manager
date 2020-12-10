import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, isLoading, isAuthenticated, ...rest }) => (
	<Route {...rest} render={props => {
		if (isLoading) {
			<h2>Loading...</h2>
		} else
		if (!isAuthenticated) {
			return <Redirect to='/login' />
		} else {
			return <Component {...props} />
		}
	}}
	/>
)

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading,
})


export default connect(mapStateToProps, null)(PrivateRoute)

