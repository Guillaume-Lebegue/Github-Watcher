export default class AppError extends Error {
  public status: number;

  constructor(msg: string, status: number) {
    super(msg);

    Object.setPrototypeOf(this, AppError.prototype);

    this.status = status;
  }
}