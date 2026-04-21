import type { APIRoute } from 'astro';
import { courses } from '../../../data/cursos';

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const categoria = url.searchParams.get('categoria');
    const exclude = url.searchParams.get('exclude');
    const perPage = parseInt(url.searchParams.get('perPage') || '6', 10) || 6;

    let filtered = courses.slice();
    if (categoria) filtered = filtered.filter((c) => Array.isArray(c.categories) && c.categories.includes(categoria));
    if (exclude) filtered = filtered.filter((c) => c.slug !== exclude);

    const items = filtered.slice(0, perPage);

    // Build HTML fragment using the same structure/styles as CourseCard
    const html = items
      .map((c) => {
        const img = c.image ? `<div class="media"><img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.title)}"></div>` : `<div class="media"><div class="img-placeholder"></div></div>`;
        const title = `<h3>${escapeHtml(c.title)}</h3>`;
        const desc = `<p class="muted">${escapeHtml((c.description || '').replace(/(<([^>]+)>)/gi, '').slice(0, 120))}</p>`;
        const href = escapeHtml(c.href || `/producto/${c.slug}`);
        return `<a class="card course-card" href="${href}">${img}${title}${desc}</a>`;
      })
      .join('');

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return new Response('', { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
};
