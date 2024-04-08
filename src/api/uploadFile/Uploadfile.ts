import { accessClient } from 'api';

interface File {
  content_length: number;
  content_type: string;
  file_name: string;
}

export interface FileResponse {
  pre_signed_url: string;
  file_name: string;
  expiration_date: string;
}

export const uploadFile = (formData: FormData) => accessClient.post('/OWNERS/upload/file', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
}).catch((error) => Promise.reject(error));

export const uploadFiles = (formData: FormData) => accessClient.post('/OWNERS/upload/files', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getCoopUrl = (fileName: File) => accessClient.post<FileResponse>('/coop/upload/url', fileName);
