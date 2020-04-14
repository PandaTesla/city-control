import axios from 'axios';
import { AUTH, SQL_API, SQL_EXPRESSIONS } from '../constants/routes';

let headers =  {
    'Access-Control-Allow-Origin': '*'
}

let params = {
    q: null,
    api_key: AUTH.apiKey,
    headers: headers
}

export async function insertUpdate(sql) {
    params.q = sql

    return axios.get(`${SQL_API.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}

export async function getByColumn(columnName, value) {
    params.q = SQL_EXPRESSIONS.selectByColumn + `${columnName} = '${value}'`

    return axios.get(`${SQL_API.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data.rows
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}

export async function getColumnsName() {
    params.q = SQL_EXPRESSIONS.selectColumnsNames

    return axios.get(`${SQL_API.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data.rows.map(row => row.column_name).filter((columnName) => !['the_geom_webmercator', 'the_geom', 'lon', 'lat'].includes(columnName))
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}