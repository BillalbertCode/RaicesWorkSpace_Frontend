// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { MOCK_ARTICLES, MOCK_USERS } from './db';

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

  // 2. Obtener datos de perfil de un usuario específico (para visitas externas)
  http.get(`${API_URL}/user/profile/:id`, ({ params }) => {
    const { id } = params;
    const user = MOCK_USERS[id];

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // 3. Obtener el perfil del usuario logueado (simulación para el home)
  http.get(`${API_URL}/user/profile/`, () => {
    return HttpResponse.json(MOCK_USERS["user-1"]);
  }),

  // 4. Obtener artículos de un usuario específico (con paginación)
  http.get(`${API_URL}/article/user/:id`, ({ params, request }) => {
    const { id } = params;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    const userArticles = MOCK_ARTICLES.filter(art => art.author._id === id);
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedArticles = userArticles.slice(start, end);

    if (paginatedArticles.length === 0 && page > 1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    // Si no tiene artículos en absoluto
    if (userArticles.length === 0) {
        return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(paginatedArticles);
  }),

  // 5. Simulación de Login (endpoint real: /user/login)
  http.post(`${API_URL}/user/login`, async ({ request }) => {
    const body = await request.json();
    console.log('Login mock interceptado para:', body.email);
    
    // Devolvemos el objeto que TokenContext.js espera para loginInit
    return HttpResponse.json({
      login: true,
      id: "user-1",
      token: "mock-jwt-token-raices-workspace-12345",
      user: MOCK_USERS["user-1"]
    });
  }),
];
