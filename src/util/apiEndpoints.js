export const BASE_URL = "https://moneymanager-k9l6.onrender.com"

export const API_ENDPOINTS = {

    LOGIN: "/login",
    REGISTER:"/register",
    GET_ALL_CATEGORIES:"/category/get-category",
    ADD_CATEGORY:"/category/save-category",
    UPDATE_CATEGORY:"/category/update-category",
    CATEGORY_BY_TYPE: (type) =>  `/category/${type}`,
    GET_ALL_INCOME:"/income/getIncomesForCurrentMonth",
    ADD_INCOME:'/income/add',
    ADD_EXPENSE:"/expense/add",
    GET_ALL_EXPENSES:"/expense/getExpensesForCurrentMonth",
    FILTER:"/filter",
    DASHBOARD_DATA:"/dashboard/get-data"
}