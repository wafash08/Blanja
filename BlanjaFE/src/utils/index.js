export function getTokenFromLocalStorage() {
	const token = localStorage.getItem('token');
	return token;
}

export function removeTokenFromLocalStorage() {
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('role');
	localStorage.removeItem('id');
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('role');
	localStorage.removeItem('id');
}

export function toCommaSeparatedValues(values) {
	return values.join(', ');
}
