const arraylize = require("@speed/arraylize");

async function sequence(arr) {
	let res,
		errStack = [];
	try {
		res = await Array.prototype.reduce.apply(arr, [
			async (pre, cur) => {
				let res;
				try {
					res = await pre;
				} catch (err) {
					console.warn(err.message || err);
					errStack.push(err);
					res = cur;
				}
				return res;
			}
		]);
	} catch (err) {
		console.warn(err.message || err);
		errStack.push(err);
		console.warn("none of the promise in arguments is available.");
		throw errStack;
	}
	return { res, errStack };
}

function wrapper(arr) {
	arr = arraylize(arr);
	if (
		arr.some((item) => {
			return !(item instanceof Promise);
		})
	) {
		throw error("all the items shall be instance of Promise");
	}
	return sequence(arr);
}

module.exports = wrapper;
