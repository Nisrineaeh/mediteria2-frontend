import { MeditationTechnique } from "./meditation-technique";
import { Message } from "./message";

export interface User {
    id:number,
    username: string,
    email: string,
    password: string,
    description: string,
    sentMessages: Message[];
    receivedMessage: Message[];
    favorites: MeditationTechnique[];
}
