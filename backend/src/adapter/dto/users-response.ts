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
  constructor(
      public id: number | undefined,
      public name: string,
      public intraLogin: string,
      public picture: string)
  {}

  static toDomain(response: UserResponse): User {
    return new User(
      response.id,
      response.name,
      response.intraLogin,
      response.picture,
    );
  }

  static fromDomain(user: User): UserResponse {
    return new UserResponse(
      user.id,
      user.name,
      user.intraLogin,
      user.picture,
    );
  }
}