export const mcpInstance = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const authToken = process.env.API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(authToken && { Authorization: `Token ${authToken}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
