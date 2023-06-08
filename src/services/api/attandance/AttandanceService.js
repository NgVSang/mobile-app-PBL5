import instance from "../../https/apiConfig";

const ENDPOINTS = {
    ATTANDANCE: "/user/getAttendance",
};

const get_Attandance = (date) => {
    return instance.get(ENDPOINTS.ATTANDANCE,{
        params:{
            date: date
        }
    })
}

const attandanceService = {
    get_Attandance
}

export default attandanceService