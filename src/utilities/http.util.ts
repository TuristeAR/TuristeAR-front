import status from 'http-status';

export const get = async (url: string, headers: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    });

    return await response.json();
  } catch (error) {
    return {
      error: error,
      status: status.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getWithoutCredentials = async (url: string, headers: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    return await response.json();
  } catch (error) {
    return {
      error: error,
      status: status.INTERNAL_SERVER_ERROR,
    };
  }
};

export const post = async (url: string, headers: any, body?: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });

    return await response.json();
  } catch (error) {
    return {
      error: error,
      status: status.INTERNAL_SERVER_ERROR,
    };
  }
};
