import axios from 'axios';

export default function(query) {
    return new Promise((resolve, reject) => {
        axios.get(`/filter/users/${query}`)
        .then(({data}) => resolve(data.data))
        .catch(err => reject(err))
    })
}