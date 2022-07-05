import axios from 'axios';

export const registerCustomer = async (params) => {
    return axios.post(
        '/api/customer',
        params
    )
}
export const verifyOtp = async (params) => {
    return axios.post(
        '/api/customer/verifyOtp',
        params
    )
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