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

  constructor(id: number | undefined, name: string, intraLogin: string, picture: string) {
    this.id = id;
    this.name = name;
    this.intraLogin = intraLogin;
    this.picture = picture;
  }
}