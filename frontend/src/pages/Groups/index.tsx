import React, { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import ClipLoader from 'react-spinners/ClipLoader'
import { FiPlus } from 'react-icons/fi';

import GroupsModel from '../../entities/GroupsModel';
import api from '../../services/api'
import * as Yup from 'yup'

import './styles.css'
import getValidationErrors from '../../utils/getValidationError';

const formInitialValues = {
    name: '',
    link: '',
    description: ''
}

const Groups: React.FC = () => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])
    const [groups, setGroups] = useState<GroupsModel[]>([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(formInitialValues)

    const [errors, setErros] = useState(formInitialValues)

    const [formVisible, setFormVisible] = useState(false)

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

    const handleFormVisibility = () => {
        setFormVisible(!formVisible)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }
    
    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        
        setErros(formInitialValues)

        try{
            const shema = Yup.object().shape({
                name: Yup.string()
                  .required('Nome do grupo obrigatório'),
                link: Yup.string().required('Link para o grupo obrigatório'),
                description: Yup.string().required('Descrição obrigatória'),
            });
    
            await shema.validate(formData, {
                abortEarly: false,
            });

            const { data } = await api.post('groups', {
                ...formData,
                latitude: initialPosition[0],
                longitude: initialPosition[1]
            })

            setGroups([ ...groups, data ])
            setFormData(formInitialValues)
        }catch(err){
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                
                setErros({
                    name: errors.name,
                    description: errors.description,
                    link: errors.link
                })
            }
        }
    }

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
                            <Marker key={group.id} position={[group.latitude, group.longitude]}>
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

            {formVisible && (
                <form onSubmit={handleFormSubmit}>
                    <h1>Adicionar novo Grupo</h1>
                    <div className='field'>
                        <label>Nome</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id='name'
                            name='name'
                        />
                        <span>{errors.name}</span>
                    </div>
                    <div className='field'>
                        <label>Link</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id='link'
                            name='link'
                        />
                        <span>{errors.link}</span>
                    </div>
                    <div className='field'>
                        <label>Descrição</label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            id='description'
                            name='description'
                        />
                        <span>{errors.description}</span>
                    </div>

                    <button type='submit'>Cadastrar</button>
                </form>
            )}

            <button onClick={handleFormVisibility} type='button'>
                <FiPlus size={20} />
                <span>Adicionar novo Grupo</span>
            </button>
        </div>
    );
}

export default Groups;