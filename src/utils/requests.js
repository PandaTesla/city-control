import axios from 'axios';
import { AUTH, SQL_API, SQL_EXPRESSIONS } from '../constants/routes';

let queryParams = {
    q: null,
    api_key: AUTH.apiKey,
}

export async function insertUpdate(sql) {
    const body = { query: sql };
    // eslint-disable-next-line no-unused-vars
    const {q, ...queryPost} = queryParams;

    return axios.post(`${SQL_API.updateUrl}`, body, { params: queryPost })
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
    let valueExp;
    if(!value && value !== 0)
        valueExp = 'NULL';
    else valueExp = `'${value}'`;
    queryParams.q = SQL_EXPRESSIONS.selectByColumn + `${columnName} = ` + valueExp

    return axios.get(`${SQL_API.url}`, { params: queryParams })
    .then(res => ({
        status: res.status,
        data: res.data.rows
    }))
    .catch(e => ({
        status: e.response.status,
        data: [] //e.response.data
    }));
}

export async function getColumnsName() {
    queryParams.q = SQL_EXPRESSIONS.selectColumnsNames

    return axios.get(`${SQL_API.url}`, { params: queryParams })
    .then(res => ({
        status: res.status,
        data: res.data.rows.map(row => row.column_name)
                .filter((columnName) => !['the_geom_webmercator', 'the_geom', 'lon', 'lat'].includes(columnName))
    }))
    .catch(e => ({
        status: e.response.status,
        data: e.response.data
    }));
}