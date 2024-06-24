import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BE_URL;
const uploadSingleImageUrl = `${BASE_URL}uploadImage`;

export async function uploadSingleImage(file) {
	try {
		const result = await axios.post(uploadSingleImageUrl, file);
		return result.data.data;
	} catch (error) {
		console.log('error while uploading image > ', error);
		throw error;
	}
}

const uploadPhotoSellerUrl = `${BASE_URL}seller/profile/photo`;
export async function uploadPhotoSeller(token, image) {
	try {
		const result = await axios.put(uploadPhotoSellerUrl, image, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return result.data;
	} catch (error) {
		console.log('error while uploading image > ', error);
		throw error;
	}
}
