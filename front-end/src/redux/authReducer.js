import axios from 'axios'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOADING = 'USER_LOADING'
export const AUTH_ERROR = 'AUTH_ERROR'
export const USER_LOADED = 'USER_LOADED'

const initialState = {
	token: localStorage.getItem('token'),
	user: {},
	isAuthenticated: false,
	isLoading: false,
	error: {
		msg: {},
		status: null,
	},
}

export default (state = initialState, { type, payload }) => {
	switch (type) {

		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			}

		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: payload,
			}

		case USER_LOGIN:
			localStorage.setItem('token', payload.token)
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				user: payload.user,
				token: payload.token,

			}

		case USER_LOGOUT:
			localStorage.removeItem('token')
			return {
				token: null,
				user: {},
				isAuthenticated: false,
				isLoading: false,
				error: {
					msg: {},
					status: null,
				},
			}

		case AUTH_ERROR:
			localStorage.removeItem('token')
			return {
				...state,
				isLoading: false,
				token: null,
				user: {},
				isAuthenticated: false,
				error: {
					msg: payload.data,
					status: payload.status,
				},
			}

		default:
			return state
	}
}

// ACTIONS

// Load User
export const loadUser = () => async (dispatch, getState) => {
	try {
		const response = await axios.get('http://localhost:8000/api/auth/user', tokenConfig(getState))
		const user = await response.data
		dispatch({
			type: USER_LOADED,
			payload: user,
		})
		console.log('it workds')
	} catch (error) {
		dispatch(addError(error))
	}
}

// Login
export const login = (user) => async (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	const body = JSON.stringify(user)
	try {
		const response = await axios.post('http://localhost:8000/api/auth/login', body, tokenConfig(getState))
		const user = await response.data.user
		const token = await response.data.token
		dispatch({
			type: USER_LOGIN,
			payload: {
				user,
				token,
			},
		})
	} catch (error) {
		console.log(error)
		dispatch(addError(error))
	}
}

// logout
export const logout = () => (dispatch, getState) => {

	axios.post('http://localhost:8000/api/auth/logout/', null, tokenConfig(getState))
		.then(response => {
			dispatch({ type: USER_LOGOUT })
		})
		.catch(error => {
			console.log(error.data)
			addError(error)
		})

}


// HELPER FUNCTIONS

// get token
export const tokenConfig = (getState) => {
	const token = getState().auth.token
	const config = {
		headers: {
			'Content-Type': 'application/json',
		}
	}
	if (token) {
		config.headers['Authorization'] = `Token ${token}`
	}
	return config
}


// add error
export const addError = error => {
	return {
		type: AUTH_ERROR,
		payload: {
			msg: error.data,
			status: error.status,
		}
	}
}

