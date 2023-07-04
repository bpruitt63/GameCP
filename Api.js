import axios from "axios";
import SecureStore from 'expo-secure-store';

const BASE_URL = 'https://sportyapp-backend.herokuapp.com';

class API {

    // static token;

    // static setToken(newToken) {
    //     this.token = newToken;
    // };

    // static async getToken() {
    //     this.token = await SecureStore.getItemAsync("token");
    // };

    static async request(endpoint, data={}, method="get", token='none') {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${token}`};
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
        //const res = await this.request(`organizations/${id}/seasons`);
        return this.token;
        return res.seasons;
    };

    static async login(data) {
        const res = await this.request('users/login', data, 'post');
        //this.setToken(res.token);
        return res.token;
    };
};

export default API;