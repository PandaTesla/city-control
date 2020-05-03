import axios from 'axios';
import { BASE_URL } from '../constants/routes';

axios.defaults.headers.common.Authorization = localStorage.getItem('token');

export function insert(attributes) {
    return axios.post(`${BASE_URL}/api/sqlapi/insert`, { attributes })
        .then(res => {
            updateToken(res);
            return {
                status: res.status,
                data: res.data
            }
        }).catch(e => {
            updateToken(e.response);
            return {
                status: e.response.status,
                data: e.response.data
            }
        });
}

export function update(cartodbId, attributes) {
    return axios.put(`${BASE_URL}/api/sqlapi/update`, { 
        cartodb_id: cartodbId,
        attributes 
    }).then(res => {
        updateToken(res);
        return {
            status: res.status,
            data: res.data
        }
    }).catch(e => {
        updateToken(e.response);
        return {
            status: e.response.status,
            data: e.response.data
        }
    });
}

export function updateAll(searchField, searchValue, updateField, updateValue) {
    return axios.put(`${BASE_URL}/api/sqlapi/update/all`, { 
        search_col: searchField,
        search_val: searchValue,
        to_edit_col: updateField,
        to_edit_val: updateValue
    }).then(res => {
        updateToken(res);
        return {
            status: res.status,
            data: res.data
        }
    }).catch(e => {
        updateToken(e.response);
        return {
            status: e.response.status,
            data: e.response.data
        }
    });
}

export function fetchMissionsBy(columnName, value) {
    return axios.get(`${BASE_URL}/api/sqlapi/missions/bycolumn/${columnName}/value/${value}`)
        .then(res => {
            updateToken(res);
            return {
                status: res.status,
                data: res.data.rows
            }
        }).catch(e => {
            updateToken(e.response);
            return {
                status: e.response.status,
                data: e.response.data
            }
        });
}

export function fetchColumnNames() {
    return axios.get(`${BASE_URL}/api/sqlapi/columnnames`)
        .then(res => {
            updateToken(res);
            return {
                status: res.status,
                data: res.data.rows.map(row => row.column_name)
                        .filter((columnName) => !['the_geom_webmercator', 'the_geom', 'lon', 'lat'].includes(columnName))
            }
        }).catch(e => {
            updateToken(e.response);
            return {
                status: e.response.status,
                data: e.response.data
            }
        });
}

export function logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
}

function updateToken(response){
    localStorage.setItem('token', response.headers.authorization);
    axios.defaults.headers.common.Authorization = response.headers.authorization;
}