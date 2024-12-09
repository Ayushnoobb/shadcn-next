import Cookies from "js-cookie";

export const hrmsAccessToken = () : string | undefined => {
    return Cookies.get('HRMS_ACCESS_TOKEN')
}

