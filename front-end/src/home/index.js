import React, { Component } from 'react'
import './css/index.css'
import Leads from './Leads'
import Form from './Form'
import Alerts from '../shared/Alerts'

export class index extends Component {
	render() {
		return (
			<div className='index'>
				<Form />
				<Leads />
				<Alerts />
			</div>
		)
	}
}

export default index
