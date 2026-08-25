import { createHmac, randomUUID } from 'node:crypto';

const secret = process.env.LUNORUN_SCORE_SECRET || 'change-me-in-production';

export async function POST() {
  const issuedAt = Date.now();
  const runId = randomUUID();
  const payload = `${runId}.${issuedAt}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return Response.json({ token: `${payload}.${sig}`, issuedAt });
}
