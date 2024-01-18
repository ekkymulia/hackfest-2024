import { User } from "@models/user";
import { db, queryCollection } from "../utils/firebase";

export type SubmissionModel = {
    title: string;
    deskripsi: string;
    file: string; 
    url: string; 
    review: {
      reviewerId: string;
      message: string;
    }[];
    is_accepted: boolean;
};
  
export type Project = {
    id?: string | null; 
    status: number; 
    asignee_needed: number;
    wanted_deadline: string;
    target_deadline: string;
    owner_id: string; 
    title: string;
    description: string;
    asignee: User[]; 
    submission: SubmissionModel[]; 
};

export type Filter = {
    status?: string;
    owner_id?: string;
    asignee_needed?: number;
    asignee?: User[];
    
};

const defaultProject: Project = {
    status: 1,
    title: '',
    description: '',
    wanted_deadline: '',
    target_deadline: '',
    owner_id: '',
    asignee_needed: 0,
    asignee: [],
    submission: [],
};

export default class ProjectModel implements Project {
    status: number;
    owner_id: string;
    title: string;
    wanted_deadline: string;
    target_deadline: string
    description: string;
    asignee_needed: number;
    asignee: User[];
    submission: SubmissionModel[];
  
    constructor(data: Partial<Project> = {}) {
      const {
        status = defaultProject.status,
        owner_id = defaultProject.owner_id,
        title = defaultProject.title,
        wanted_deadline = defaultProject.wanted_deadline,
        target_deadline = defaultProject.target_deadline,
        description = defaultProject.description,
        asignee_needed = defaultProject.asignee_needed,
        asignee = defaultProject.asignee,
        submission = defaultProject.submission,
      } = data;
  
      this.status = status || 1;
      this.owner_id = owner_id;
      this.title = title;
      this.wanted_deadline = wanted_deadline;
      this.target_deadline = target_deadline;
      this.description = description;
      this.asignee_needed = asignee_needed;
      this.asignee = asignee;
      this.submission = submission;
    }

    toPlainObject(): Project {
        return {
            status: this.status,
            owner_id: this.owner_id,
            title: this.title,
            wanted_deadline: this.wanted_deadline,
            target_deadline: this.target_deadline,
            description: this.description,
            asignee_needed: this.asignee_needed,
            asignee: this.asignee,
            submission: this.submission,
        };
    }

    // // Save the project to Firestore

    async save(): Promise<{ status: boolean; message: string; projectId?: string }> {
        try {
            const projectsRef = db.projects;
            const projectData = this.toPlainObject();
            
            const project = await projectsRef.add(projectData);
            
            if (project.id) {
                return { status: true, message: 'Project saved successfully', projectId: project.id };
            } else {
                throw new Error('Failed to retrieve project ID after saving');
            }
        } catch (error) {
            console.error('Error saving project:', error);
            return { status: false, message: `Error saving project: ${error}` };
        }
    }
    

    // // Get all projects from Firestore
    static async getAll(options?: Filter): Promise<Project[]> {
        try {
            const projectsRef = queryCollection('projects');
            let query = projectsRef;

            if (options?.status !== undefined) {
                query = query.where('status', '==', parseInt(options.status));
            }
    
            if (options?.owner_id !== undefined) {
                query = query.where('owner_id', '==', options?.owner_id);
            }
    
            if (options?.asignee_needed !== undefined) {
                query = query.where('asignee_needed', '==', options?.asignee_needed);
            }
    
            if (options?.asignee && options?.asignee.length > 0) {
                query = query.where('asignee', 'array-contains-any', options?.asignee);
            }
    
            const snapshot = await query.get();
            const projects: Project[] = [];
    
            snapshot.forEach((doc) => {
                const projectData = doc.data() as Project;
                const projectWithId: Project = { ...projectData, id: doc.id };
                projects.push(projectWithId);
            });
    
            return projects;
        } catch (error) {
            console.error('Error getting projects:', error);
            return [];
        }
    }
    

    static async getById(id: string): Promise<ProjectModel | null> {
        try {
            const projectsRef = db.projects; 
            const projectDoc = await projectsRef.doc(id).get();

            if (projectDoc.exists) {
                const projectData = projectDoc.data() as ProjectModel;
                return projectData;
            } else {
                console.error('Project not found with ID:', id);
                return null;
            }
        } catch (error) {
            console.error('Error getting project by ID:', error);
            return null;
        }
    }

    static async updateById(id: string, project: { 
        status: string,
        asignee_needed: string,
        wanted_deadline: string,
        target_deadline: string,
        title: string,
        description: string
    }): Promise<{ status: boolean; message: string; project?: ProjectModel | null}> {
        try {
            const projectsRef = db.projects; 
            const projectDoc = await projectsRef.doc(id).get();
    
            if (!projectDoc.exists) {
                console.error('Project not found with ID:', id);
                return { status: false, message: 'Project not found', project: null };
            }
    
            const filteredProject = Object.fromEntries(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Object.entries(project).filter(([_, value]) => value !== undefined)
            );
    
            const updatedData = { ...projectDoc.data(), ...filteredProject };
    
    
            await projectsRef.doc(id).update(updatedData);
    
            const updatedProjectDoc = await projectsRef.doc(id).get();
            const updatedProjectData = updatedProjectDoc.data() as ProjectModel;
    
            return { status: true, message: 'Project updated successfully', project: updatedProjectData };
        } catch (error) {
            
            console.error('Error updating project:', error);
            return { status: false, message: `Error updating project: ${error}`, project: null };
        }
    }


    static async deleteById(id: string): Promise<{ status: boolean; message: string; projectId?: string }> {
        try {
            const projectRef = db.projects.doc(id);
    
            // const deletedProject = await projectRef.delete();

            //soft delete
            const project = await projectRef.get();
            const updatedData = { ...project.data(), status: 0 };
            const deletedProject = await projectRef.update(updatedData);
    
            if (deletedProject) {
                return { status: true, message: 'Project deleted successfully', projectId: id };
            } else {
                throw new Error('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            return { status: false, message: `Error deleting project: ${error}` };
        }
    }
    
}
  
