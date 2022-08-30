const BASE_URL = 'https://dn08k7u8uf.execute-api.us-west-2.amazonaws.com';

const IS_DEV = process.env.NODE_ENV === 'development';

function getRequestUrl(url: string) {
  return IS_DEV ? url : url.replace('/wapi', BASE_URL);
}

const api = {
  get: <T = any>(url: string): Promise<T> => {
    return new Promise((resolve, rej) => {
      fetch(getRequestUrl(url), {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          rej(err);
        });
    })
  },
  put: <T = any>(url: string, body: T) => {
    return new Promise((resolve, rej) => {
      fetch(getRequestUrl(url), {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          rej(err);
        });
    })
  },
};

export default api;