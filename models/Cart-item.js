class CartItem {
	constructor(qty, productPrice, productTitle, pushToken, sum) {
		this.qty = qty;
		this.productPrice = productPrice;
		this.productTitle = productTitle;
		this.pushToken = pushToken;
		this.sum = sum;
	}
}

export default CartItem;
