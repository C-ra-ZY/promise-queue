declare class PromiseQue {
	constructor(arr: Array<Promise>);
	async done(): Promise;
	async status(): Promise<Map>;
}
