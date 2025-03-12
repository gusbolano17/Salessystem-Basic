import axios ,{AxiosHeaders} from "axios";
import {jwtDecode, JwtPayload} from "jwt-decode";

export const URL: string = "http://localhost:3000/api";

const api = axios.create({
    baseURL: URL,
});

api.interceptors.request.use((cfg) => {
    const token = sessionStorage.getItem("token");

    if(token){
        const decoded : JwtPayload = jwtDecode(token);
        if(decoded?.exp * 1000 < Date.now()){
            window.location.href = "/login";
            return Promise.reject(new Error("Token expirado"));
        }
    }

    cfg.headers = new AxiosHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    });

    return cfg;

});

api.interceptors.response.use(
    (resp) => resp,
    (err) => {
        if(err){
            if(err.response.status === 401){
                sessionStorage.removeItem("token");
                window.location.href = "/login";
            }
            return Promise.reject(err);
        }
    }
);

export default api;