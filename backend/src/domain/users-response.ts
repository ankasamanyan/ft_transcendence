import {User, Users} from "../../domain/user";

export class UsersResponse {
  constructor(public users: UserResponse[]) {}

  static toDomain(response: UsersResponse): Users {
    return new Users(response.users.map(user => UserResponse.toDomain(user)));
  }

  static fromDomain(users: Users): UsersResponse {
    return new UsersResponse(users.users.map(user => UserResponse.fromDomain(user)))
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

  static fromDomain(user: User): UserResponse {
    return new UserResponse(
      user.userId,
      user.name,
      user.pictureUrl,
    );
  }
}