// Runs automatically every time someone submits a Netlify form (contact or va-score).
// If you set CRM_WEBHOOK_URL in Netlify (Site configuration → Environment variables),
// the lead is forwarded to your GoHighLevel inbound webhook or n8n Webhook node.
export default async (req) => {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return new Response('No CRM_WEBHOOK_URL set; skipped', { status: 200 });
  try {
    const { payload } = await req.json();
    const d = payload?.data || {};
    const body = {
      source: 'portfolio-website',
      form: payload?.form_name,
      submitted_at: payload?.created_at,
      name: d.name || '',
      first_name: (d.name || '').split(' ')[0] || '',
      email: d.email || '',
      phone: d.phone || '',
      business_type: d['business-type'] || '',
      interests: d.interests || '',
      budget: d.budget || '',
      message: d.message || '',
      va_score: d.score || '',
      va_tier: d.tier || '',
      va_top_leaks: d['top-leaks'] || '',
      va_answers: d.answers || '',
      page: payload?.site_url || '',
    };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    return new Response(`Forwarded to CRM (${res.status})`, { status: 200 });
  } catch (err) {
    console.error('CRM forward failed', err);
    return new Response('CRM forward failed', { status: 200 }); // never block the form
  }
};
