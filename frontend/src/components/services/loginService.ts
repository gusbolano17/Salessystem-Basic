import axios from "axios";

const URL : string = "http://localhost:3000/api";

export const login = async (body : any) : Promise<any> => {
    const resp = await axios.post(`${URL}/auth/login`, body);
    return resp.data;
}