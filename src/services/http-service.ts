import apiClient from "./api-client";

interface Entity {
  id: string;
}

class HttpService {
  endpoints: string;

  constructor(endpoints: string) {
    this.endpoints = endpoints;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoints, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  Delete(id: string) {
    return apiClient.delete(`${this.endpoints}/${id}`);
  }

  Add<T>(entity: T) {
    return apiClient.post(this.endpoints, entity);
  }

  Update<T extends Entity>(entity: T) {
    return apiClient.put(`${this.endpoints}/${entity.id}`, entity);
  }
}

const create = (endpoints: string) => new HttpService(endpoints);

export default create;
