import { User } from "./user";

export interface MessageForum {
    id: number;
    content: string;
    date: Date;
    user: User;
}
