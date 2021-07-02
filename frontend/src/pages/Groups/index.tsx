import React, { useState, useEffect, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import ClipLoader from 'react-spinners/ClipLoader'

import './styles.css'

const Groups: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            setInitialPosition([latitude, longitude]);
        })
        setLoading(false)
    }, [])

    return (
        <div>
            {initialPosition[0] === 0 ? (
                <ClipLoader 
                    color='#000000' 
                    loading={loading} 
                    size={150} 
                />
            ) : (
                <Fragment>
                    <MapContainer center={initialPosition} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Circle center={initialPosition} radius={1000} />
                        <Marker position={initialPosition}>
                            <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Fragment>
            )}
        </div>
    );
}

export default Groups;