export function getTokenFromLocalStorage() {
	const token = localStorage.getItem('token');
	return token;
}

export function removeTokenFromLocalStorage() {
	localStorage.removeItem('token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('role');
	localStorage.removeItem('id');
}

export function toCommaSeparatedValues(values) {
	return values.join(',');
}

export function getRoleFromLocalStorage() {
	const role = localStorage.getItem('role');
	return role;
}

export function getRange(start, end) {
	const length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}
