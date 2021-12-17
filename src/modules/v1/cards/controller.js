import Card from '../../../models/cards'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import { parseToken } from '../../../utils/auth'
import { charge } from '../../../utils/common-functions'

export async function createCard(ctx) {
	const body = ctx.request.body.card
	try {
		const userData = await parseToken(ctx)
		if(userData && userData.id) {
			body.addedBy = userData.id
		}
		body.cardNumber = Math.floor(10**13 + Math.random()* 9*10**13)
		const card = new Card(body)
		await card.save()
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS
		const response = card.toJSON()
		ctx.body = {
			card: response
		}
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS
	} catch (error) {
		console.log('Error while creating card', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getCards(ctx) {
	try {
		const cards = await Card.find()
		ctx.body = {
			cards
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getCard(ctx, next) {
	try {
		const card = await Card.findById(ctx.params.id)
		if (!card) {
			ctx.status = constants.STATUS_CODE.NOT_FOUND_STATUS
			ctx.body = {
				message: constants.MESSAGES.CARD_NOT_FOUND
			}
			return
		}
		ctx.body = {
			card
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function updateCard(ctx) {
	try {
		const card = ctx.request.body.card
		await Card.findOneAndUpdate({
			_id: mongoose.Types.ObjectId(ctx.params.id)
		}, {
			$set: {
				monthlyLimit: card.monthlyLimit
			}
		})
		ctx.body = {
			success: constants.MESSAGES.CARD_UPDATED
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		console.log('Error', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function deleteCard(ctx) {
	try {
		await Card.findByIdAndRemove(mongoose.Types.ObjectId(ctx.params.id))
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
		ctx.body = {
			success: constants.MESSAGES.CARD_DELETED
		}
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function chargeCard(ctx) {
	try {
		const amount = ctx.request.body.amount
		const card = await Card.findById(mongoose.Types.ObjectId(ctx.params.id))
		if (!card) {
			ctx.status = constants.STATUS_CODE.NOT_FOUND_STATUS
			ctx.body = {
				message: constants.MESSAGES.CARD_NOT_FOUND
			}
			return
		}
		// Mock charge function call
		charge(card._id, amount, ctx.request.body.description)

		const sub = parseFloat(card.monthlyLimit) - parseFloat(amount)
		if(sub <= 0) {
			ctx.status = constants.STATUS_CODE.UNPROCESSABLE_ENTITY_STATUS
			ctx.body = {
				message: constants.MESSAGES.TRANSACTION_NOT_ALLOWED
			}
			return
		}
		const newMonthlyLimit = sub

		await Card.findOneAndUpdate({
			_id: mongoose.Types.ObjectId(ctx.params.id)
		}, {
			$set: {
				monthlyLimit: newMonthlyLimit
			}
		})
		ctx.body = {
			success: constants.MESSAGES.CHARGE_CREATED
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}
