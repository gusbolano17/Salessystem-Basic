import {AxiosHeaders} from "axios";

export const HttpHeader  = () => {
    return new AxiosHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    })
};