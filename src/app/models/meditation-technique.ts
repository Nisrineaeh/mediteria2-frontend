import { Comment } from "./comment";
import { Média } from "./média";
import { User } from "./user";

export interface MeditationTechnique {
    id: number;
    name: string;
    description: string;
    atmosphere: string;
    duration: number;
    keyword: string | string[];
    createdBy: User;
    audioMedia: Média;
    visualMedia: Média;
    isFavorite?: boolean;
    comments?: Comment[];
}
