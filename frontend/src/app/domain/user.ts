export class Users {
  users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}

export class User {
  public id: number | undefined;
  public name: string;
  public pictureUrl: string;

  constructor(id: number | undefined, name: string, pictureUrl: string) {
    this.id = id;
    this.name = name;
    this.pictureUrl = pictureUrl;
  }
}