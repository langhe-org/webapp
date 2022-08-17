import Router from "next/router";

export const JWT_KEY = "JWT";
const BASE_URL = "https://proto2-357815.uc.r.appspot.com/v1";

export function api<T>(url: string, method: string = "GET", data?: any): Promise<T> {
    return fetch(BASE_URL + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            authorization: "Bearer " + localStorage.getItem(JWT_KEY),
        }
    })
        .then(res => {
            if(res.status === 401) {
                Router.push(`login`);
                throw new Error("Unauthorized");
            } else {
                return res
            }
        })
        .then(res => res.json())
        .catch(e => {
            console.error(e);
        })
}
