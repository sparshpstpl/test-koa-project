module.exports = {
	STATUS_CODE: {
		SUCCESS_STATUS: 200,
		NO_CONTENT_STATUS: 204,
		ACCEPTED_STATUS: 202,
		UNPROCESSABLE_ENTITY_STATUS: 422,
		INTERNAL_SERVER_ERROR_STATUS: 500,
		BAD_REQUEST_ERROR_STATUS: 400,
		UNAUTHORIZED_ERROR_STATUS: 401,
		FORBIDDEN_ERROR_STATUS: 403,
		CONFLICT_ERROR_STATUS: 409,
		MOVED_PERMANENTLY: 301,
		NOT_FOUND_STATUS: 404,
		CREATED_SUCCESSFULLY_STATUS: 201
	},
	MESSAGES: {
		USER_NOT_FOUND: 'User not found',
		USER_UPDATED: 'User updated successfully',
		USER_DELETED: 'User deleted successfully',
		USER_ALREADY_EXIST: 'User already exists',
		CARD_NOT_FOUND: 'Card not found',
		CARD_UPDATED: 'Card updated successfully',
		CARD_DELETED: 'Card deleted successfully',
		CHILD_NOT_FOUND: 'Child not found',
		CHILD_UPDATED: 'Child updated successfully',
		CHILD_DELETED: 'Child deleted successfully',
		CHILD_ALREADY_EXIST: 'Child already added',
		TRANSACTION_NOT_ALLOWED: 'Amount exceeded the monthly transaction limit',
		CHARGE_CREATED: 'Charge created successfully'
	}
}
