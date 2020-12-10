import axios from 'axios'
import { tokenConfig } from './authReducer'
export const ADD_LEAD = 'ADD_LEADS'
export const GET_LEADS = 'GET_LEADS'
export const DELETE_LEAD = 'DELETE_LEAD'
export const UPDATE_LEAD = 'UPDATE_LEAD'

// Errors
export const ADD_LEAD_ERROR = 'ADD_LEAD_ERROR'

const initialState = {
	leads: [],
	error: {
		message: {},
		status: null,
	}

}

// Reducer
const leadsReducer = (state = initialState, { type, payload }) => {
	switch (type) {

		case GET_LEADS:
			return {
				...state,
				leads: payload
			}

		case ADD_LEAD:
			console.log(state)
			return {
				...state,
				leads: [...state.leads, payload]
			}
		case DELETE_LEAD:
			const newLeads = state.leads.filter(lead => lead.id !== payload.id)
			return {
				...state,
				leads: newLeads
			}
		case ADD_LEAD_ERROR:
			return {
				...state,
				error: {
					message: payload.message,
					status: payload.status,
				}
			}

		default:
			return state
	}
}
export default leadsReducer


// ACTIONS

// Get leads
export const getLeads = () => async (dispatch, getState) => {
	try {
		const response = await axios.get('http://localhost:8000/api/leads', tokenConfig(getState))
		const leads = await response.data
		return dispatch({
			type: GET_LEADS,
			payload: leads,
		})
	} catch (error) {
		dispatch(addLeadError(error))
	}
}

// Add lead
export const addLead = (data) => async (dispatch, getState) => {
	try {
		const response = await axios.post('http://localhost:8000/api/leads/', data, tokenConfig(getState))
		const lead = await response.data
		return dispatch({
			type: ADD_LEAD,
			payload: lead,
		})
	} catch (error) {
		dispatch(addLeadError(error))
	}
}

// Delete lead
export const deleteLead = (id) => async (dispatch, getState) => {
	try {
		axios.delete(`http://localhost:8000/api/leads/${id}/`, tokenConfig(getState))
		return dispatch({
			type: DELETE_LEAD,
			payload: { id },
		})
	} catch (error) {
		dispatch(addLeadError(error))
	}
}



// HELPER FUNCTIONS

export const addLeadError = (error) => dispatch => {
	const message = error.response.data
	const status = error.response.status
	dispatch({
		type: ADD_LEAD_ERROR,
		payload: {
			message,
			status,
		}
	})
}
