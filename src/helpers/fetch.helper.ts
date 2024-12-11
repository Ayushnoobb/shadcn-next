import { hrmsAccessToken, idpAccessToken } from "./token.helper"

export const defaultFetcher = async (url : string) : Promise<any> => {
    const res = await fetch(url , {
        headers : {
            Authorization : `Bearer ${hrmsAccessToken()}`
        }
    })
    return res.json();
}

export async function idpFetcher(url: string) {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${idpAccessToken()}`,
        Accept: "application/json",
      },
    });
    return response.json();
  }