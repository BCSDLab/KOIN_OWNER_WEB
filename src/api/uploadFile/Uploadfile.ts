import { accessClient } from 'api';

export const uploadFile = (formData: FormData) => accessClient.post('/OWNERS/upload/file', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}).catch((error) => Promise.reject(error));

export const uploadFiles = (formData: FormData) => accessClient.post('/OWNERS/upload/files', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
