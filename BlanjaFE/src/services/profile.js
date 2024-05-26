import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const customerProfileUrl = `${BASE_URL}customer/profile`;
const sellerProfileUrl = `${BASE_URL}seller/profile`;

export async function getCustomerProfile(token) {
	try {
		const result = await axios.get(customerProfileUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		throw new Error({
			message: error.response.data.message,
			status: error.response.data.statusCode,
		});
	}
}

export async function getSellerProfile(token) {
	try {
		const result = await axios.get(sellerProfileUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		throw new Error(error);
	}
}
