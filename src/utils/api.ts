

const api = {
  get: <T = any>(url: string): Promise<T> => {
    return new Promise((resolve, rej) => {
      fetch(url, {
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
      fetch(url, {
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