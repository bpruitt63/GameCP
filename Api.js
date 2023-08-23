import axios from "axios";

const BASE_URL = 'https://sportyapp-backend.herokuapp.com';

class API {

    static token;

    static async request(endpoint, data={}, method="get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${API.token}`};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message;
            !err.response ? message = "Server error, please try again later"
                : message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        };
    };

    static async login(data) {
        const res = await this.request('users/login', data, 'post');
        return res.token;
    };

    static async getSeasons(orgId) {
        const res = await this.request(`organizations/${orgId}/seasons`);
        return res.seasons;
    };

    static async getGames(orgId, seasonId) {
        const res = await this.request(`organizations/${orgId}/seasons/${seasonId}/games`);
        return res.games;
    };
};

export default API;