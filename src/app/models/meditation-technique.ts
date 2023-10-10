import { Média } from "./média";

export interface MeditationTechnique {
    id: number;
    name: string;
    description: string;
    atmosphere: string;
    duration: number;
    keyword: string | string[];
    createdBy: number;
    audioMedia: Média;
    visualMedia: Média;
}
