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

const authReducer = (state = initialState, { type, payload }) => {
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
		case USER_REGISTER:
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
export default authReducer


// ACTIONS

// Load User
export const loadUser = () => async (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	try {
		const response = await axios.get('http://localhost:8000/api/auth/user', tokenConfig(getState))
		const user = await response.data
		dispatch({
			type: USER_LOADED,
			payload: user,
		})
	} catch (error) {
		dispatch(addError(error))
	}
}

// Login
export const login = (user) => (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	const body = JSON.stringify(user)
	axios.post('http://localhost:8000/api/auth/login', body, tokenConfig(getState))
		.then(response => {
			dispatch({ type: USER_LOGIN, payload: response.data })
		}).catch(error => dispatch(addError(error)))
}

// Logout
export const logout = () => (dispatch, getState) => {
	axios.post('http://localhost:8000/api/auth/logout', null, tokenConfig(getState))
		.then(response => {
			dispatch({ type: USER_LOGOUT })
		})
		.catch(error => {
			console.log(error.data)
			addError(error)
		})
}

// Register
export const register = (user) => (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	const body = JSON.stringify(user)
	axios.post('http://localhost:8000/api/auth/register', body, tokenConfig(getState))
		.then(response => {
			dispatch({ type: USER_REGISTER, payload: response.data })
		}).catch(error => dispatch(addError(error)))
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

