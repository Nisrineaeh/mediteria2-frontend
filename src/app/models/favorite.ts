import { MeditationTechnique } from "./meditation-technique";
import { User } from "./user";

export interface Favorite {
    id: number;
    user: User;
    meditation_technique: MeditationTechnique;
}
