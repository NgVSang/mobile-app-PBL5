import instance from "../../https/apiConfig";

const ENDPOINTS = {
    REQUESTTYPE: "/user/getRequestType",
    CREATEREQUEST: "/user/request",
    GETREQUESTLIST: "/user/list-request",
};

const get_request_type = () => {
    return instance.get(ENDPOINTS.REQUESTTYPE)
}

const create_request = (data) => {
    return instance.post(ENDPOINTS.CREATEREQUEST,{
        ...data
    })
}

const get_request_list = () => {
    return instance.get(ENDPOINTS.GETREQUESTLIST)
}

const requestService = {
    get_request_type,
    create_request,
    get_request_list
}

export default requestService