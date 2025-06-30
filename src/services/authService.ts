import jsonServerInstance from "../api/jsonServerInstance";

const USERS_URL = "users";

export const loginService = async (username: string, role: string) => {
    try {
        const res = await  jsonServerInstance.get(`${USERS_URL}?username=${username}&&role=${role}`);
        if(res.data.length === 0)
            return {};
        return res.data[0];
    } catch (error) {
        console.error("Error login user:", error);
        throw error;
    }
};