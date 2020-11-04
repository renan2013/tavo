const store = new Vuex.Store({
	state:{
		stocks:[
			{name:"IBM", price:100, held:0},
			{name:"Amazon", price:90, held:0},
			{name:"Microsoft", price:110, held:0},
			{name:"Disney", price:120, held:0},
		],
        cash:1000, 
        urlDsoa:"http://201.194.194.84:8998/DsoaService2/dsoa/request"
		//urlDsoa:"http://192.168.0.26:8998/DsoaService2/dsoa/request"
	},
	getters:{
		holdingValue(state) {
			return state.stocks.reduce(function(current,elm) {
				return current + (elm.price * elm.held);
			},0); 
		}
	},
	mutations:{
		changeStocks(state) {
			state.stocks.forEach(stock => {
				stock.price += getRandomArbitrary(-20,20);
				if(stock.price < 0) stock.price = 0;
			});
		},
		buyStock(state, order) {
			console.log('order is '+JSON.stringify(order));
			//first, find the stock
			let stock = state.stocks.findIndex(elm => {
				return elm.name === order.stock;
			});
			if(stock >= 0) {
				let purchasePrice = (state.stocks[stock].price * order.amount).toFixed(2);
				if(state.cash >= purchasePrice) {
					state.stocks[stock].held += order.amount;
					state.cash -= purchasePrice;
				}
			}
		},
		sellStock(state, order) {
			console.log('order is '+JSON.stringify(order));
			//first, find the stock
			let stock = state.stocks.findIndex(elm => {
				return elm.name === order.stock;
			});
			if(stock >= 0) {
				if(state.stocks[stock].held >= order.amount) {
					let sellPrice = (state.stocks[stock].price * order.amount).toFixed(2);
					state.stocks[stock].held -= order.amount;
					state.cash += Number(sellPrice);
				}
			}
		}
	}
});