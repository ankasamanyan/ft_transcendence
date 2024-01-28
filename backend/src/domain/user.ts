export class Users {
  users: User[];
  constructor(users: User[]) {
    this.users = users;
  }
}

export class User {
  public userId: string;
  public name: string;
  public pictureUrl: string;

  constructor(userId: string, name: string, pictureUrl: string) {
    this.userId = userId;
    this.name = name;
    this.pictureUrl = pictureUrl;
  }
}