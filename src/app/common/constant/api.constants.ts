import { environment } from "../../../environments/environment";

const SERVICE_API = environment.GATEWAY_URL+'/'+environment.SERVICE_CONTEXT;
const TASK_SERVICE = SERVICE_API+'/tasks/';
export const TASK_API = {
    ADD:TASK_SERVICE,
    UPDATE:TASK_SERVICE,
    GET_TASKS_TREE_BY_PRJID:TASK_SERVICE+"project/",
    GET_SUB_TASKS_BY_TASKID:TASK_SERVICE+"task/",
    GET_TASKS_BY_PRJID:TASK_SERVICE+'project/'
};

export const FILE_SERVICE = SERVICE_API+'/files/';
const PRJ_SERVICE = SERVICE_API+'/projects/';
export const PRJ_API = {
    ADD:PRJ_SERVICE,
    ADD_MEMBER: PRJ_SERVICE,
    UPDATE:PRJ_SERVICE,
    GET_PROJECT_BY_PROJECT_ID:PRJ_SERVICE,
    GET_PROJECTS:PRJ_SERVICE,
    GET_USERS_BY_PROJECT_ID:PRJ_SERVICE
};

const USERS_SERVICE = SERVICE_API+'/users/';
export const USERS_API = {
    GET_USERS_BY_USER_ID:USERS_SERVICE,
};

const OFFICE_SERVICE = SERVICE_API+'/offices/';
export const OFFICE_API = {
    GET_OFFICES:OFFICE_SERVICE,
    GET_EMPLOYEES_BY_OFFICE_ID:OFFICE_SERVICE,
    GET_MINISTRIES:OFFICE_SERVICE+'ministries/',
    GET_DIVISION:OFFICE_SERVICE+'layers/',
};

export const GREETING_SERVICE = SERVICE_API+'/greetings'
