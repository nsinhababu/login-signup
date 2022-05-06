const BASE_URL = 'http://139.59.7.189:49154/v1/';
export const fetchData = async (url, obj) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'content type': 'application json' },
      body: JSON.stringify(obj),
    });
  } catch (e) {
    response = e;
  }
  return response;
};
