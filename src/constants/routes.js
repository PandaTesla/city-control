export const API_KEY = "ca6b4cc11768c8d258787485a5c917fe2853bf30";

const userName = "elbit";
export let tableName;
if(process.env.NODE_ENV === "production")
    tableName = "elbit.wide_bridge";
else tableName = "elbit.wide_bridge_copy"
export const baseSqlApiRoute = `https://cartodb.covid-97.com/user/${userName}/api/v2/sql/`;