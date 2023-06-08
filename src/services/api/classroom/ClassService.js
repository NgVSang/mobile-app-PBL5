import instance from "../../https/apiConfig";

const ENDPOINTS = {
    CLASSROOMS: "/classrooms",
};

const get_classrooms = () => {
    return instance.get(ENDPOINTS.CLASSROOMS)
}

const classroomService = {
    get_classrooms
}

export default classroomService