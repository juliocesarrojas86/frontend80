import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ContentHeader from '../../Componentes/ContentHeader'
import Footer from '../../Componentes/Footer'
import Navbar from '../../Componentes/Navbar'
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert'




const MostrarClientes = () => {
    const [clientes, setClientes] = useState([]);

    const getclientes = async () => {
        const response = await APIInvoke.invokeGET('/api/clientes');
        setClientes(response);
    }

    useEffect(() => {
        getclientes();
    }, [])

    const eliminarClientes = async (e, idcliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idcliente}`);


        if (response.msg === "El cliente ha sido eliminado") {
            const msg = "El cliente fue eliminado correctamente";
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getclientes();

        } else {
            const msg = "El cliente no pudo ser eliminado correctamente";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });

        }
    }


    return (
        <div className='wrapper'>

            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className='content-wrapper'>

                <ContentHeader
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/home"}
                />
                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'> <Link to={"/clientes/agregar"} className='btn btn-block btn-primary btn-sm'>crear clientes</Link></h3>
                            <div className='cards-tools'>
                                <button type='button' className='btn btn-tools' data-card-wigget="collapse" title="collapse">
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tools' data-card-wigget="collapse" title="Remove">
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombres clientes</th>
                                        <th style={{ width: '15%' }}>Apellidos clientes</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '15%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Número de Contacto</th>
                                        <th style={{ width: '10%' }}>Nit</th>
                                        <th style={{ width: '15%' }}>Dirección</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map((cli, index) => (
                                        <tr key={index}>
                                            <td>{cli.nombres}</td>
                                            <td>{cli.apellidos}</td>
                                            <td>{cli.cedula}</td>
                                            <td>{cli.correo}</td>
                                            <td>{cli.numeroContacto}</td>
                                            <td>{cli.nit}</td>
                                            <td>{cli.direccion}</td>
                                            <td>
                                                <Link to={`/clientes/editar/${cli._id}`} className="btn btn-primary mt-2 mb-2">
                                                    <i className="fa-solid fa-edit"></i> Editar
                                                </Link>
                                                <button onClick={(e) => eliminarClientes(e, cli._id)} className="btn btn-danger mt-2 mb-2">
                                                    <i className="fa-solid fa-trash"></i> Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MostrarClientes