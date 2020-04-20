
export const AUTH = {
    userName: "elbit",
    apiKey: "ca6b4cc11768c8d258787485a5c917fe2853bf30"
}

export const BASE_URL = (process.env.NODE_ENV === "production")? "https://city-control.api.covid-97.com" : "https://localhost:8080";

export const API = {
    url: `${BASE_URL}/sqlapi/user/${AUTH.userName}/api/v2/sql/`,
    updateUrl: `${BASE_URL}/sqlapi/user/${AUTH.userName}/api/v2/sql/job`,
}

const DATASET = (process.env.NODE_ENV === "production")? "datasets:rw:elbit.wide_bridge" : "datasets:rw:elbit.wide_bridge_copy";

export const CARTO_OAUTH = `https://cartodb.covid-97.com/oauth2/authorize?client_id=27DxOdXMX1sF&response_type=code&state=hatul&scope=offline ${DATASET}`;

export const SQL_API = {
    url: `https://cartodb.covid-97.com/user/${AUTH.userName}/api/v2/sql/`,
    updateUrl: `https://cartodb.covid-97.com/user/${AUTH.userName}/api/v2/sql/job`,
    tableName: (process.env.NODE_ENV === "production")? "elbit.wide_bridge" : "elbit.wide_bridge_copy",
    tableNameForUpdateInsert: (process.env.NODE_ENV === "production")? "wide_bridge" : "wide_bridge_copy"
}

export const SQL_EXPRESSIONS = {
    selectByid: `SELECT * from ${SQL_API.tableName} WHERE cartodb_id=`,
    selectByColumn: `SELECT * from ${SQL_API.tableName} WHERE `,
    selectColumnsNames: `SELECT columns.column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'wide_bridge_copy'`
}