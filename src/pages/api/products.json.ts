import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const categoria = url.searchParams.get('categoria');
    const tag = url.searchParams.get('tag');
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const perPage = parseInt(url.searchParams.get('perPage') || '12', 10) || 12;

    const ENDPOINT = 'https://cursosdeestetica.cl/graphql';
    const query = `query AllProducts { products(first: 500, where: {status: \"publish\"}) { nodes { name slug shortDescription image { sourceUrl altText } productCategories { nodes { slug name } } productTags { nodes { slug name } } } } }`;

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    let products = json?.data?.products?.nodes ?? [];

    if (categoria) {
      products = products.filter((p: any) => (p.productCategories?.nodes || []).some((c: any) => c.slug === categoria));
    }
    if (tag) {
      products = products.filter((p: any) => (p.productTags?.nodes || []).some((t: any) => t.slug === tag));
    }

    const total = products.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    const pageItems = products.slice(start, start + perPage);

    return new Response(JSON.stringify({ products: pageItems, page, perPage, total, totalPages }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ products: [], error: String(err) }), { headers: { 'Content-Type': 'application/json' }, status: 500 });
  }
};
