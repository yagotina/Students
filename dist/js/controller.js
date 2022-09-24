export const controller = async (path, method = 'GET', body) => {
    const URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io' + path;

    const params = {
        method,
        headers: {'content-type': 'application/json'}
    };

    if(body) params.body = JSON.stringify(body);

    const response = await fetch(URL, params);
    
    if(response.ok) {
        return await response.json();
    } else {
        alert(`Error ${response.status}! ${response.statusText}.`);
    };
};