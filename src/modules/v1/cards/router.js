import { ensureUser } from '../../../middleware/validators'
import * as card from './controller'

export const baseUrl = '/cards'

export default [
	{
		method: 'POST',
		route: '/',
		handlers: [
			ensureUser,
			card.createCard
		]
	},
	{
		method: 'GET',
		route: '/',
		handlers: [
			ensureUser,
			card.getCards
		]
	},
	{
		method: 'GET',
		route: '/:id',
		handlers: [
			ensureUser,
			card.getCard
		]
	},
	{
		method: 'PUT',
		route: '/:id',
		handlers: [
			ensureUser,
			card.updateCard
		]
	},
	{
		method: 'DELETE',
		route: '/:id',
		handlers: [
			ensureUser,
			card.deleteCard
		]
	},
	{
		method: 'POST',
		route: '/:id/charges',
		handlers: [
			ensureUser,
			card.chargeCard
		]
	}
]
