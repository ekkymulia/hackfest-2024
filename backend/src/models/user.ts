import { db } from '../utils/firebase';

export type User = {
    username: string;
    email: string;
    age: number;
};

export default class UserModel implements User {
    username: string;
    email: string;
    age: number;

    constructor(username: string, email: string, age: number) {
        this.username = username;
        this.email = email;
        this.age = age;
    }
    
    toPlainObject(): User {
        return {
          username: this.username,
          email: this.email,
          age: this.age,
        };
    }

    // // Save the user to Firestore
    async save(): Promise<{ status: boolean; message: string }> {
        try {
            const usersRef = db.users;
            await usersRef.add(this.toPlainObject());
            return { status: true, message: 'User saved successfully' };
        } catch (error) {
            console.error('Error saving user:', error);
            return { status: false, message: `Error saving user: ${error}` };
        }
    }

    // // Get all users from Firestore
    static async getAll(): Promise<User[]> {
        try {
            const usersRef = db.users;
            const snapshot = await usersRef.get();
            const users: User[] = [];
            snapshot.forEach((doc) => {
                users.push(doc.data() as User);
            });
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    }

    // // Get a user by ID from Firestore
    async getById(id: string): Promise<User | null> {
        try {
            const userRef = db.users.doc(id);
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('No such document!');
                return null;
            } else {
                return doc.data() as User;
            }
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    }

    // // Update a user by ID in Firestore
    async updateById(id: string, data: User): Promise<{ status: boolean; message: string }> {
        try {
            const userRef = db.users.doc(id);
            await userRef.update(data);
            return { status: true, message: 'User updated successfully' };
        } catch (error) {
            console.error('Error updating user:', error);
            return { status: false, message: `Error updating user: ${error}` };
        }
    }

    // // Delete a user by ID from Firestore
    async deleteById(id: string): Promise<{ status: boolean; message: string }> {
        try {
            const userRef = db.users.doc(id);
            await userRef.delete();
            return { status: true, message: 'User deleted successfully' };
        } catch (error) {
            console.error('Error deleting user:', error);
            return { status: false, message: `Error deleting user: ${error}` };
        }
    }

    
    
}
