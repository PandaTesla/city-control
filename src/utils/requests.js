import axios from 'axios';
import { baseSqlApiRoute, API_KEY } from '../constants/routes';

export async function insertUpdate(sql) {
    const params = {
        q: sql,
        api_key: API_KEY
    }

    axios.get(`${baseSqlApiRoute}`, { params }).then(res => {
        return res.data
    }).catch (e => {
        return e;
    })
}