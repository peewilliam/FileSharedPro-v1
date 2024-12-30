import { fileService } from '../../../../services/fileService.js';
import { createFileCard } from '../../../files/FileCard.js';
import { showToast } from '../../../../utils/notifications.js';

export default {
    async render(container) {
        try {
            const favoriteFiles = await fileService.getFavoriteFiles();
            
            container.innerHTML = `
                <div class="section-header mb-4">
                    <h4>Arquivos Favoritos</h4>
                    <p class="text-secondary mb-0">Seus arquivos marcados como favoritos</p>
                </div>

                ${favoriteFiles.length > 0 ? `
                    <div class="files-grid">
                        ${favoriteFiles.map(file => createFileCard(file)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-star"></i>
                        </div>
                        <h5>Nenhum arquivo favorito</h5>
                        <p class="text-secondary">Marque arquivos como favoritos para acesso rápido</p>
                    </div>
                `}
            `;
        } catch (error) {
            showToast('Erro ao carregar arquivos favoritos', 'error');
        }
    }
};