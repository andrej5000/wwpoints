import EndpointConfig from '../../config/endpointConfig';


const HIGHSCORE_API = EndpointConfig.highscore;
const HIGHSCORE_API_URI = HIGHSCORE_API.protocol
    + '://'
    + HIGHSCORE_API.url
    + ':'
    + HIGHSCORE_API.port
    + HIGHSCORE_API.target;


export const saveHighscore = (highscoreData, callback) => {

    fetch(HIGHSCORE_API_URI, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: highscoreData
    })
        .then(response => response.json())
        .then(payload => callback(payload))
        .catch(console.error);
};


export const getHighscore = (callback) => {

    fetch(HIGHSCORE_API_URI, {
        method: 'GET'
    })
        .then((response) => {

            return response.json();
        })
        .then(payload => callback(payload))
        .catch(console.error);
};
