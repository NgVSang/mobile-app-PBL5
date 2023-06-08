import instance from "../../https/apiConfig";

const ENDPOINTS = {
    GETSALARY: "/user/salary",
};

const get_salary = (month) => {
    return instance.get(ENDPOINTS.GETSALARY,{
        params:{
            month: month
        }
    })
}

const salaryService = {
    get_salary
}

export default salaryService