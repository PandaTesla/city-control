import axios from 'axios';
import { AUTH, SQL_API, SQL_EXPRESSIONS } from '../constants/routes';

let headers =  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
}

let queryParams = {
    q: null,
    api_key: AUTH.apiKey,
}

export async function insertUpdate(sql) {
    const body = { query: sql };
    const {q, ...queryPost} = queryParams

    return axios.post(`${SQL_API.updateUrl}`, body, { params: queryPost, headers: headers })
    .then(res => ({
        status: res.status,
        data: res.data
    }))
    .catch(e => ({
        status: e,
        data: e.response.data
    }));
}

export async function getByColumn(columnName, value) {
    queryParams.q = SQL_EXPRESSIONS.selectByColumn + `${columnName} = '${value}'`

    return axios.get(`${SQL_API.url}`, { params: queryParams })
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
    queryParams.q = SQL_EXPRESSIONS.selectColumnsNames

    return axios.get(`${SQL_API.url}`, { params: queryParams })
    .then(res => ({
        status: res.status,
        data: res.data.rows.map(row => row.column_name).filter((columnName) => !['the_geom_webmercator', 'the_geom', 'lon', 'lat'].includes(columnName))
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}