import axios from "axios";

const BASE_URL = 'http://localhost:3001';

class API {

    static token;

    static setToken(newToken) {
        this.token = newToken;
    };

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

    static async test(id=1) {
        const res = await this.request(`organizations/${id}/seasons`);
        return res.seasons;
    };

    static async login(data) {
        const res = await this.request('users/login', data, 'post');
        return res.token;
    };
};

export default API;