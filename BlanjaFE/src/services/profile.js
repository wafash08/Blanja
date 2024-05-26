import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils';

const BASE_URL = import.meta.env.VITE_BE_URL;
const customerProfileUrl = `${BASE_URL}customer/profile`;
const sellerProfileUrl = `${BASE_URL}seller/profile`;

const TOKEN = getTokenFromLocalStorage();

export async function getCustomerProfile() {
	try {
		const result = await axios.get(customerProfileUrl, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		return result.data.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}

export async function getSellerProfile() {
	try {
		const result = await axios.get(sellerProfileUrl, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		return result.data.data;
	} catch (error) {
		throw new Error(error);
	}
}
