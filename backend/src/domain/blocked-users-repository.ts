import {Users} from "./user";

export interface BlockedUsersRepository {
    blockUser(users: Users);
}