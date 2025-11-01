import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formularioPostulacionSchema } from '../validations/formulario.js';
import { API_URL } from '../config';
import './FormularioPostulacionModal.css';

export default function FormularioPostulacionModal({ show, handleClose, empresa, onPostulacionExitosa }) {
  // Estados para el autocompletado
  const [paises, setPaises] = useState([]);
  const [ciudadesSugeridas, setCiudadesSugeridas] = useState([]);
  const [busquedaCiudad, setBusquedaCiudad] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [cargandoCiudades, setCargandoCiudades] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(formularioPostulacionSchema),
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      apellido: '',
      localidad: '',
      pais: '',
      genero: '',
      descripcion: '',
      archivo: null,
    },
  });

  const paisSeleccionado = watch('pais');

  useEffect(() => {
    cargarPaises();
  }, []);

  // Limpiar localidad cuando cambia el país
  useEffect(() => {
    if (paisSeleccionado) {
      setValue('localidad', '');
      setBusquedaCiudad('');
      setCiudadesSugeridas([]);
    }
  }, [paisSeleccionado, setValue]);

  const getPaisesFallback = () => [
    { codigo: 'AF', nombre: 'Afganistán' },
    { codigo: 'AL', nombre: 'Albania' },
    { codigo: 'DE', nombre: 'Alemania' },
    { codigo: 'AD', nombre: 'Andorra' },
    { codigo: 'AO', nombre: 'Angola' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'AM', nombre: 'Armenia' },
    { codigo: 'AU', nombre: 'Australia' },
    { codigo: 'AT', nombre: 'Austria' },
    { codigo: 'AZ', nombre: 'Azerbaiyán' },
    { codigo: 'BE', nombre: 'Bélgica' },
    { codigo: 'BO', nombre: 'Bolivia' },
    { codigo: 'BA', nombre: 'Bosnia y Herzegovina' },
    { codigo: 'BR', nombre: 'Brasil' },
    { codigo: 'BG', nombre: 'Bulgaria' },
    { codigo: 'CA', nombre: 'Canadá' },
    { codigo: 'CL', nombre: 'Chile' },
    { codigo: 'CN', nombre: 'China' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'KR', nombre: 'Corea del Sur' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'HR', nombre: 'Croacia' },
    { codigo: 'CU', nombre: 'Cuba' },
    { codigo: 'DK', nombre: 'Dinamarca' },
    { codigo: 'EC', nombre: 'Ecuador' },
    { codigo: 'EG', nombre: 'Egipto' },
    { codigo: 'SV', nombre: 'El Salvador' },
    { codigo: 'AE', nombre: 'Emiratos Árabes Unidos' },
    { codigo: 'SK', nombre: 'Eslovaquia' },
    { codigo: 'SI', nombre: 'Eslovenia' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'EE', nombre: 'Estonia' },
    { codigo: 'FI', nombre: 'Finlandia' },
    { codigo: 'FR', nombre: 'Francia' },
    { codigo: 'GE', nombre: 'Georgia' },
    { codigo: 'GR', nombre: 'Grecia' },
    { codigo: 'GT', nombre: 'Guatemala' },
    { codigo: 'HN', nombre: 'Honduras' },
    { codigo: 'HU', nombre: 'Hungría' },
    { codigo: 'IN', nombre: 'India' },
    { codigo: 'ID', nombre: 'Indonesia' },
    { codigo: 'IQ', nombre: 'Irak' },
    { codigo: 'IR', nombre: 'Irán' },
    { codigo: 'IE', nombre: 'Irlanda' },
    { codigo: 'IS', nombre: 'Islandia' },
    { codigo: 'IL', nombre: 'Israel' },
    { codigo: 'IT', nombre: 'Italia' },
    { codigo: 'JP', nombre: 'Japón' },
    { codigo: 'LV', nombre: 'Letonia' },
    { codigo: 'LT', nombre: 'Lituania' },
    { codigo: 'LU', nombre: 'Luxemburgo' },
    { codigo: 'MY', nombre: 'Malasia' },
    { codigo: 'MT', nombre: 'Malta' },
    { codigo: 'MA', nombre: 'Marruecos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'NI', nombre: 'Nicaragua' },
    { codigo: 'NO', nombre: 'Noruega' },
    { codigo: 'NZ', nombre: 'Nueva Zelanda' },
    { codigo: 'NL', nombre: 'Países Bajos' },
    { codigo: 'PA', nombre: 'Panamá' },
    { codigo: 'PY', nombre: 'Paraguay' },
    { codigo: 'PE', nombre: 'Perú' },
    { codigo: 'PL', nombre: 'Polonia' },
    { codigo: 'PT', nombre: 'Portugal' },
    { codigo: 'PR', nombre: 'Puerto Rico' },
    { codigo: 'GB', nombre: 'Reino Unido' },
    { codigo: 'CZ', nombre: 'República Checa' },
    { codigo: 'DO', nombre: 'República Dominicana' },
    { codigo: 'RO', nombre: 'Rumania' },
    { codigo: 'RU', nombre: 'Rusia' },
    { codigo: 'SE', nombre: 'Suecia' },
    { codigo: 'CH', nombre: 'Suiza' },
    { codigo: 'TH', nombre: 'Tailandia' },
    { codigo: 'TR', nombre: 'Turquía' },
    { codigo: 'UA', nombre: 'Ucrania' },
    { codigo: 'UY', nombre: 'Uruguay' },
    { codigo: 'VE', nombre: 'Venezuela' },
    { codigo: 'VN', nombre: 'Vietnam' },
    { codigo: 'ZA', nombre: 'Sudáfrica' },
  ];

  const cargarPaises = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      
      if (!response.ok) {
        throw new Error('Error al cargar países');
      }
      
      const data = await response.json();
      
      const paisesOrdenados = data
        .map(p => ({
          codigo: p.cca2,
          nombre: p.translations?.spa?.common || p.name.common
        }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      
      setPaises(paisesOrdenados);
      
    } catch (error) {
      console.error('Error al cargar países, usando fallback:', error);
      setPaises(getPaisesFallback());
    }
  };

  const buscarCiudades = async (texto, codigoPais) => {
    if (!texto || texto.length < 2 || !codigoPais) {
      setCiudadesSugeridas([]);
      return;
    }

    setCargandoCiudades(true);
    
    try {
      const username = 'RoDi';
      
      const response = await fetch(
        `http://api.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(texto)}&country=${codigoPais}&maxRows=10&featureClass=P&username=${username}`
      );
      
      const data = await response.json();
      
      if (data.geonames) {
        const ciudades = data.geonames.map(ciudad => ({
          nombre: ciudad.name,
          nombreCompleto: `${ciudad.name}${ciudad.adminName1 ? ', ' + ciudad.adminName1 : ''}`
        }));
        setCiudadesSugeridas(ciudades);
      }
    } catch (error) {
      console.error('Error al buscar ciudades:', error);
      const ciudadesLocales = obtenerCiudadesLocales(codigoPais, texto);
      setCiudadesSugeridas(ciudadesLocales);
    } finally {
      setCargandoCiudades(false);
    }
  };

  const obtenerCiudadesLocales = (codigoPais, filtro) => {
    const ciudadesPorPais = {
      AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'San Miguel de Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan'],
      BR: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
      CL: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca', 'Arica', 'Puerto Montt'],
      UY: ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera', 'Maldonado', 'Tacuarembó', 'Melo', 'Mercedes', 'Artigas'],
      MX: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Zapopan', 'Mérida', 'Cancún'],
      ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
      US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    };

    const ciudades = ciudadesPorPais[codigoPais] || [];
    return ciudades
      .filter(ciudad => ciudad.toLowerCase().includes(filtro.toLowerCase()))
      .map(nombre => ({ nombre, nombreCompleto: nombre }));
  };

  useEffect(() => {
    if (busquedaCiudad && paisSeleccionado) {
      const paisObj = paises.find(p => p.nombre === paisSeleccionado);
      const timer = setTimeout(() => {
        buscarCiudades(busquedaCiudad, paisObj?.codigo);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setCiudadesSugeridas([]);
    }
  }, [busquedaCiudad, paisSeleccionado]);

  const handleCiudadChange = (e) => {
    const valor = e.target.value;
    setBusquedaCiudad(valor);
    setValue('localidad', valor, { shouldValidate: true });
    setMostrarSugerencias(true);
  };

  const seleccionarCiudad = (ciudad) => {
    setValue('localidad', ciudad.nombre, { shouldValidate: true });
    setBusquedaCiudad(ciudad.nombre);
    setMostrarSugerencias(false);
    setCiudadesSugeridas([]);
  };

  const onSubmit = async (data) => {
    if (!empresa || !empresa.id) {
      alert("No se encontró la información de la empresa. Intenta de nuevo.");
      return;
    }

    const usuarioId = localStorage.getItem('usuarioID');
    if (!usuarioId) {
      alert("No se encontró la información del usuario. Iniciá sesión e intentá de nuevo.");
      return;
    }
    
    const token = localStorage.getItem('token');

    const formDataToSend = new FormData();
    formDataToSend.append('nombre', data.nombre);
    formDataToSend.append('apellido', data.apellido);
    formDataToSend.append('localidad', data.localidad);
    formDataToSend.append('pais', data.pais);
    formDataToSend.append('genero', data.genero);
    formDataToSend.append('descripcion', data.descripcion);
    formDataToSend.append('curriculum', data.archivo);
    formDataToSend.append('postuladoId', usuarioId);
    formDataToSend.append("ofertaId", empresa.id);

    try {
      const response = await fetch(`${API_URL}/formularios/${empresa.id}`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        reset();
        setBusquedaCiudad('');
        setArchivoSeleccionado(null);
        
        if (onPostulacionExitosa) {
          onPostulacionExitosa(empresa.id);
        } else {
          handleClose();
        }
      } else {
        alert("Error al enviar el formulario: " + (result.message || ''));
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un problema al enviar el formulario");
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size='lg' 
      centered
      backdrop="static"
      scrollable={true}
    >
      <Modal.Header 
        closeButton 
        style={{
          backgroundColor: '#212529',
          color: 'white',
          borderBottom: '3px solid #8b0000'
        }}
      >
        <Modal.Title style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          <i className="bi bi-person-fill-check me-2"></i>
          Postularse a {empresa?.nombre || empresa?.titulo || "esta oferta"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Información Personal */}
          <div className="mb-4 pb-3" style={{ borderBottom: '2px solid #e9ecef' }}>
            <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#721c24', fontSize: '1.1rem' }}>
              <i className="bi bi-person-badge me-2" style={{ fontSize: '1.3rem' }}></i>
              Información Personal
            </h6>
            
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group controlId="formNombre">
                  <Form.Label className="fw-semibold">Nombre *</Form.Label>
                  <Form.Control 
                    {...register('nombre')}
                    placeholder="Ingresá tu nombre"
                    isInvalid={!!errors.nombre}
                    style={{ padding: '0.6rem' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="formApellido">
                  <Form.Label className="fw-semibold">Apellido *</Form.Label>
                  <Form.Control 
                    {...register('apellido')}
                    placeholder="Ingresá tu apellido"
                    isInvalid={!!errors.apellido}
                    style={{ padding: '0.6rem' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.apellido?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="mb-4 pb-3" style={{ borderBottom: '2px solid #e9ecef' }}>
            <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#721c24', fontSize: '1.1rem' }}>
              <i className="bi bi-geo-alt-fill me-2" style={{ fontSize: '1.3rem' }}></i>
              Ubicación
            </h6>

            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group controlId="formPais">
                  <Form.Label className="fw-semibold">País *</Form.Label>
                  <Form.Select 
                    {...register('pais')}
                    isInvalid={!!errors.pais}
                    style={{ padding: '0.6rem' }}
                  >
                    <option value="">Seleccionar país</option>
                    {paises.map((p) => (
                      <option key={p.codigo} value={p.nombre}>{p.nombre}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pais?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="formLocalidad" style={{ position: 'relative' }}>
                  <Form.Label className="fw-semibold">Ciudad/Localidad *</Form.Label>
                  <Form.Control
                    type="text"
                    value={busquedaCiudad}
                    onChange={handleCiudadChange}
                    onFocus={() => setMostrarSugerencias(true)}
                    onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
                    placeholder={paisSeleccionado ? "Escribe tu ciudad..." : "Primero selecciona un país"}
                    disabled={!paisSeleccionado}
                    isInvalid={!!errors.localidad}
                    style={{ padding: '0.6rem' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.localidad?.message}
                  </Form.Control.Feedback>
                  {cargandoCiudades && (
                    <small className="text-muted">
                      <i className="bi bi-arrow-clockwise me-1"></i>
                      Buscando ciudades...
                    </small>
                  )}
                  {mostrarSugerencias && ciudadesSugeridas.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '2px solid #8b0000',
                      borderRadius: '0.5rem',
                      maxHeight: '200px',
                      overflowY: 'auto',
                      zIndex: 1000,
                      boxShadow: '0 6px 12px rgba(139,0,0,0.2)',
                      marginTop: '4px'
                    }}>
                      {ciudadesSugeridas.map((ciudad, index) => (
                        <div
                          key={index}
                          onClick={() => seleccionarCiudad(ciudad)}
                          style={{
                            padding: '12px 16px',
                            cursor: 'pointer',
                            borderBottom: index < ciudadesSugeridas.length - 1 ? '1px solid #f0f0f0' : 'none',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#fff5f5';
                            e.target.style.color = '#8b0000';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'inherit';
                          }}
                        >
                          <i className="bi bi-geo-alt me-2 text-muted"></i>
                          {ciudad.nombreCompleto}
                        </div>
                      ))}
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>

          {/* Género */}
          <div className="mb-4 pb-3" style={{ borderBottom: '2px solid #e9ecef' }}>
            <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#721c24', fontSize: '1.1rem' }}>
              <i className="bi bi-gender-ambiguous me-2" style={{ fontSize: '1.3rem' }}></i>
              Género *
            </h6>
            <div className="d-flex gap-4 flex-wrap">
              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <>
                    <Form.Check
                      type="radio"
                      id="genero-masculino"
                      label="Masculino"
                      value="masculino"
                      checked={field.value === 'masculino'}
                      onChange={() => field.onChange('masculino')}
                      isInvalid={!!errors.genero}
                      className="form-check-custom"
                    />
                    <Form.Check
                      type="radio"
                      id="genero-femenino"
                      label="Femenino"
                      value="femenino"
                      checked={field.value === 'femenino'}
                      onChange={() => field.onChange('femenino')}
                      isInvalid={!!errors.genero}
                      className="form-check-custom"
                    />
                    <Form.Check
                      type="radio"
                      id="genero-otro"
                      label="Otro"
                      value="otro"
                      checked={field.value === 'otro'}
                      onChange={() => field.onChange('otro')}
                      isInvalid={!!errors.genero}
                      className="form-check-custom"
                    />
                  </>
                )}
              />
            </div>
            {errors.genero && (
              <small className="text-danger">{errors.genero.message}</small>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-4 pb-3" style={{ borderBottom: '2px solid #e9ecef' }}>
            <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#721c24', fontSize: '1.1rem' }}>
              <i className="bi bi-chat-left-text me-2" style={{ fontSize: '1.3rem' }}></i>
              Presentación *
            </h6>
            <Form.Group controlId="formDescripcion">
              <Form.Control
                as="textarea"
                rows={4}
                {...register('descripcion')}
                placeholder="Contanos sobre tu experiencia, habilidades y por qué te interesa esta posición..."
                isInvalid={!!errors.descripcion}
                style={{ padding: '0.75rem', resize: 'none' }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                <i className="bi bi-lightbulb me-1"></i>
                Aprovechá este espacio para destacar tu perfil profesional
              </Form.Text>
            </Form.Group>
          </div>

          {/* Curriculum */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#721c24', fontSize: '1.1rem' }}>
              <i className="bi bi-file-earmark-text me-2" style={{ fontSize: '1.3rem' }}></i>
              Curriculum Vitae *
            </h6>
            <Form.Group controlId="formArchivo">
              <div 
                className={`p-4 text-center border-dashed ${errors.archivo ? 'border-danger' : ''}`}
                style={{ 
                  border: `2px dashed ${errors.archivo ? '#dc3545' : '#8b0000'}`,
                  borderRadius: '0.75rem',
                  backgroundColor: 'white',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (!errors.archivo) {
                    e.currentTarget.style.backgroundColor = '#fff5f5';
                    e.currentTarget.style.borderColor = '#6d0000';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  if (!errors.archivo) {
                    e.currentTarget.style.borderColor = '#8b0000';
                  }
                }}
              >
                <i className="bi bi-cloud-upload fs-1 mb-2 d-block" style={{ color: errors.archivo ? '#dc3545' : '#8b0000' }}></i>
                <p className="mb-2 fw-semibold">Arrastrá tu CV aquí o hacé click para seleccionar</p>
                <Controller
                  name="archivo"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Control 
                      type="file"
                      {...field}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        onChange(file);
                        setArchivoSeleccionado(file);
                      }}
                      accept=".pdf,.doc,.docx"
                      isInvalid={!!errors.archivo}
                      className="mt-2"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                />
                {errors.archivo && (
                  <div className="text-danger small mt-2">
                    {errors.archivo.message}
                  </div>
                )}
                <Form.Text className="text-muted d-block mt-2">
                  <i className="bi bi-info-circle me-1"></i>
                  Formatos: PDF, DOC, DOCX • Tamaño máximo: 5MB
                </Form.Text>
                {archivoSeleccionado && (
                  <div className="mt-3 alert alert-success py-2 mb-0">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Archivo seleccionado:</strong> {archivoSeleccionado.name}
                  </div>
                )}
              </div>
            </Form.Group>
          </div>

          <div 
            className="alert alert-info py-2 mb-3"
            style={{ 
              backgroundColor: '#fff5f5', 
              borderColor: '#8b0000',
              color: '#721c24'
            }}
          >
            <i className="bi bi-info-circle-fill me-2"></i>
            <small className="fw-semibold">* Todos los campos son obligatorios</small>
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <Button 
              variant="secondary" 
              onClick={handleClose}
              style={{
                padding: '0.6rem 1.5rem',
                fontWeight: '500'
              }}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              style={{ 
                backgroundColor: '#8b0000', 
                borderColor: '#8b0000',
                fontWeight: '600',
                padding: '0.6rem 1.5rem',
                boxShadow: '0 2px 4px rgba(139,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#6d0000';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(139,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#8b0000';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(139,0,0,0.2)';
              }}
            >
              <i className="bi bi-send-fill me-2"></i>
              {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}