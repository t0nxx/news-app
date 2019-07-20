import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';

// const apiLogin = 'http://ec2-35-168-9-164.compute-1.amazonaws.com:3001';
const apiLogin = 'http://localhost:3001';
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`${apiLogin}/auth/login/admin`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ data, token }) => {
                localStorage.setItem('token', token);
                localStorage.setItem('role', data.role);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        return Promise.resolve();
    }
    //return Promise.resolve();
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    if (type === AUTH_ERROR) {
        //const status = params.status;
       // console.log(params);
       // if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
       // }
        //return Promise.resolve();
    }
}