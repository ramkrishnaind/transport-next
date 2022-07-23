import axios from 'axios';

export const registerCustomer = async (params) => {
    return axios.post(
        '/api/user',
        params
    )
}
export const listuser = async (params) => {
    return axios.post(
        '/api/user/listuser',params    )
}
export const collectBasicInfo = async (params) => {
    return axios.post(
        '/api/customer/collectBasicInfo',
        params
    )
}
export const liftAvailability = async (params) => {
    return axios.put(
        'api/customer/liftAvailability',
        params
    )
}