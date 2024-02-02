import {User, Users} from "../../domain/user";

export class UsersResponse {
  constructor(public users: UserResponse[]) {}

  static toDomain(response: UsersResponse): Users {
    return new Users(response.users.map(user => UserResponse.toDomain(user)));
  }
}

export class UserResponse {
  constructor(public id: number, public name: string, public pictureUrl: string) {}

  static toDomain(response: UserResponse): User {
    return new User(
      response.id,
      response.name,
      response.pictureUrl,
    );
  }
}

export class UsersRequest {
  constructor(public users: UserRequest[]) {}

  static fromDomain(users: Users): UsersRequest {
    return new UsersRequest(users.users.map(user => UserRequest.fromDomain(user)));
  }
}

export class UserRequest {
  constructor(public id: number, public name: string, public pictureUrl: string) {}

  static fromDomain(response: User): UserRequest {
    return new UserRequest(
        response.id,
        response.name,
        response.pictureUrl,
    );
  }
}