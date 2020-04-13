export const auth = {
    userName: "elbit",
    apiKey: "ca6b4cc11768c8d258787485a5c917fe2853bf30"
}

export const sqlApi = {
    url: `https://cartodb.covid-97.com/user/${auth.userName}/api/v2/sql/`,
    tableName: "elbit.wide_bridge_copy"
}

if (process.env.NODE_ENV === "production") {
    sqlApi.tableName = 'elbit.wide_bridge';
}