import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Map, TileLayer, Marker } from 'react-leaflet'

const useStyles = makeStyles({
    map: {
        height: '300px',
        width: '400px'
    }
}); 

function LFMap(props) {
    const classes = useStyles();
    const [lon, setLon] = useState(34.94750976562501);
    const [lat, setLat] = useState(31.765537409484374);
    const [zoom, setZoom] = useState(7);

    useEffect(() => {
        if (props.lon && props.lat){
            setLon(props.lon);
            setLat(props.lat);
            setZoom(18);
        }
    }, [])

    const handleMarkMoveEnd = (event) => {
        const {lat, lng} = event.target._latlng
        props.setPoint(lng, lat);
    }
    
    const handleMapClick = (event) => {
        const {lat, lng} = event.latlng
        props.setPoint(lng, lat);
    }

    return (
        <Map className={classes.map} center={[lat, lon]} zoom={zoom} onClick={handleMapClick}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            {props.lon && props.lat && 
                <Marker position={[props.lat, props.lon]} draggable onMoveEnd={handleMarkMoveEnd}/>}
        </Map>
    );
}

LFMap.propTypes = {
    lon: PropTypes.number,
    lat: PropTypes.number,
    setPoint: PropTypes.func
};

export default LFMap;

