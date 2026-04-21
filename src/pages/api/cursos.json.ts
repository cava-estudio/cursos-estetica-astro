import type { APIRoute } from 'astro';
import { courses } from '../../data/cursos';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Construct URL using host as base to ensure searchParams are parsed correctly
    const host = request.headers.get('host') || 'localhost';
    const url = new URL(request.url, `http://${host}`);
    const categoria = url.searchParams.get('categoria');
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const perPage = parseInt(url.searchParams.get('perPage') || '12', 10) || 12;

    let filtered = courses.slice();
    // Incoming request parsed
    if (categoria) {
      const catClean = String(categoria).toLowerCase().trim();
      filtered = filtered.filter((c) => {
        if (!Array.isArray(c.categories)) return false;
        const normalized = c.categories.map((s) => String(s).toLowerCase().trim());
        // exact match or partial match (in case dataset stores names)
        return normalized.includes(catClean) || normalized.some((s) => s.includes(catClean));
      });
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);

    return new Response(JSON.stringify({ products: pageItems, total, totalPages, page }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // CDN-friendly cache headers; adjust as needed
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ products: [], error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const categoria = body.categoria || null;
    const page = parseInt(body.page || body.p || '1', 10) || 1;
    const perPage = parseInt(body.perPage || body.per_page || '12', 10) || 12;

    let filtered = courses.slice();
    if (categoria) {
      const catClean = String(categoria).toLowerCase().trim();
      filtered = filtered.filter((c) => {
        if (!Array.isArray(c.categories)) return false;
        const normalized = c.categories.map((s) => String(s).toLowerCase().trim());
        return normalized.includes(catClean) || normalized.some((s) => s.includes(catClean));
      });
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    const pageItems = filtered.slice(start, start + perPage);

    return new Response(JSON.stringify({ products: pageItems, total, totalPages, page }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ products: [], error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
  }
};
