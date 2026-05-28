import type { APIRequestContext } from '@playwright/test';

export const API_BASE = 'https://jsonplaceholder.typicode.com';

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type CreatePostPayload = {
    userId: number;
    title: string;
    body: string;
};

export type UpdatePostPayload = Post;

export class ApiHelper {
    constructor(private readonly request: APIRequestContext) {}

    getPost(id: number) {
        return this.request.get(`${API_BASE}/posts/${id}`);
    }

    createPost(payload: CreatePostPayload) {
        return this.request.post(`${API_BASE}/posts`, {
            data: payload,
        });
    }

    updatePost(id: number, payload: UpdatePostPayload) {
        return this.request.put(`${API_BASE}/posts/${id}`, {
            data: payload,
        });
    }

    patchPost(id: number, payload: Partial<CreatePostPayload>) {
        return this.request.patch(`${API_BASE}/posts/${id}`, {
            data: payload,
        });
    }

    deletePost(id: number) {
        return this.request.delete(`${API_BASE}/posts/${id}`);
    }
}
