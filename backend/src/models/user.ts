import { db } from '../utils/firebase';

export type User = {
    id?: string;
    name: string;
    email: string;
    is_verified: boolean;
    is_active: boolean;
    subscription_status?: 1 | 2 | 3 | undefined;
    phone?: string;
    role?: 1 | 2 | 3 | undefined;
};

export default class UserModel implements User {
    name: string;
    email: string;
    is_verified: boolean;
    is_active: boolean;
    subscription_status?: 1 | 2 | 3 | undefined;
    phone?: string;
    role?: 1 | 2 | 3 | undefined;

    constructor(name: string, email: string, is_verified: boolean, is_active: boolean, subscription_status?: 1 | 2 | 3 | undefined, phone?: string, role?: 1 | 2 | 3 | undefined) {
        this.name = name;
        this.email = email;
        this.is_verified = is_verified;
        this.is_active = is_active;
        this.subscription_status = subscription_status;
        this.phone = phone;
        this.role = role;
    }

    toPlainObject(): User {
        return {
            name: this.name,
            email: this.email,
            is_verified: this.is_verified,
            is_active: this.is_active,
            subscription_status: this.subscription_status,
            phone: this.phone,
            role: this.role
        };
    }

    // Save the user to Firestore
    async save(): Promise<{ status: boolean; message: string }> {
        try {
            const usersRef = db.users; // Corrected reference to the 'users' collection
            await usersRef.add(this.toPlainObject());
            return { status: true, message: 'User saved successfully' };
        } catch (error) {
            console.error('Error saving user:', error);
            return { status: false, message: `Error saving user: ${error}` };
        }
    }

    static async insert (user: User): Promise<{ status: boolean; message: string }> {
        try {
            const usersRef = db.users; // Corrected reference to the 'users' collection
            await usersRef.add(user);
            return { status: true, message: 'User saved successfully' };
        } catch (error) {
            console.error('Error saving user:', error);
            return { status: false, message: `Error saving user: ${error}` };
        }
    }

    // Get all users from Firestore
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

    // Get a user by ID from Firestore
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

    // Update a user by ID in Firestore
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

    // Delete a user by ID from Firestore
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

    // Get a user by email from Firestore
    static async getByEmail(email: string): Promise<User | null> {
        try {
            const userRef = db.users.where('email', '==', email).limit(1);
            const snapshot = await userRef.get();
            if (snapshot.empty) {
                console.log('No such document!');
                return null;
            } else {
                const userData = snapshot.docs[0].data() as User;
                return { ...userData, id: snapshot.docs[0].id };
            }
        } catch (error) {
            console.error('Error getting user:', error);
            return null;
        }
    }
}
