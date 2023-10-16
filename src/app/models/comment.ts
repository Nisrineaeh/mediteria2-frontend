import { User } from "./user";

export interface Comment {
    id?: number;
    date?: string;
    comment: string;
    meditationTechniqueId: number;
    user_id: number;
    user?: User;
}
