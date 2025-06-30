
import jsonServerInstance from "../api/jsonServerInstance.ts";
import type { User } from "../interfaces/UserInterface.ts";

const USERS_URL = 'users'

export const getUsersService = async () => {
    try {
        const res = await jsonServerInstance.get(USERS_URL);
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
}

export const createUserService = async (user: User) => {
    try {
        const res = await jsonServerInstance.post(USERS_URL, user);
        return res.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUserService = async (user: User) => {
    try {
        const res = await jsonServerInstance.put(`${USERS_URL}/${user.id}`, user);
        return res.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const deleteUserService = async (id: string) => {
    try {
        const res = await jsonServerInstance.delete(`${USERS_URL}/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
