export default class CommonError extends Error {
	public status: number;

	constructor(message: string) {
		super(message);
		this.name = 'Common Error';
		this.status = 500;
	}
}
