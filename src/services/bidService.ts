import jsonServerInstance from "../api/jsonServerInstance";

const BIDS_URL = "bids";

export const getBidsByUserService = async (userId: string) => {
    try {
        const res = await  jsonServerInstance.get(`${BIDS_URL}?userId=${userId}`);
        if(res.data.length === 0)
            return {};
        return res.data;
    } catch (error) {
        console.error("Error getting bids for the current user:", error);
        throw error;
    }
};