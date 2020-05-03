export const BASE_URL = (process.env.NODE_ENV === "production")? "https://city-control.api.covid-97.com" : "https://localhost:8080";

const CARTODB_OAUTH_CLIENT_ID = (process.env.NODE_ENV === "production") ? '__H_X_GkBRCo' : '27DxOdXMX1sF';
const DATASET = (process.env.NODE_ENV === "production")? "datasets:rw:elbit.wide_bridge" : "datasets:rw:elbit.wide_bridge_copy";
export const CARTO_OAUTH = `https://cartodb.covid-97.com/oauth2/authorize?client_id=${CARTODB_OAUTH_CLIENT_ID}&response_type=code&state=hatul&scope=offline ${DATASET}`;