import React, { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet'
import ClipLoader from 'react-spinners/ClipLoader'
import { FiPlus, FiX } from 'react-icons/fi';

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
            
            const { data } = await api.get(`groups?lat=${latitude}&lng=${longitude}`)
            
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
                                <Popup className='popMarker'>
                                    <div>
                                        <label>Nome do grupo</label>
                                        <h1>{group.name}</h1>
                                    </div>
                                    <a target='_blank' href={group.link} rel="noreferrer">
                                        Entrar no grupo
                                    </a>
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
                            value={formData.name}
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
                            value={formData.link}
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
                            value={formData.description}
                        />
                        <span>{errors.description}</span>
                    </div>

                    <button type='submit'>Cadastrar</button>
                </form>
            )}

            <button onClick={handleFormVisibility} type='button'>
                {!formVisible ? (
                    <Fragment>
                        <FiPlus size={20} />
                        <span>Adicionar novo Grupo</span>
                    </Fragment>
                ) : (
                    <Fragment>
                        <FiX size={20} />
                        <span>Fechar</span>
                    </Fragment>
                )}
            </button>
        </div>
    );
}

export default Groups;