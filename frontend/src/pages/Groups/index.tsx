import React, { useState, useEffect, Fragment } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import ClipLoader from 'react-spinners/ClipLoader'
import { FiPlus } from 'react-icons/fi';

import GroupsModel from '../../entities/GroupsModel';
import api from '../../services/api'

import './styles.css'

const Groups: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
    const [groups, setGroups] = useState<GroupsModel[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            const { data } = await api.get('groups', {
                headers: {
                    latitude,
                    longitude
                }
            })
            
            setGroups(data)
            setInitialPosition([latitude, longitude]);
        })
        setLoading(false)
    }, [])

    return (
        <div id='page-groups'>
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
                        {groups.map(group => (
                            <Marker position={[group.latitude, group.longitude]}>
                                <Tooltip>{group.name}</Tooltip>
                                <Popup >
                                    <div>
                                        <span>Nome do grupo: </span>
                                        <p>{group.name}</p>
                                    </div>
                                    <div>
                                        <span>Link para o grupo: </span>
                                        <a target='_blank' href={group.link} rel="noreferrer">{group.link}</a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Fragment>
            )}
            <button type='button'>
                <FiPlus size={20} />
                <span>Adicionar novo Grupo</span>
            </button>
        </div>
    );
}

export default Groups;