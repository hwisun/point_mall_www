class DataHelper {
    static baseURL() {
        return 'http://localhost:8005';
    }

    static setAuthToken(token) {
        localStorage.setItem('auth_token', token.token_type + ' ' + token.access_token);
    }

    static getAuthToken() {
        return localStorage.getItem('auth_token');
    }
}

export default DataHelper;