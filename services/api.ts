const BASE_URL = "https://proto2-357815.uc.r.appspot.com";

export function api<T>(url: string, method: string = "GET", data?: any): Promise<T> {
    return fetch(BASE_URL + url, {
        method,
        body: JSON.stringify(data),
        headers: {
            authorization: "Bearer " + localStorage.getItem("JWT"),
        }
    })
        .then(res => {
            if(res.status === 401) {
                alert("Unotherized!")
                throw new Error("Unotherized");
            } else {
                return res
            }
        })
        .then(res => res.json())
}
