import { httpClient } from './api/httpClient.js';
import { showToast } from '../utils/notifications.js';

class FileService {
    constructor() {
        this.baseURL = '/api/files';
    }

    async getFiles() {
        try {
            const { data } = await httpClient.get(this.baseURL);
            return data;
        } catch (error) {
            showToast('Erro ao carregar arquivos', 'error');
            return [];
        }
    }

    async getSharedFiles() {
        try {
            const { data } = await httpClient.get(`${this.baseURL}/shared`);
            return data;
        } catch (error) {
            showToast('Erro ao carregar arquivos compartilhados', 'error');
            return [];
        }
    }

    async getRecentFiles() {
        try {
            const { data } = await httpClient.get(`${this.baseURL}/recent`);
            return data;
        } catch (error) {
            showToast('Erro ao carregar arquivos recentes', 'error');
            return [];
        }
    }

    async getFavoriteFiles() {
        try {
            const { data } = await httpClient.get(`${this.baseURL}/favorites`);
            return data;
        } catch (error) {
            showToast('Erro ao carregar arquivos favoritos', 'error');
            return [];
        }
    }

    async getTrashedFiles() {
        try {
            const { data } = await httpClient.get(`${this.baseURL}/trash`);
            return data;
        } catch (error) {
            showToast('Erro ao carregar arquivos da lixeira', 'error');
            return [];
        }
    }

    // Outros métodos existentes...
}

export const fileService = new FileService();