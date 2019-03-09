const sequence = require("./index.js");
let start = Date.now();
var p1 = new Promise((resolve, reject) => {
	setTimeout(reject, 500, "one");
});
var p2 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1000, "two");
});
var p3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1500, "three");
});
sequence([p1, p2, p3])
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
