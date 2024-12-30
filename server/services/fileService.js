import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILES_PATH = path.join(__dirname, '../data/files.json');

class FileService {
  async readFiles() {
    const data = await fs.readFile(FILES_PATH, 'utf8');
    return JSON.parse(data).files;
  }

  async writeFiles(files) {
    await fs.writeFile(FILES_PATH, JSON.stringify({ files }, null, 2));
  }

  async getFiles(userId) {
    const files = await this.readFiles();
    return files.filter(file => 
      file.userId === userId && !file.deleted
    );
  }

  async getSharedFiles(userId) {
    const files = await this.readFiles();
    return files.filter(file => 
      file.userId === userId && file.shared && !file.deleted
    );
  }

  async getRecentFiles(userId) {
    const files = await this.readFiles();
    return files
      .filter(file => file.userId === userId && !file.deleted)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }

  async getFavoriteFiles(userId) {
    const files = await this.readFiles();
    return files.filter(file => 
      file.userId === userId && file.favorite && !file.deleted
    );
  }

  async getTrashedFiles(userId) {
    const files = await this.readFiles();
    return files.filter(file => 
      file.userId === userId && file.deleted
    );
  }

  // Outros métodos existentes...
}

export const fileService = new FileService();