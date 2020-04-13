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

export async function getByID(id) {
    params.q = SQL_EXPRESSIONS.selectByid + id

    return axios.get(`${SQL_API.url}`, { params })
    .then(res => ({
        status: res.status,
        data: res.data.rows[0]
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
        data: res.data.rows[0]
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
        data: res.data.rows.map(row => row.column_name)
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}