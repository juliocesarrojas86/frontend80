import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContainer';
import APIInvoke from '../../configuracion/APIInvoke';
import swal from 'sweetalert';

const MostrarProveedores = () => {
    const [proveedores, setProveedores] = useState([]);

    const getProveedores = async () => {
        const response = await APIInvoke.invokeGET('/api/proveedores');
        setProveedores(response);
    };

    useEffect(() => {
        getProveedores();
    }, []);

    const eliminarProveedores = async (e, idProveedor) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/proveedores/${idProveedor}`);

        if (response.msg === "El proveedor ha sido eliminado") {
            const msg = "El proveedor fue eliminado correctamente";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getProveedores();
        } else {
            const msg = "El proveedor no pudo ser eliminado correctamente";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <SidebarContainer />
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
                            <h3 className='card-title'>
                                <Link to={"/proveedores/agregar"} className='btn btn-block btn-primary btn-sm'>Crear Proveedor</Link>
                            </h3>
                            <div className='cards-tools'>
                                <button type='button' className='btn btn-tools' data-card-widget="collapse" title="Collapse">
                                    <i className='fas fa-minus'></i>
                                </button>
                                <button type='button' className='btn btn-tools' data-card-widget="remove" title="Remove">
                                    <i className='fas fa-times'></i>
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Nombres Proveedores</th>
                                        <th style={{ width: '15%' }}>Apellidos Proveedores</th>
                                        <th style={{ width: '10%' }}>Cedula</th>
                                        <th style={{ width: '15%' }}>Correo</th>
                                        <th style={{ width: '10%' }}>Número de Contacto</th>
                                        <th style={{ width: '10%' }}>NIT</th>
                                        <th style={{ width: '15%' }}>Dirección</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proveedores.map((prov, index) => (
                                        <tr key={index}>
                                            <td>{prov.nombres}</td>
                                            <td>{prov.apellidos}</td>
                                            <td>{prov.cedula}</td>
                                            <td>{prov.correo}</td>
                                            <td>{prov.numeroContacto}</td>
                                            <td>{prov.nit}</td>
                                            <td>{prov.direccion}</td>
                                            <td>
                                                <Link to={`/proveedores/editar/${prov._id}`} className="btn btn-primary mt-2 mb-2">
                                                    <i className="fa-solid fa-edit"></i> Editar
                                                </Link>
                                                <button onClick={(e) => eliminarProveedores(e, prov._id)} className="btn btn-danger mt-2 mb-2">
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
    );
};

export default MostrarProveedores;
