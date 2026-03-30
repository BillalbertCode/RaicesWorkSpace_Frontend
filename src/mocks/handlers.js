// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { MOCK_ARTICLES, MOCK_USERS } from './db';

// Intentamos obtener la URL de la API de las variables de entorno, 
// o usamos un fallback si no está definida.
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const handlers = [
  // 1. Obtener todos los artículos (con paginación simulada)
  http.get(`${API_URL}/article/all`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedArticles = MOCK_ARTICLES.slice(start, end);

    if (paginatedArticles.length === 0 && page > 1) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(paginatedArticles);
  }),

  // 2. Obtener datos de un usuario específico
  http.get(`${API_URL}/user/:id`, ({ params }) => {
    const { id } = params;
    const user = MOCK_USERS[id];

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // 3. Obtener artículos de un usuario específico
  http.get(`${API_URL}/article/user/:id`, ({ params }) => {
    const { id } = params;
    const userArticles = MOCK_ARTICLES.filter(art => art.author._id === id);

    if (userArticles.length === 0) {
      return new HttpResponse([], { status: 200 }); // O 404 según tu lógica actual
    }

    return HttpResponse.json(userArticles);
  }),

  // 4. Simulación de Login (para que no de error al intentar entrar)
  http.post(`${API_URL}/login`, async () => {
    return HttpResponse.json({
      token: "mock-token-12345",
      user: MOCK_USERS["user-1"]
    });
  }),
];
