import { createHmac, timingSafeEqual } from 'node:crypto';

const secret = process.env.LUNORUN_SCORE_SECRET || 'change-me-in-production';
const maxDistancePerMs = 0.00092; // conservative cap for anti-cheat validation

function verifyToken(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [runId, issuedAtRaw, sig] = parts;
  const issuedAt = Number(issuedAtRaw);
  if (!runId || !Number.isFinite(issuedAt)) return null;
  const payload = `${runId}.${issuedAt}`;
  const expected = createHmac('sha256', secret).update(payload).digest('hex');
  if (sig.length !== expected.length) return null;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  return { issuedAt };
}

function cleanName(input: unknown) {
  const name = String(input ?? '').trim().replace(/[^a-zA-Z0-9 _-]/g, '').slice(0, 18);
  return name || 'PLAYER';
}

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const url = `${process.env.SUPABASE_URL}${path}`;
  return fetch(url, {
    ...init,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });
}

export async function GET() {
  if (!hasSupabase()) return Response.json({ leaderboard: [] });
  const res = await supabaseFetch('/rest/v1/lunorun_scores?select=nickname,distance&order=distance.desc&limit=10');
  if (!res.ok) return Response.json({ leaderboard: [] }, { status: 200 });
  const rows = await res.json();
  return Response.json({ leaderboard: rows.map((row: { nickname: string; distance: number }, i: number) => ({ ...row, rank: i + 1 })) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname = cleanName(body?.nickname);
    const distance = Math.floor(Number(body?.distance));
    const token = String(body?.token || '');
    const session = verifyToken(token);

    if (!session || !Number.isFinite(distance) || distance < 1) {
      return Response.json({ error: 'Invalid score.' }, { status: 400 });
    }

    const elapsed = Math.max(1000, Date.now() - session.issuedAt);
    if (distance > elapsed * maxDistancePerMs + 250) {
      return Response.json({ error: 'Score rejected.' }, { status: 400 });
    }

    if (!hasSupabase()) return Response.json({ ok: true, stored: false });

    const insert = await supabaseFetch('/rest/v1/lunorun_scores', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ nickname, distance }),
    });

    if (!insert.ok) return Response.json({ error: 'Leaderboard unavailable.' }, { status: 503 });
    return Response.json({ ok: true, stored: true });
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
