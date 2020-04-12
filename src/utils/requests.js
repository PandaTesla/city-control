import axios from 'axios';
import { baseSqlApiRoute, API_KEY, tableName } from '../constants/routes';

const headers =  {
    'Access-Control-Allow-Origin': '*'
}

export async function insertUpdate(sql) {
    const params = {
        q: sql,
        api_key: API_KEY,
        headers: headers
    }

    return axios.get(`${baseSqlApiRoute}`, { params })
    .then(res => res.data)
    .catch (e => e);
}

export async function getByID(id) {
    const sql = `SELECT * from ${tableName} WHERE cartodb_id=${id}`

    const params = {
        q: sql,
        api_key: API_KEY,
        headers: headers
    }

    return axios.get(`${baseSqlApiRoute}`, { params })
    .then(res => res.data.rows[0])
    .catch (e => e);
}