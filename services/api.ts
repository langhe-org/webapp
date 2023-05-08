import Router from "next/router";

export const JWT_KEY = "JWT";
const BASE_URL = "https://api.langhe.app/client/v1";

export function api<T>(url: string, method: string = "GET", data?: any): Promise<T> {
    return fetch(BASE_URL + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            "authorization": "Bearer " + localStorage.getItem(JWT_KEY),
            "content-type": "application/json",
        }
    })
        .then(res => {
            if(res.status === 401) {
                Router.push(`login`);
                throw new UnauthorizedError("Unauthorized");
            } else {
                return res
            }
        })
        .then(res => {
            if(res.status < 200 || res.status > 299) {
                throw new Error(res.statusText);
            } else {
                return res;
            }
        })
        .then(res => res.json())
        .catch(e => {
            if(!(e instanceof UnauthorizedError))
                alert("Error");
            console.error(e);
            throw e;
        })
}

class UnauthorizedError extends Error {}
