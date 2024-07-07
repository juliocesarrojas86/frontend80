import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';

const AgregarProveedores = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState({
        nombres: '', apellidos: '', cedula: '', correo: '', numeroContacto: '', nit: '', direccion: ''
    });

    const { nombres, apellidos, cedula, correo, numeroContacto, nit, direccion } = proveedores;

    const onChange = (e) => {
        setProveedores({
            ...proveedores,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        document.getElementById("nombres").focus();
    }, []);

    const CrearProveedores = async () => {
        const data = {
            nombres: proveedores.nombres,
            apellidos: proveedores.apellidos,
            cedula: proveedores.cedula,
            correo: proveedores.correo,
            numeroContacto: proveedores.numeroContacto,
            nit: proveedores.nit,
            direccion: proveedores.direccion
        };

        const response = await APIInvoke.invokePOST('/api/proveedores', data);
        const idProveedores = response._id;

        if (idProveedores === '') {
            const msg = 'Hubo un error al agregar un proveedor';
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            navigate("/proveedores");
            const msg = "El proveedor fue creado con éxito";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });

            setProveedores({ nombres: '', apellidos: '', cedula: '', correo: '', numeroContacto: '', nit: '', direccion: '' });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        CrearProveedores();
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <SidebarContainer />
            <div className='content-wrapper'>
                <ContentHeader
                    titulo="Dashboard"
                    breadCrumb1="Inicio"
                    breadCrumb2="Dashboard"
                    ruta1="/home"
                />
                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className='card-tools'>
                                <button type='button' className='btn btn-tool' data-card-widget="collapse" title="Collapse">
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tool' data-card-widget="remove" title="Remove">
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={onSubmit}>
                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='nombres'>Nombres</label>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='Ingrese los nombres'
                                            id='nombres'
                                            name='nombres'
                                            value={nombres}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='apellidos'>Apellidos</label>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='Ingrese los apellidos'
                                            id='apellidos'
                                            name='apellidos'
                                            value={apellidos}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='cedula'>Documento</label>
                                        <input type='number'
                                            className='form-control'
                                            placeholder='Ingrese el documento'
                                            id='cedula'
                                            name='cedula'
                                            value={cedula}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-id-card' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='correo'>Correo Electrónico</label>
                                        <input type='email'
                                            className='form-control'
                                            placeholder='Ingrese el correo'
                                            id='correo'
                                            name='correo'
                                            value={correo}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-envelope' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='telefono'>Teléfono</label>
                                        <input type='number'
                                            className='form-control'
                                            placeholder='Ingrese el teléfono'
                                            id='numeroContacto'
                                            name='numeroContacto'
                                            value={numeroContacto}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-phone' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='nit'>Nit</label>
                                        <input type='number'
                                            className='form-control'
                                            placeholder='Ingrese el nit'
                                            id='nit'
                                            name='nit'
                                            value={nit}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-body'>
                                    <div className='form-group'>
                                        <label htmlFor='direccion'>Dirección</label>
                                        <input type='text'
                                            className='form-control'
                                            placeholder='Ingrese la dirección'
                                            id='direccion'
                                            name='direccion'
                                            value={direccion}
                                            onChange={onChange}
                                            required
                                        />
                                        <div className='input-group-append'>
                                            <div className='input-group-text'>
                                                <span className='fas fa-user' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <button type='submit' className='btn btn-primary'>Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AgregarProveedores;
