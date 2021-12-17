import Child from '../../../models/child'
import Card from '../../../models/cards'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import { parseToken } from '../../../utils/auth'

export async function createChild(ctx) {
	const body = ctx.request.body.child
	try {
		const userData = await parseToken(ctx)
		if(userData && userData.id) {
			body.userId = userData.id
		}

		let childData = await Child.findOne({
			name: body.name,
			age: body.age,
			userId: body.userId
		})
		if(childData) {
			ctx.body = { message: constants.MESSAGES.CHILD_ALREADY_EXIST }
			ctx.status = constants.STATUS_CODE.CONFLICT_ERROR_STATUS
			return
		}
		const child = new Child(body)
		await child.save()
		const response = child.toJSON()
		ctx.body = {
			child: response
		}
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS
	} catch (error) {
		console.log('Error while creating child', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getChildren(ctx) {
	try {
		const childrenList = await Child.find()
		ctx.body = {
			childrenList
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getChild(ctx, next) {
	try {
		const child = await Child.findById(ctx.params.id)
		if (!child) {
			ctx.status = constants.STATUS_CODE.NOT_FOUND_STATUS
			ctx.body = {
				message: constants.MESSAGES.CHILD_NOT_FOUND
			}
			return
		}
		ctx.body = {
			child
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function updateChild(ctx) {
	try {
		const child = ctx.request.body.child
		await Child.findOneAndUpdate({
			_id: mongoose.Types.ObjectId(ctx.params.id)
		}, {
			$set: {
				name: child.name,
				age: child.age
			}
		})
		ctx.body = {
			success: constants.MESSAGES.CHILD_UPDATED
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		console.log('Error', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function deleteChild(ctx) {
	try {
		await Child.findByIdAndRemove(mongoose.Types.ObjectId(ctx.params.id))
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
		ctx.body = {
			success: constants.MESSAGES.CHILD_DELETED
		}
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getChildsCard(ctx, next) {
	try {
		const child = await Child.findById(ctx.params.id)
		if (!child) {
			ctx.status = constants.STATUS_CODE.NOT_FOUND_STATUS
			ctx.body = {
				message: constants.MESSAGES.CHILD_NOT_FOUND
			}
			return
		}
		const card = await Card.find({
			addedFor: ctx.params.id
		})
		ctx.body = {
			card
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}
