import {User} from "./user";

export interface UsersRepository {
    addUser(user: User);
    getUsers(userId: number);
}