export class User {
  private _id: number;
  private _name: String;
  private _email: String;
  private _hashedPassword: String;
  private _role: String;

  constructor(id: number, name: String, email: String, hashedPassword: String, role: String) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._hashedPassword = hashedPassword;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get hashedPassword(): String {
    return this._hashedPassword;
  }

  set hashedPassword(value: String) {
    this._hashedPassword = value;
  }

  get role(): String {
    return this._role;
  }

  set role(value: String) {
    this._role = value;
  }
}
