import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user";
import {DialogResponse, DialogsResponse} from "../dto/dialogs-response";

interface RawSql {
    other_user_id: number;
    name: string;
    picture: string;
    intra_login: string;
    text: string;
    date: Date;
}

@Injectable()
export class PrismaDialogsRepository {
    constructor(private prisma: PrismaService) {
    }

    async getDialogs(userId: number) {
        const userIdAsInteger = Number(userId);
        const dialogs = await this.prisma.$queryRaw<RawSql[]>`
            with subres as (select max(id) as id
                            from "Message"
                            WHERE sender_id = ${userIdAsInteger}
                               OR receiver_id = ${userIdAsInteger}
                            GROUP BY ((receiver_id::bit(32) # (sender_id::bit(32)))))
            select m.id                            as message_id,
                   m.sender_id                     as sender_id,
                   m.receiver_id                   as receiver_id,
                   m.text                          as text,
                   m.date                          as date,
                   (CASE u_sender.id
                        WHEN ${userIdAsInteger} THEN u_receiver.picture
                        ELSE u_sender.picture END)      as picture,
                   (CASE u_sender.id
                        WHEN ${userIdAsInteger} THEN u_receiver.name
                        ELSE u_sender.name END)         as name,
                    (CASE u_sender.id
                    WHEN ${userIdAsInteger} THEN u_receiver.intra_login
                        ELSE u_sender.intra_login END)  as intra_login,
                   (CASE u_sender.id
                        WHEN ${userIdAsInteger} THEN u_receiver.id
                    ELSE u_sender.id END)               as other_user_id
            from "Message" m
                     LEFT JOIN "User" u_sender on u_sender.id = m.sender_id
                     LEFT JOIN "User" u_receiver on u_receiver.id = m.receiver_id
            where m.id in (SELECT id from subres)
            order by m.date desc
        `;

        return new DialogsResponse(dialogs.map((dialog) => {
            const otherUser = new User(
                dialog.other_user_id,
                dialog.name,
                dialog.intra_login,
                dialog.picture
            );
            return new DialogResponse(
                otherUser,
                dialog.text,
                dialog.date);
        }));
    }
}