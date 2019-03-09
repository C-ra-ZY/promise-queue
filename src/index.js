const { EventEmitter } = require("events");
module.exports = class PromiseQue {
	constructor(arr) {
		if (!Array.isArray(arr)) {
			throw Error("parameter shall be an array!");
		}
		this.tasks = arr;
		this.remaining = [];
		this.stat = new Map();
	}

	async done() {
		let res;
		for (let index = 0; index < this.tasks.length; index++) {
			this.stat.set(index, { status: "success" });
			try {
				res = await this.tasks[index];
				this.remaining = this.tasks.splice(index + 1);
				this.tasks = [];
				break;
			} catch (error) {
				this.stat.set(index, { status: "failed", error });
				if (index == this.tasks.length - 1) {
					throw Error("none of the promise in arguments is available.");
				}
			}
		}
		return res;
	}

	async status() {
		if (this.tasks.length !== 0) {
			throw Error("can't call this function when task haven't been proceeded totally");
		}
		if (this.remaining.length == 0) {
			return Promise.resolve(this.stat);
		}
		let emitter = new EventEmitter(),
			targetIndex = this.stat.size + this.remaining.length;

		return new Promise((resolve, reject) => {
			for (let item of this.remaining) {
				let index = this.stat.size;
				this.stat.set(index, { status: "success" });
				item
					.catch((error) => {
						this.stat.set(index, { status: "failed", error });
					})
					.finally(() => {
						if (index == targetIndex - 1) {
							emitter.emit("finished");
						}
					});
			}
			emitter.on("finished", () => {
				emitter.removeAllListeners();
				emitter = null;
				resolve(this.stat);
			});
		});
	}
};
