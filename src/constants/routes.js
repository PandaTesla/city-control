export const AUTH = {
    userName: "elbit",
    apiKey: "ca6b4cc11768c8d258787485a5c917fe2853bf30"
}

export const SQL_API = {
    url: `https://cartodb.covid-97.com/user/${AUTH.userName}/api/v2/sql/`,
    updateUrl: `https://cartodb.covid-97.com/user/${AUTH.userName}/api/v2/sql/job`,
    tableName: "elbit.wide_bridge_copy",
    tableNameForUpdateInsert: "wide_bridge_copy"
}

export const SQL_EXPRESSIONS = {
    selectByid: `SELECT * from ${SQL_API.tableName} WHERE cartodb_id=`,
    selectByColumn: `SELECT * from ${SQL_API.tableName} WHERE `,
    selectColumnsNames: `SELECT columns.column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'wide_bridge_copy'`
}

if (process.env.NODE_ENV === "production") {
    SQL_API.tableName = 'elbit.wide_bridge';
    SQL_API.tableNameForUpdateInsert = "wide_bridge";
}