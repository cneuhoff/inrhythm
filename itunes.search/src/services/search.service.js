import axios from 'axios'

export function searchItunes(artistName) {
    return axios.get(`https://itunes.apple.com/search?term=${artistName}&media=music&entity=album&limit=32`)
    .then(onSuccess)
    .catch(onError)
}

function onSuccess(response) {
    return response.data
}

function onError(error) {
    return Promise.reject(error.data)
}