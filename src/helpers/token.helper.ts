import Cookies from "js-cookie";

export const hrmsAccessToken = () : string | undefined => {
    return Cookies.get('HRMS_ACCESS_TOKEN')
}

export function idpAccessToken() {
    const IDP_ACCESS_TOKEN = Cookies.get("IDP_ACCESS_TOKEN");
    return IDP_ACCESS_TOKEN;
  }