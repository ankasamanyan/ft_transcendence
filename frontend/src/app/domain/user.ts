export class Users {
  users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}

export class User {
  public id: number | undefined;
  public name: string;
  public intraLogin: string;
  public picture: string;
  public email: string | undefined;
  public isAuthenticated: boolean | undefined;
  public tfa_enabled: boolean | undefined;

  constructor(
    id: number | undefined,
    name: string,
    intraLogin: string,
    picture: string,
    email: string | undefined,
    isAuthenticated: boolean | undefined,
    tfa_enabled: boolean | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.intraLogin = intraLogin;
    this.picture = picture;
    this.email = email;
    this.isAuthenticated = isAuthenticated;
    this.tfa_enabled = tfa_enabled;
  }
}