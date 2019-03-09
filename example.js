const PromiseQue = require("./src");
// let p1 = new Promise((resolve, reject) => {
// 	setTimeout(reject, 500, "one");
// });
// let p2 = new Promise((resolve, reject) => {
// 	setTimeout(reject, 1000, "two");
// });
// let p3 = new Promise((resolve, reject) => {
// 	setTimeout(reject, 1500, "three");
// });
// let queue = new PromiseQue([p1, p2, p3]);
// queue
// 	.done()
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

p1 = new Promise((resolve, reject) => {
	setTimeout(reject, 500, "one");
});
p2 = new Promise((resolve, reject) => {
	setTimeout(reject, 1000, "two");
});
p3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1500, "three");
});
queue = new PromiseQue([p1, p2, p3]);
queue
	.done()
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		queue.status().then((res) => {
			console.log(res);
		});
	});
