import { hrmsAccessToken } from "./token.helper"

export const defaultFetcher = async (url : string) : Promise<any> => {
    const res = await fetch(url , {
        headers : {
            Authorization : `Bearer ${hrmsAccessToken()}`
        }
    })
    return res.json();
}