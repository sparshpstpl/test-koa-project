import { ensureUser } from '../../../middleware/validators'
import * as child from './controller'

export const baseUrl = '/child'

export default [
	{
		method: 'POST',
		route: '/',
		handlers: [
			ensureUser,
			child.createChild
		]
	},
	{
		method: 'GET',
		route: '/',
		handlers: [
			ensureUser,
			child.getChildren
		]
	},
	{
		method: 'GET',
		route: '/:id',
		handlers: [
			ensureUser,
			child.getChild
		]
	},
	{
		method: 'PUT',
		route: '/:id',
		handlers: [
			ensureUser,
			child.updateChild
		]
	},
	{
		method: 'DELETE',
		route: '/:id',
		handlers: [
			ensureUser,
			child.deleteChild
		]
	},
	{
		method: 'GET',
		route: '/:id/card',
		handlers: [
			ensureUser,
			child.getChildsCard
		]
	}
]
