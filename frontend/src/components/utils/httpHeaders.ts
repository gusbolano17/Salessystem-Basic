import {AxiosHeaders} from "axios";

export const HttpHeader : AxiosHeaders = new AxiosHeaders({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});