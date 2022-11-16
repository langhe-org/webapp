interface LatLong {
    latitude: number;
    longitude: number;
}

// using an interface instead of 2 arguments so that the caller should see if they matched lat with lat and long with long
export function latitudeLongitudeDisplay(latLong: LatLong) {
    let latLabel = "";
    if(latLong.latitude > 0)
        latLabel = "°N";
    else if(latLong.latitude < 0)
        latLabel = "°S";

    let longLabel = "";
    if(latLong.longitude > 0)
        longLabel = "°E";
    else if(latLong.longitude < 0)
        longLabel = "°W";

    return `${Math.abs(latLong.latitude).toFixed(2)}${latLabel} | ${Math.abs(latLong.longitude).toFixed(2)}${longLabel}`;
}
