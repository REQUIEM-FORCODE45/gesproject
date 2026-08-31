/**
 * SEED DE RECONOCIMIENTO (solo llena la base; NO modifica codigo de la app)
 * Carga .env + modelos mongoose de la app y agrega:
 *  - 2 usuarios demo
 *  - 2 proyectos completos (vigtecs) con colabs, referents, artState/problems/reg_users/values y tree
 * No borra nada: conserva sigma, tu admin, etc.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const vigTec = require('../models/vigTecModel');

const MONGO_URI = (process.env.MONGO_URI || '') + '/test';

const DEMO_USERS = [
  {
    username: 'analista',
    email: 'colab@cidtca.com',
    password: 'Analista2026!',
    role: 'admin',
    name: 'María',
    last_name: 'Analista',
    identification_type: 'Cédula de ciudadanía',
    identification_document: '1023456789',
    phone: '3001234567',
    address: 'Bogotá D.C.',
  },
  {
    username: 'invitado',
    email: 'invitado@cidtca.com',
    password: 'Invitado2026!',
    role: 'user',
    name: 'Carlos',
    last_name: 'Invitado',
    identification_type: 'Cédula de ciudadanía',
    identification_document: '987654321',
    phone: '3119876543',
    address: 'Medellín',
  },
];

function makeAuthors(names) {
  return names.map(n => {
    const [name, lastname] = n.split(' ');
    return { name, lastname };
  });
}

/**
 * Crea un arbol (tree) con la estructura que esperan tree.ejs / matriz.ejs / cadena-valor.ejs
 */
function makeTree(problemIds, centralProblem, causas, efectos) {
  return {
    problem_tree: {
      central_problem: centralProblem,
      efectos,
      causas,
    },
    objetivos: {
      obj_central: 'Incrementar la capacidad institucional para ' + centralProblem.description.toLowerCase(),
      objs_especificos: problemIds.map((id, i) => ({
        id_problem: id.toString(),
        objetivo: 'Objetivo específico ' + (i + 1) + ' orientado a transformar la causa del problema central',
        actividades: [
          {
            actividad: 'Elaborar informe técnico de la línea base del objetivo ' + (i + 1),
            producto: 'Informes técnicos',
            verif: 'Informe técnico con corte trimestral remitido a la dirección del proyecto.',
          },
          {
            actividad: 'Realizar taller de socialización del objetivo ' + (i + 1),
            producto: 'Eventos científicos',
            verif: 'Registro de asistencia y listados de los talleres realizados.',
          },
        ],
      })),
    },
  };
}

/**
 * Crea problemas con _id explicito para poder referenciarlos en values y en objetivos
 */
function makeProblems(titles) {
  return titles.map((t, i) => {
    const id = new mongoose.Types.ObjectId();
    return {
      _id: id,
      title: t,
      description: 'Descripción del problema: ' + t,
      sigla: 'P' + (i + 1),
      reg_users: [],
    };
  });
}

function makeRegUser(user, problems) {
  return {
    user_id: user._id.toString(),
    user_name: user.username,
    user_email: user.email,
    values: problems.map((p, i) => ({
      id_problem_col: p._id.toString(),
      value: String(((i + user.matrixBias) % 4)), // 0..3
    })),
  };
}

function makeColab(user, perms) {
  return {
    user_id: user._id.toString(),
    user_name: user.username,
    user_email: user.email,
    permissions: perms,
  };
}

function makeReferent(o) {
  return Object.assign(
    {
      doc_type: 'Artículo científico',
      doc_title: 'Título del documento referente',
      doc_area_tema: 'Área temática del referente',
      abstract: 'Resumen del documento referente para vigilancia tecnológica.',
      year_publication: '2022',
      authors: makeAuthors(['Autor Uno', 'Autora Dos', 'Autor Tres']),
      file_name: '',
      country_publication: 'Colombia',
      keywords: ['referente', 'tecnología', 'innovación'],
      institution_entity: 'Institución de origen',
      indexing: 'Scopus',
      categorization: 'A1',
      doc_URL: 'https://doi.org/ejemplo-ref',
      DOI: '10.1000/ejemplo-ref',
      ISDN_ISBN: '978-958-000-000-0',
    },
    o
  );
}

async function createUserIfMissing(u) {
  let user = await User.findOne({ email: u.email });
  if (user) {
    console.log('  [user] ya existe:', u.email);
    return user;
  }
  user = new User({
    username: u.username,
    email: u.email,
    password: await bcrypt.hash(u.password, 12),
    name: u.name,
    last_name: u.last_name,
    identification_type: u.identification_type,
    identification_document: u.identification_document,
    phone: u.phone,
    address: u.address,
    state: 'active',
    rol: u.role,
  });
  await user.save();
  console.log('  [user] creado:', u.email, '| rol:', u.role);
  return user;
}

async function seedProject({ title, area, keywords, sector, poblacion, creator, colabs, referents, artState, tree }) {
  const exists = await vigTec.findOne({ title_ficha: title });
  if (exists) {
    console.log('  [vigTec] ya existe:', title);
    return exists;
  }
  const vt = new vigTec({
    title_ficha: title,
    area_tema: area,
    keywords,
    sector,
    poblacion,
    creator: creator._id,
    colabs,
    referents,
    artState,
    tree,
  });
  await vt.save();
  console.log(
    '  [vigTec] creado:',
    title,
    '| id:',
    vt._id.toString(),
    '| colabs:',
    vt.colabs.length,
    '| referents:',
    vt.referents.length,
    '| artState:',
    vt.artState.length,
    '| tree:',
    vt.tree.length
  );
  return vt;
}

(async () => {
  await mongoose.connect(MONGO_URI);
  console.log('CONECTADO ->', MONGO_URI);

  const admin = await User.findOne({ email: 'admin@cidtca.com' });
  if (!admin) throw new Error('No existe el admin admin@cidtca.com: ejecuta primero la creacion del admin');
  console.log('[admin]', admin.email, '| id:', admin._id.toString());

  console.log('-- Usuarios demo --');
  const created = {};
  for (const u of DEMO_USERS) {
    created[u.email] = await createUserIfMissing(u);
  }
  const colab = created['colab@cidtca.com'];
  const invitado = created['invitado@cidtca.com'];

  console.log('-- Proyectos demo --');

  // Proyecto 1: IA en salud
  const p1problems = makeProblems([
    'Baja cobertura de diagnóstico temprano',
    'Alta dependencia de especialistas humanos',
    'Errores de diagnóstico por fatiga',
  ]);
  p1problems[0].reg_users.push(makeRegUser({ ...colab.toObject(), matrixBias: 1 }, p1problems));
  p1problems[0].reg_users.push(makeRegUser({ ...invitado.toObject(), matrixBias: 2 }, p1problems));
  p1problems[1].reg_users.push(makeRegUser({ ...colab.toObject(), matrixBias: 2 }, p1problems));
  p1problems[2].reg_users.push(makeRegUser({ ...colab.toObject(), matrixBias: 3 }, p1problems));
  p1problems[2].reg_users.push(makeRegUser({ ...invitado.toObject(), matrixBias: 3 }, p1problems));

  const tree1 = makeTree(
    p1problems.map(p => p._id),
    { title: 'Sistemas de diagnóstico automatizado limitados', description: 'La región carece de herramientas de IA para diagnóstico temprano oportuno' },
    [
      {
        index: 1,
        title: 'Escasez de datos clínicos etiquetados',
        description: 'No hay repositorios clínicos suficientes para entrenar modelos',
        causas_indirectas: [
          { title: 'Falta de estandarización de historias clínicas', description: 'Sin formato común entre IPS' },
          { title: 'Baja inversión en infraestructura de datos', description: 'Pocos recursos destinados a plataformas' },
        ],
      },
      {
        index: 2,
        title: 'Poco talento formado en IA aplicada a salud',
        description: 'Programas académicos insuficientes',
        causas_indirectas: [
          { title: 'Ausencia de currículos especializados', description: 'No hay oferta formativa regional', tercer_orden: [{ title: 'Faltan docentes certificados', description: 'Déficit de formadores' }] },
        ],
      },
    ],
    [
      { title: 'Aumento de morbilidad evitable', description: 'Diagnósticos tardíos incrementan complicaciones' },
      { title: 'Sobrecarga del sistema de salud', description: 'Mayores costos de atención' },
    ]
  );

  await seedProject({
    title: 'IA en Salud: Sistemas de Diagnóstico Automatizado',
    area: 'Inteligencia Artificial',
    keywords: ['IA', 'diagnóstico', 'salud', 'machine learning'],
    sector: 'Salud',
    poblacion: 'Urbana y Rural',
    creator: admin,
    colabs: [
      makeColab(colab, { write: true, update: true, delete: false, state: 'Active' }),
      makeColab(invitado, { write: false, update: false, delete: false, state: 'block' }),
    ],
    referents: [
      makeReferent({
        doc_type: 'Artículo científico',
        doc_title: 'Deep learning para diagnóstico de retinopatía diabética',
        doc_area_tema: 'Radiología / IA',
        abstract: 'Estudio multicéntrico sobre redes convolucionales para detección temprana.',
        year_publication: '2021',
        authors: makeAuthors(['Juan Pérez', 'Lucía Gómez']),
        country_publication: 'EE. UU.',
        keywords: ['deep learning', 'retinopatía', 'diagnóstico'],
        indexing: 'Science Citation Index',
        categorization: 'A1',
        DOI: '10.1016/j.med.2021.01.001',
        doc_URL: 'https://pubmed.example/retinopatia',
      }),
      makeReferent({
        doc_type: 'Informe',
        doc_title: 'Estado del arte de la IA en servicios de salud en Latinoamérica',
        doc_area_tema: 'Políticas públicas',
        abstract: 'Informe regional sobre adopción de herramientas de IA en sistemas de salud.',
        year_publication: '2020',
        authors: makeAuthors(['Ana Torres']),
        country_publication: 'Colombia',
        keywords: ['IA', 'salud', 'política'],
        institution_entity: 'Ministerio de Salud',
        doc_URL: 'https://minsalud.example/informe-ia',
      }),
    ],
    artState: [
      {
        resumen: 'Resumen del estado del arte sobre sistemas de diagnóstico por IA en la región.',
        observaciones: 'Se observan barreras regulatorias y de datos para la adopción.',
        description: 'Descripción propia del análisis: la madurez tecnológica es media-baja.',
        conclusiones: 'Se concluye que existe oportunidad de implementar pilotos en primera línea.',
        extra_camps: [{ title: 'Madurez tecnológica', description: 'TRL 4-5 en la región' }],
        problems: p1problems,
      },
    ],
    tree: [tree1],
  });

  // Proyecto 2: Agricultura de precisión
  const p2problems = makeProblems([
    'Bajo rendimiento de cultivos por manejo homogéneo',
    'Uso ineficiente de agua y fertilizantes',
  ]);
  p2problems[0].reg_users.push(makeRegUser({ ...invitado.toObject(), matrixBias: 1 }, p2problems));
  p2problems[1].reg_users.push(makeRegUser({ ...colab.toObject(), matrixBias: 2 }, p2problems));

  const tree2 = makeTree(
    p2problems.map(p => p._id),
    { title: 'Agricultura de precisión poco adoptada', description: 'La producción agropecuaria no usa tecnología de precisión' },
    [
      {
        index: 1,
        title: 'Alto costo de sensores y drones',
        description: 'La tecnología es costosa para pequeños productores',
        causas_indirectas: [
          { title: 'Dependencia de importaciones', description: 'No hay fabricación local de sensores' },
        ],
      },
      {
        index: 2,
        title: 'Falta de conectividad rural',
        description: 'Zonas productivas sin acceso a internet confiable',
        causas_indirectas: [
          { title: 'Baja cobertura de redes móviles', description: 'Infraestructura insuficiente', tercer_orden: [{ title: 'Falta inversión privada', description: 'Sin incentivos' }] },
        ],
      },
    ],
    [
      { title: 'Pérdidas económicas en el sector', description: 'Menor competitividad internacional' },
    ]
  );

  await seedProject({
    title: 'Agricultura de Precisión para Pequeños Productores',
    area: 'Agroindustria',
    keywords: ['drones', 'sensores', 'agricultura', 'riego'],
    sector: 'Agropecuario',
    poblacion: 'Rural',
    creator: admin,
    colabs: [
      makeColab(colab, { write: true, update: true, delete: true, state: 'Active' }),
      makeColab(invitado, { write: false, update: true, delete: false, state: 'Active' }),
    ],
    referents: [
      makeReferent({
        doc_type: 'Tesis',
        doc_title: 'Detección de estrés hídrico con imágenes multiespectrales',
        doc_area_tema: 'Teledetección',
        abstract: 'Uso de índices de vegetación para optimizar el riego en cultivos de papa.',
        year_publication: '2023',
        authors: makeAuthors(['Pedro Ramírez', 'Sofía López']),
        country_publication: 'Colombia',
        keywords: ['teledetección', 'riego', 'papa'],
        institution_entity: 'Universidad Nacional',
      }),
      makeReferent({
        doc_type: 'Capítulo de libro',
        doc_title: 'Tecnologías IoT para agricultura de precisión',
        doc_area_tema: 'IoT',
        abstract: 'Revisión de arquitecturas de sensores de bajo costo para monitoreo de suelo.',
        year_publication: '2021',
        authors: makeAuthors(['Diana Ruiz']),
        DOI: '10.1000/iot-agro',
        doc_URL: 'https://springer.example/iot-agro',
      }),
    ],
    artState: [
      {
        resumen: 'Resumen del estado del arte sobre agricultura de precisión en el trópico.',
        observaciones: 'Brecha importante entre desarrollos de laboratorio y adopción en campo.',
        description: 'Análisis propio: el costo de las soluciones es la principal barrera.',
        conclusiones: 'Se requiere un portafolio de soluciones de bajo costo y asistencia técnica.',
        extra_camps: [],
        problems: p2problems,
      },
    ],
    tree: [tree2],
  });

  console.log('-- RESUMEN --');
  console.log('Cantidad de proyectos (vigtecs):', await vigTec.countDocuments());
  console.log('Cantidad de usuarios:', await User.countDocuments());
  console.log('PASSWORDS DEMO: colab@cidtca.com/Analista2026!  invitado@cidtca.com/Invitado2026!');

  await mongoose.disconnect();
  console.log('DONE');
})().catch(e => {
  console.error('ERROR SEED:', e);
  process.exit(1);
});
