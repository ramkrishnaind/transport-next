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