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
  constructor(
      public id: number | undefined,
      public name: string,
      public intraLogin: string,
      public picture: string,
      public email: string | undefined,
      public isAuthenticated: boolean | undefined
  )
  {}

  static toDomain(request: UserRequest): User {
    return new User(
        request.id,
        request.name,
        request.intraLogin,
        request.picture,
        request.email,
        request.isAuthenticated
    );
  }

  static fromDomain(user: User): UserRequest {
    return new UserRequest(
      user.id,
      user.name,
      user.intraLogin,
      user.picture,
      user.email,
      user.isAuthenticated
    );
  }
}