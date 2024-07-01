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

export async function updateProfileCustomer(token, profile) {
	try {
		const result = await axios.put(customerProfileUrl, profile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		console.log('error while updating profile');
		throw error;
	}
}

export async function updateProfileSeller(token, profile) {
	try {
		const result = await axios.put(sellerProfileUrl, profile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		console.log('error while updating profile');
		throw error;
	}
}

const addressUrl = `${BASE_URL}address`;
export async function addAddress(token, address) {
	try {
		const result = await axios.post(addressUrl, address, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return result.data;
	} catch (error) {
		console.log('error while adding address');
		throw error;
	}
}

const orderUrl = `${BASE_URL}order/profile`;
export async function getOrder(token) {
	try {
		const result = await axios.get(orderUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const data = result.data.data;
		if (!data) {
			return [];
		}
		return data;
	} catch (error) {
		console.log('error while getting order');
		throw error;
	}
}
