import express from 'express';
import { fileService } from '../services/fileService.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

// Listar todos os arquivos do usuário
router.get('/', async (req, res) => {
  try {
    const files = await fileService.getFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter arquivos compartilhados
router.get('/shared', async (req, res) => {
  try {
    const files = await fileService.getSharedFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter arquivos recentes
router.get('/recent', async (req, res) => {
  try {
    const files = await fileService.getRecentFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter arquivos favoritos
router.get('/favorites', async (req, res) => {
  try {
    const files = await fileService.getFavoriteFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter arquivos da lixeira
router.get('/trash', async (req, res) => {
  try {
    const files = await fileService.getTrashedFiles(req.user.id);
    res.json({ data: files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Outras rotas existentes...

export default router;