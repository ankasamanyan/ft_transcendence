import {User, Users} from "../../domain/user";

export class UsersRequest {
  constructor(public users: UserRequest[]) {}

  static toDomain(request: UsersRequest): Users {
    return new Users(request.users.map(request => UserRequest.toDomain(request)));
  }

  static fromDomain(users: Users): UsersRequest {
    return new UsersRequest(users.users.map(user => UserRequest.fromDomain(user)))
  }
}

export class UserRequest {
  constructor(public userId: string, public name: string, public pictureUrl: string) {}

  static toDomain(request: UserRequest): User {
    return new User(
        request.userId,
        request.name,
        request.pictureUrl,
    );
  }

  static fromDomain(user: User): UserRequest {
    return new UserRequest(
      user.userId,
      user.name,
      user.pictureUrl,
    );
  }
}