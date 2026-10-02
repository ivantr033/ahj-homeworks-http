/**
 *  Централизованный сетевой метод на базе Fetch API
 * */
const createRequest = async (options = {}) => {
    const { url, method = 'GET', data, callback } = options;

    const config = {
        method,
        headers: {},
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);

        if (response.status === 204) {
            if (callback) callback(null, null);
            return null;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (callback) {
            callback(null, result);
        }
        return result;
    } catch (error) {
        console.error('API Network failure:', error);
        if (callback) {
            callback(error, null);
        }
        throw error;
    }
};

export default createRequest;
