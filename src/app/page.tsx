'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SERNATUR por region
const OFICINAS = [
  { id: 1, nombre: 'SERNATUR Arica y Parinacota', region: 'Arica y Parinacota', direccion: 'San Marcos 101, Arica', telefono: '58 2252055', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 2, nombre: 'SERNATUR Tarapaca', region: 'Tarapaca', direccion: 'Anibal Pinto 436, Iquique', telefono: '57 2419241', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 3, nombre: 'SERNATUR Antofagasta', region: 'Antofagasta', direccion: 'Prat 384, Antofagasta', telefono: '55 2451818', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 4, nombre: 'SERNATUR Atacama', region: 'Atacama', direccion: 'Los Carrera 691, Copiapo', telefono: '52 2231510', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 5, nombre: 'SERNATUR Coquimbo', region: 'Coquimbo', direccion: 'Arturo Prat 325, La Serena', telefono: '51 2225199', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 6, nombre: 'SERNATUR Valparaiso', region: 'Valparaiso', direccion: 'Blanco 951, Valparaiso', telefono: '32 2939301', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 7, nombre: 'SERNATUR Metropolitana', region: 'Metropolitana', direccion: 'Av. Providencia 1550, Santiago', telefono: '2 27318336', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 8, nombre: 'SERNATUR OHiggins', region: 'OHiggins', direccion: 'German Riesco 277, Rancagua', telefono: '72 2230330', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 9, nombre: 'SERNATUR Maule', region: 'Maule', direccion: '1 Oriente 1150, Talca', telefono: '71 2233669', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 10, nombre: 'SERNATUR Nuble', region: 'Nuble', direccion: '18 de Septiembre 455, Chillan', telefono: '42 2223272', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 11, nombre: 'SERNATUR Biobio', region: 'Biobio', direccion: 'Anibal Pinto 460, Concepcion', telefono: '41 2741337', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 12, nombre: 'SERNATUR Araucania', region: 'Araucania', direccion: 'Bulnes 590, Temuco', telefono: '45 2406214', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 13, nombre: 'SERNATUR Los Rios', region: 'Los Rios', direccion: 'Arturo Prat 555, Valdivia', telefono: '63 2239060', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 14, nombre: 'SERNATUR Los Lagos', region: 'Los Lagos', direccion: 'OHiggins 575, Puerto Montt', telefono: '65 2223016', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 15, nombre: 'SERNATUR Aysen', region: 'Aysen', direccion: 'Bulnes 35, Coyhaique', telefono: '67 2240290', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 16, nombre: 'SERNATUR Magallanes', region: 'Magallanes', direccion: 'Lautaro Navarro 999, Punta Arenas', telefono: '61 2225385', horario: 'Lunes a Viernes 09:00-14:00' }
];

// Destinos turisticos populares
const DESTINOS = [
  { nombre: 'San Pedro de Atacama', region: 'Antofagasta', tipo: 'Desierto', icono: '🏜️', atractivos: ['Geysers del Tatio', 'Valle de la Luna', 'Salar de Atacama', 'Lagunas altiplanicas'], mejorEpoca: 'Todo el año' },
  { nombre: 'Torres del Paine', region: 'Magallanes', tipo: 'Montaña', icono: '🏔️', atractivos: ['Circuito W', 'Glaciar Grey', 'Cuernos del Paine', 'Lago Pehoe'], mejorEpoca: 'Octubre a Abril' },
  { nombre: 'Valparaiso', region: 'Valparaiso', tipo: 'Ciudad', icono: '🎨', atractivos: ['Cerros coloridos', 'Ascensores patrimoniales', 'Arte urbano', 'Puerto historico'], mejorEpoca: 'Todo el año' },
  { nombre: 'Isla de Pascua', region: 'Valparaiso', tipo: 'Isla', icono: '🗿', atractivos: ['Moais', 'Rano Raraku', 'Playa Anakena', 'Cultura Rapa Nui'], mejorEpoca: 'Febrero (Tapati)' },
  { nombre: 'Chiloe', region: 'Los Lagos', tipo: 'Isla', icono: '⛪', atractivos: ['Iglesias patrimoniales', 'Palafitos', 'Curanto', 'Mitologia chilota'], mejorEpoca: 'Diciembre a Marzo' },
  { nombre: 'Pucon', region: 'Araucania', tipo: 'Lago', icono: '🌋', atractivos: ['Volcan Villarrica', 'Termas geometricas', 'Ojos del Caburga', 'Deportes aventura'], mejorEpoca: 'Diciembre a Marzo' },
  { nombre: 'La Serena', region: 'Coquimbo', tipo: 'Playa', icono: '🏖️', atractivos: ['Valle del Elqui', 'Observatorios astronomicos', 'Playas', 'Pisco'], mejorEpoca: 'Noviembre a Marzo' },
  { nombre: 'Carretera Austral', region: 'Aysen', tipo: 'Ruta', icono: '🛣️', atractivos: ['Queulat', 'Capillas de Marmol', 'Ventisquero Colgante', 'Naturaleza virgen'], mejorEpoca: 'Diciembre a Marzo' }
];

// Tipos de alojamiento
const ALOJAMIENTOS = [
  { tipo: 'Hotel', estrellas: '1-5', descripcion: 'Establecimiento formal con servicios completos', precioPromedio: '$50.000 - $200.000/noche', servicios: ['Recepcion 24h', 'Limpieza diaria', 'Desayuno', 'WiFi'] },
  { tipo: 'Hostal', estrellas: '1-3', descripcion: 'Alojamiento economico con habitaciones privadas o compartidas', precioPromedio: '$15.000 - $40.000/noche', servicios: ['Cocina compartida', 'WiFi', 'Areas comunes', 'Lockers'] },
  { tipo: 'Cabañas', estrellas: 'N/A', descripcion: 'Alojamiento independiente ideal para familias o grupos', precioPromedio: '$60.000 - $150.000/noche', servicios: ['Cocina equipada', 'Estacionamiento', 'Quincho', 'Privacidad'] },
  { tipo: 'Camping', estrellas: 'N/A', descripcion: 'Sitios para carpa o motorhome en areas naturales', precioPromedio: '$5.000 - $15.000/noche', servicios: ['Baños', 'Agua potable', 'Fogatas', 'Naturaleza'] },
  { tipo: 'Apart Hotel', estrellas: '3-5', descripcion: 'Departamentos amoblados con servicios de hotel', precioPromedio: '$70.000 - $180.000/noche', servicios: ['Cocina', 'Living', 'Limpieza', 'Lavanderia'] },
  { tipo: 'Airbnb/Arriendo', estrellas: 'N/A', descripcion: 'Casas o departamentos de particulares', precioPromedio: '$30.000 - $120.000/noche', servicios: ['Variable', 'Cocina', 'Flexibilidad', 'Experiencia local'] }
];

// Derechos del turista
const DERECHOS = [
  { derecho: 'Informacion veraz', descripcion: 'Recibir informacion clara y verdadera sobre servicios y precios', icono: '📋' },
  { derecho: 'Cumplimiento de lo contratado', descripcion: 'Que se respete lo acordado en reservas y paquetes turisticos', icono: '📝' },
  { derecho: 'Seguridad', descripcion: 'Que los servicios turisticos cumplan normas de seguridad', icono: '🛡️' },
  { derecho: 'Indemnizacion', descripcion: 'Ser compensado si el servicio no cumple lo prometido', icono: '💰' },
  { derecho: 'Reclamar', descripcion: 'Presentar reclamos ante SERNAC por incumplimientos', icono: '⚖️' },
  { derecho: 'Desistimiento', descripcion: 'Anular compras online en 10 dias sin costo', icono: '↩️' },
  { derecho: 'No discriminacion', descripcion: 'Acceder a servicios sin discriminacion arbitraria', icono: '🤝' },
  { derecho: 'Privacidad', descripcion: 'Proteccion de datos personales entregados', icono: '🔒' }
];

// Glosario turistico
const GLOSARIO = [
  { termino: 'All Inclusive', definicion: 'Paquete que incluye alojamiento, comidas y bebidas' },
  { termino: 'Check-in', definicion: 'Proceso de registro al llegar al alojamiento' },
  { termino: 'Check-out', definicion: 'Proceso de salida y devolucion de habitacion' },
  { termino: 'Overbooking', definicion: 'Cuando se venden mas reservas que capacidad disponible' },
  { termino: 'Transfer', definicion: 'Servicio de traslado desde/hacia aeropuerto u hotel' },
  { termino: 'Voucher', definicion: 'Documento que acredita una reserva o servicio pagado' },
  { termino: 'Temporada alta', definicion: 'Periodo de mayor demanda turistica y precios mas altos' },
  { termino: 'Temporada baja', definicion: 'Periodo de menor demanda con precios mas economicos' },
  { termino: 'Escala', definicion: 'Parada intermedia en un vuelo antes del destino final' },
  { termino: 'Paquete turistico', definicion: 'Combinacion de servicios (vuelo, hotel, tours) vendidos juntos' },
  { termino: 'Rack rate', definicion: 'Tarifa oficial sin descuentos de un alojamiento' },
  { termino: 'Early booking', definicion: 'Descuento por reservar con anticipacion' }
];

export default function TurismoPage() {
  const [busqueda, setBusqueda] = useState('');
  const [dias, setDias] = useState('');
  const [personas, setPersonas] = useState('');
  const [tipoAlojamiento, setTipoAlojamiento] = useState('economico');
  const [destinoTipo, setDestinoTipo] = useState('');

  const oficinasFiltradas = OFICINAS.filter(oficina =>
    oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    oficina.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    oficina.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const destinosFiltrados = destinoTipo
    ? DESTINOS.filter(d => d.tipo === destinoTipo)
    : DESTINOS;

  const calcularPresupuesto = () => {
    if (!dias || !personas) return null;

    const numDias = parseInt(dias);
    const numPersonas = parseInt(personas);

    const costos = {
      economico: { alojamiento: 25000, comida: 15000, transporte: 10000, actividades: 10000 },
      moderado: { alojamiento: 60000, comida: 25000, transporte: 20000, actividades: 25000 },
      confortable: { alojamiento: 120000, comida: 40000, transporte: 35000, actividades: 50000 }
    };

    const costo = costos[tipoAlojamiento as keyof typeof costos];

    const alojamientoTotal = costo.alojamiento * numDias;
    const comidaTotal = costo.comida * numDias * numPersonas;
    const transporteTotal = costo.transporte * numDias;
    const actividadesTotal = costo.actividades * numDias * numPersonas;
    const total = alojamientoTotal + comidaTotal + transporteTotal + actividadesTotal;

    return {
      alojamiento: alojamientoTotal,
      comida: comidaTotal,
      transporte: transporteTotal,
      actividades: actividadesTotal,
      total,
      porPersona: Math.round(total / numPersonas),
      porDia: Math.round(total / numDias)
    };
  };

  const presupuesto = calcularPresupuesto();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-cyan-900 to-teal-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🏝️</span>
            <h1 className="text-4xl font-bold mb-2">Turismo</h1>
            <p className="text-sky-100">Oficinas SERNATUR, destinos, alojamiento y derechos del turista</p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🔍 16 Oficinas</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🗺️ 8 Destinos</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🧮 Calculadora Presupuesto</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Oficinas SERNATUR */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏢</span> Buscador de Oficinas SERNATUR
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <input
              type="text"
              placeholder="Buscar por region, ciudad o direccion..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg"
            />
            <p className="text-gray-400 text-sm mt-2">
              Encontradas: {oficinasFiltradas.length} oficinas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {oficinasFiltradas.map((oficina) => (
              <motion.div
                key={oficina.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <h3 className="font-bold text-white">{oficina.nombre}</h3>
                <p className="text-cyan-300 text-sm">{oficina.region}</p>
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  <p>📍 {oficina.direccion}</p>
                  <p>📞 {oficina.telefono}</p>
                  <p>🕐 {oficina.horario}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Destinos Turisticos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🗺️</span> Destinos Turisticos Populares
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setDestinoTipo('')}
              className={`px-4 py-2 rounded-full transition ${!destinoTipo ? 'bg-cyan-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            >
              Todos
            </button>
            {['Desierto', 'Montaña', 'Ciudad', 'Isla', 'Lago', 'Playa', 'Ruta'].map(tipo => (
              <button
                key={tipo}
                onClick={() => setDestinoTipo(tipo)}
                className={`px-4 py-2 rounded-full transition ${destinoTipo === tipo ? 'bg-cyan-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
              >
                {tipo}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinosFiltrados.map((destino, i) => (
              <motion.div
                key={destino.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-sky-600/30 to-cyan-600/30 rounded-xl p-5 border border-cyan-500/30"
              >
                <div className="text-4xl mb-3">{destino.icono}</div>
                <h3 className="font-bold text-white text-lg">{destino.nombre}</h3>
                <p className="text-cyan-300 text-sm">{destino.region}</p>
                <span className="inline-block px-2 py-1 bg-cyan-500/30 rounded text-xs text-cyan-200 mt-2">
                  {destino.tipo}
                </span>
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-400">Atractivos principales:</p>
                  <ul className="text-sm text-gray-300">
                    {destino.atractivos.slice(0, 3).map((a, j) => (
                      <li key={j}>• {a}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-yellow-400 mt-2">📅 {destino.mejorEpoca}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Calculadora de Presupuesto */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🧮</span> Calculadora de Presupuesto de Viaje
          </h2>

          <div className="bg-gradient-to-br from-teal-600/30 to-cyan-600/30 rounded-2xl p-6 border border-teal-500/30">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Numero de dias</label>
                <input
                  type="number"
                  value={dias}
                  onChange={(e) => setDias(e.target.value)}
                  placeholder="Ej: 5"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Numero de personas</label>
                <input
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  placeholder="Ej: 2"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Tipo de viaje</label>
                <select
                  value={tipoAlojamiento}
                  onChange={(e) => setTipoAlojamiento(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="economico" className="bg-gray-800">Economico (Hostal/Camping)</option>
                  <option value="moderado" className="bg-gray-800">Moderado (Hotel 3 estrellas)</option>
                  <option value="confortable" className="bg-gray-800">Confortable (Hotel 4-5 estrellas)</option>
                </select>
              </div>
            </div>

            {presupuesto && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Presupuesto estimado</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">🏨 Alojamiento:</span>
                      <span className="text-white font-semibold">${presupuesto.alojamiento.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">🍽️ Alimentacion:</span>
                      <span className="text-white font-semibold">${presupuesto.comida.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">🚗 Transporte:</span>
                      <span className="text-white font-semibold">${presupuesto.transporte.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">🎯 Actividades:</span>
                      <span className="text-white font-semibold">${presupuesto.actividades.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-4 text-center">
                    <p className="text-sm text-white/80">Total estimado</p>
                    <p className="text-3xl font-bold text-white">${presupuesto.total.toLocaleString()}</p>
                    <div className="flex justify-center gap-4 mt-2 text-sm text-white/80">
                      <span>${presupuesto.porPersona.toLocaleString()}/persona</span>
                      <span>${presupuesto.porDia.toLocaleString()}/dia</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">* Precios aproximados en pesos chilenos. Pueden variar segun temporada y destino.</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Tipos de Alojamiento */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏨</span> Tipos de Alojamiento
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALOJAMIENTOS.map((alojamiento, i) => (
              <motion.div
                key={alojamiento.tipo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-xl p-5"
              >
                <h3 className="text-lg font-bold text-white mb-1">{alojamiento.tipo}</h3>
                {alojamiento.estrellas !== 'N/A' && (
                  <span className="text-yellow-400 text-sm">⭐ {alojamiento.estrellas}</span>
                )}
                <p className="text-gray-300 text-sm mt-2">{alojamiento.descripcion}</p>
                <p className="text-cyan-400 font-semibold mt-3">{alojamiento.precioPromedio}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {alojamiento.servicios.map((s, j) => (
                    <span key={j} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Derechos del Turista */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>⚖️</span> Derechos del Turista
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DERECHOS.map((item, i) => (
              <motion.div
                key={item.derecho}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-sky-600/20 to-cyan-600/20 rounded-xl p-4 border border-sky-500/30"
              >
                <span className="text-3xl mb-2 block">{item.icono}</span>
                <h3 className="font-bold text-white">{item.derecho}</h3>
                <p className="text-gray-300 text-sm mt-1">{item.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tips de Viaje */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>💡</span> Tips para Viajar en Chile
          </h2>

          <div className="bg-gradient-to-r from-sky-600/20 to-cyan-600/20 rounded-2xl p-6 border border-sky-500/30">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { tip: 'Reserva con anticipacion', desc: 'En temporada alta los precios suben y la disponibilidad baja', icono: '📅' },
                { tip: 'Lleva efectivo', desc: 'En zonas rurales y pueblos pequeños no siempre hay POS', icono: '💵' },
                { tip: 'Contrata seguro de viaje', desc: 'Especialmente para actividades de aventura y zonas aisladas', icono: '🛡️' },
                { tip: 'Respeta la naturaleza', desc: 'No dejes basura, respeta senderos marcados y fauna local', icono: '🌿' },
                { tip: 'Verifica el clima', desc: 'Chile tiene climas muy diversos, prepara ropa adecuada', icono: '🌦️' },
                { tip: 'Guarda comprobantes', desc: 'Boletas y vouchers sirven para reclamos ante SERNAC', icono: '🧾' }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-2xl">{item.icono}</span>
                  <div>
                    <h4 className="font-bold text-white">{item.tip}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Glosario */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📚</span> Glosario Turistico
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
              >
                <span className="font-bold text-cyan-400">{item.termino}</span>
                <p className="text-sm text-gray-400 mt-1">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recursos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'SERNATUR', url: 'https://www.sernatur.cl', desc: 'Servicio Nacional de Turismo' },
              { nombre: 'Chile Travel', url: 'https://www.chile.travel', desc: 'Portal oficial de turismo' },
              { nombre: 'CONAF', url: 'https://www.conaf.cl', desc: 'Parques nacionales y reservas' },
              { nombre: 'SERNAC', url: 'https://www.sernac.cl', desc: 'Reclamos de consumidores' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition"
              >
                <h3 className="font-bold text-white">{recurso.nombre}</h3>
                <p className="text-sm text-gray-400">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>Turismo - Parte de <a href="https://newcool-informada.vercel.app" className="text-cyan-400 hover:underline">NewCooltura Informada</a></p>
          <p className="text-sm mt-1">Planifica tu viaje con informacion confiable</p>
        </div>
      </footer>
    </div>
  );
}
