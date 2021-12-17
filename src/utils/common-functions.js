export async function charge(cardId, amount, description) {
	console.log(`Charge amount: ${amount} from: ${cardId} for: ${description}`)
	return amount
}
