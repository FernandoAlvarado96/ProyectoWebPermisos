
const linkApi = "https://localhost:5001/api/";

async function HTTPClient(url, type = 'GET', param = {}, async = true)
{
    var resp;
    var request = null;
    if (param !== null && param !== undefined) {
        request = {
            method: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(param)
        };
    }
    else {
        request = {
            method: type,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };
    }

    await fetch(linkApi + url, request)
        .then(response => response.json())
        .then(data => {
            resp = data;
            console.log(data);
        })
        .catch(error => console.log(error));

    return resp;
}