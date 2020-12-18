// The auth header is used to make authenticated HTTP requests to the server api using JWT authentication.
export function authHeader () {
    // return authorization header with jwt token
    let token = localStorage.getItem('token');

    if (token) {
		  return { 'Authorization': 'Bearer ' + token };
    } else {
		  return {};
    }
}
