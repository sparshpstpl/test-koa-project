import User from '../../../models/users'
import constants from './../../../utils/constants'
import mongoose from 'mongoose'

export async function createUser(ctx) {
	const user = new User(ctx.request.body.user)
	try {
		let userData = await User.findOne({
			email: ctx.request.body.email
		})
		if(userData) {
			ctx.body = { message: constants.MESSAGES.USER_ALREADY_EXIST }
			ctx.status = constants.STATUS_CODE.CONFLICT_ERROR_STATUS
			return
		}
		await user.save()
		const token = user.generateToken()
		const response = user.toJSON()
		delete response.password
		ctx.body = {
			user: response
		}
		ctx.append('Authorization', token)
		ctx.status = constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS
	} catch (error) {
		console.log('Error while creating user', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getUsers(ctx) {
	try {
		const users = await User.find({}, '-password -__v')
		ctx.body = {
			users
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function getUser(ctx, next) {
	try {
		const user = await User.findById(ctx.params.id, '-password -__v')
		if (!user) {
			ctx.status = constants.STATUS_CODE.NOT_FOUND_STATUS
			ctx.body = {
				message: constants.MESSAGES.USER_NOT_FOUND
			}
			return
		}
		ctx.body = {
			user
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function updateUser(ctx) {
	try {
		const user = ctx.request.body.user
		await User.findOneAndUpdate({
			_id: mongoose.Types.ObjectId(ctx.params.id)
		}, {
			$set: {
				name: user.name
			}
		})
		ctx.body = {
			success: constants.MESSAGES.USER_UPDATED
		}
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
	} catch (error) {
		console.log('Error', error)
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function deleteUser(ctx) {
	try {
		await User.findByIdAndRemove(mongoose.Types.ObjectId(ctx.params.id))
		ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
		ctx.body = {
			success: constants.MESSAGES.USER_DELETED
		}
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}

export async function changePassword(ctx) {
	try {
		let oldPassword = ctx.request.body.oldPassword
		let newPassword = ctx.request.body.newPassword

		if(!newPassword || !oldPassword) {
			ctx.status = constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS
			return
		}

		let user = await User.findOne({
			_id: mongoose.Types.ObjectId(ctx.state.user.id)
		})

		let isMatch = await user.validatePassword(oldPassword)

		if(isMatch) {
			user.password = newPassword
			user.save()
			ctx.status = constants.STATUS_CODE.SUCCESS_STATUS
			ctx.body = {
				success: true
			}
			return
		} else {
			ctx.body = {
				success: false
			}
			ctx.status = constants.STATUS_CODE.UNAUTHORIZED_ERROR_STATUS
			return
		}
	} catch (error) {
		ctx.body = error
		ctx.status = constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS
	}
}
