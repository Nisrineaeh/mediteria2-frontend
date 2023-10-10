export interface MeditationTechnique {
    id: number;
    name: string;
    description: string;
    atmosphere: string;
    duration: number;
    keyword: string[];
    createdBy: number;
    audioMedia: number;
    visualMedia: number;
}
