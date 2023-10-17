import { MeditationTechnique } from "./meditation-technique";
import { MessageForum } from "./message-forum";
import { User } from "./user";

export interface Forum {

    id?: number;
    name?: string;
    date: Date;
    meditation_technique_id: number;
    user?: User;
    message:string;
    user_id:number;
   
}


