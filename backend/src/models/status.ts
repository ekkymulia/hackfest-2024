import { db } from "../utils/firebase";

export type ProjectStatus = {
    name: string;
    id?: string;
};
  
const defaultStatus: ProjectStatus = {
    name: '',
};
  
export default class ProjectStatusModel implements ProjectStatus {
    name: string;
  
    constructor(data: Partial<ProjectStatus> = {}) {
      // Use the provided data or default to an empty string
      this.name = data.name || defaultStatus.name;
    }

    toPlainObject(): ProjectStatus {
        return {
            name: this.name,
        };
    }

    static async getAllStatus(): Promise<ProjectStatus[]> {
        try {
            const statusRef = db.project_status;
            const statusSnapshot = await statusRef.get();
            const statusList: ProjectStatus[] = []

            statusSnapshot.forEach((doc) => {
                const projectData = doc.data() as ProjectStatus;
                const projectWithId: ProjectStatus = { ...projectData, id: doc.id };
                statusList.push(projectWithId);
            });
    
            return statusList;
        } catch (error) {
            console.error('Error fetching status:', error);
            return [];
        }
    }
}
  