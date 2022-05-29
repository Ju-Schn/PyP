const API_URL = process.env.REACT_APP_API_URL;

export async function getImages(nextCursor) {
  const params = new URLSearchParams();

  if (nextCursor) {
    params.append('next_cursor', nextCursor);
  }

  const response = await fetch(`${API_URL}/photos?${params}`);
  const responseJson = await response.json();

  return responseJson;
}

export async function getTags() {
  const params = new URLSearchParams();
  const response = await fetch(`${API_URL}/tags?${params}`);
  const responseJson = await response.json();

  return responseJson;
}

export async function searchImages(selectedTag, nextCursor) {
  const params = new URLSearchParams();
  params.append('expression', selectedTag);

  if (nextCursor) {
    params.append('next_cursor', nextCursor);
  }

  const response = await fetch(`${API_URL}/search?${params}`);
  const responseJson = await response.json();

  return responseJson;
}
