import {User, Users} from "../../domain/user";

export class UsersResponse {
  constructor(public users: UserResponse[]) {}

  static toDomain(response: UsersResponse): Users {
    return new Users(response.users.map(user => UserResponse.toDomain(user)));
  }
}

export class UserResponse {
  constructor(public userId: string, public name: string, public pictureUrl: string) {}

  static toDomain(response: UserResponse): User {
    return new User(
      response.userId,
      response.name,
      response.pictureUrl,
    );
  }
}