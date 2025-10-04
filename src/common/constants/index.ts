import { ClientApp } from "../interfaces";

export const isStaging = process.env.NODE_ENV === 'staging';
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const customerMobileApp: ClientApp = {
    key: 'CUSTOMER_MOBILE',
    name: 'Customer Mobile',
    domain: ''
}

export const apps = [
    customerMobileApp
]

export const productionWhitelist = ['']

export const stagingWhitelist = ['']