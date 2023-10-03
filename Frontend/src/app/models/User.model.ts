export class User {
  constructor(private _accessToken: string, private _expireTime: Date) {}

  get expireTime() {
    return this._expireTime;
  }

  get accessToken() {
    return this._accessToken;
  }
}
