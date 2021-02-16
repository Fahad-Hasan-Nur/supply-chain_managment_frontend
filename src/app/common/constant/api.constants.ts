import { environment } from '../../../environments/environment';

const SERVICE_API = environment.GATEWAY_URL;
const TASK_SERVICE = SERVICE_API + '/tasks/';
export const TASK_API = {
    ADD: TASK_SERVICE,
    UPDATE: TASK_SERVICE,
    GET_TASKS_TREE_BY_PRJID: TASK_SERVICE + 'project/',
    GET_SUB_TASKS_BY_TASKID: TASK_SERVICE + 'task/',
    GET_TASKS_BY_PRJID: TASK_SERVICE + 'project/',
};

export const FILE_SERVICE = SERVICE_API + '/files/';
const PRJ_SERVICE = SERVICE_API + '/projects/';
export const PRJ_API = {
    ADD: PRJ_SERVICE,
    ADD_MEMBER: PRJ_SERVICE,
    UPDATE: PRJ_SERVICE,
    GET_PROJECT_BY_PROJECT_ID: PRJ_SERVICE,
    GET_PROJECTS: PRJ_SERVICE,
    GET_USERS_BY_PROJECT_ID: PRJ_SERVICE,
};

const USERS_SERVICE = SERVICE_API + '/users/';
export const USERS_API = {
    GET_USERS_BY_USER_ID: USERS_SERVICE,
};

const OFFICE_SERVICE = SERVICE_API + '/offices/';
export const OFFICE_API = {
    GET_OFFICES: OFFICE_SERVICE,
    GET_EMPLOYEES_BY_OFFICE_ID: OFFICE_SERVICE,
    GET_MINISTRIES: OFFICE_SERVICE + 'ministries/',
    GET_DIVISION: OFFICE_SERVICE + 'layers/',
};

export const GREETING_SERVICE = SERVICE_API + '/greetings';

const PRODUCT_SERVICE = SERVICE_API + 'api/product/';
export const PRODUCT_API = {
    GET_PRODUCTS: PRODUCT_SERVICE + 'getAll/',
    ADD_PRODUCT: PRODUCT_SERVICE,
    GET_PRODUCT_BY_ID: PRODUCT_SERVICE,
};

const CATEGORY_SERVICE = SERVICE_API + 'api/category/';
export const CATEGORY_API = {
    GET_CATEGORY: CATEGORY_SERVICE + 'getAll/',
    ADD_CATEGORY: CATEGORY_SERVICE,
};
const BRAND_SERVICE = SERVICE_API + 'api/brand/';
export const BRAND_API = {
    GET_BRAND: BRAND_SERVICE + 'getAll/',
    ADD_BRAND: BRAND_SERVICE,
};
const SUB_CATEGORY_SERVICE = SERVICE_API + 'api/subCategory/';
export const SUB_CATEGORY_API = {
    GET_SUB_CATEGORIES: SUB_CATEGORY_SERVICE + 'getAll/',
    GET_SUB_CATEGORY_BY_CATEGORY: SUB_CATEGORY_SERVICE + 'getAll/',
    ADD_SUB_CATEGORY: SUB_CATEGORY_SERVICE,
};
const IMAGE_SERVICE = SERVICE_API + 'api/image/';
export const IMAGE_API = {
    GET_IMAGE_BY_ID: IMAGE_SERVICE + 'get/',
    ADD_IMAGE: IMAGE_SERVICE+ 'upload/',
};
const ADMIN_SERVICE = SERVICE_API + 'api/admin/';
export const ADMIN_API = {
    GET_ADMIN_BY_ID: ADMIN_SERVICE + 'getById/',
    GET_ADMIN_BY_EMAIL: ADMIN_SERVICE + 'getByEmail/',
};


