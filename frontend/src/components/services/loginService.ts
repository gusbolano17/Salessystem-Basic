import api from "../utils/HttpInterceptor.ts";

export const login = async (body : any) : Promise<any> => {
    const resp = await api.post(`/auth/login`, body);
    return resp.data;
}