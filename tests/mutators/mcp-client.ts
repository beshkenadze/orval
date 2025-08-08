export type ErrorType = { message: string };
export type BodyType = unknown;

export async function mcpInstance<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  } as Record<string, string>;

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err: ErrorType = { message: `HTTP ${res.status}` };
    throw err as any;
  }

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

