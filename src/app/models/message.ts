import { User } from "./user";

export interface Message {
    id_message: number;
    username: string;
    sender: Partial<User>;
    receiver: Partial<User>;
    content: string;
    date: Date;
}
