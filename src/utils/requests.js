import axios from 'axios';
import { auth, sqlApi } from '../constants/routes';

let headers =  {
    'Access-Control-Allow-Origin': '*'
}

let params = {
    q: null,
    api_key: auth.apiKey,
    headers: headers
}

export async function insertUpdate(sql) {
    params.q = sql

    return axios.get(`${sqlApi.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data
    }))
    .catch (e => ({
        status: e.response.status,
        data: e.response.data
    }));
}

export async function getByID(id) {
    params.q = `SELECT * from ${sqlApi.tableName} WHERE cartodb_id=${id}`

    return axios.get(`${sqlApi.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data.rows[0]
    }))
    .catch (e => ({
        status: e.response.status,
        data: e.response.data
    }));
}