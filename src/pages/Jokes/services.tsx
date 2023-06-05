
import { request } from '@@/plugin-request';

console.log(API_DOMAIN)


export async function queryJokes(params: any) {
  return request(API_DOMAIN + 'jokes', {
    params: {
      ...params,
    },
  }).then((res: any) => {
    return {
      data: res?.data,
      total: res?.totalCount,
    };
  });
}


export async function queryJoke(id: number, params: any) {
  return request(API_DOMAIN + `jokes/${id}`, {
    params: {
      ...params,
    },
  }).then((res: any) => {
    return {
      data: res?.data,
      total: res?.totalCount,
    };
  });
}


export async function updateJoke(id: number, body: any) {
  return request(API_DOMAIN + `jokes/${id}`, {
    method: 'PUT',
    data: body,
  });
}

export async function deleteJoke(id: number) {
  return request(API_DOMAIN + `jokes/${id}`, {
    method: 'DELETE',
  });
}

export async function addJoke(id: number, body: any) {
  return request(API_DOMAIN + `jokes`, {
    method: 'POST',
    data: body,
  });
}