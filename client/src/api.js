const API_URL = process.env.REACT_APP_API_URL

export default async function getImages(nextCursor) {
  const params = new URLSearchParams();

  if (nextCursor) {
    params.append('next_cursor', nextCursor);
  }

  const response = await fetch(`${API_URL}/photos?${params}`);
  const responseJson = await response.json();

  return responseJson
}
