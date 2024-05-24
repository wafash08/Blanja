export function getTokenFromLocalStorage() {
	const token = localStorage.getItem('token');
	return token;
}

export function removeTokenFromLocalStorage() {
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
}
