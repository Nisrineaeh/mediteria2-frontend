import { MeditationTechnique } from "./meditation-technique";
import { User } from "./user";

export interface Forum {

    id: number;
    name: string;
    date: Date;
    meditation_technique: MeditationTechnique;
    user: User;
    
   
}

