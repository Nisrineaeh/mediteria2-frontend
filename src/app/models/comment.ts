import { MeditationTechnique } from "./meditation-technique";
import { User } from "./user";

export interface Comment {
    id?: number;
    date?: string;
    comment: string;
    meditationTechniqueId: number;
    userId: number;
}
