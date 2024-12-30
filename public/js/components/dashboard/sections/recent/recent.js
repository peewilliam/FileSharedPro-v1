import { fileService } from '../../../../services/fileService.js';
import { createFileCard } from '../../../files/FileCard.js';
import { showToast } from '../../../../utils/notifications.js';

export default {
    async render(container) {
        try {
            const recentFiles = await fileService.getRecentFiles();
            
            container.innerHTML = `
                <div class="section-header mb-4">
                    <h4>Arquivos Recentes</h4>
                    <p class="text-secondary mb-0">Seus arquivos mais recentes</p>
                </div>

                ${recentFiles.length > 0 ? `
                    <div class="files-grid">
                        ${recentFiles.map(file => createFileCard(file)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-clock-history"></i>
                        </div>
                        <h5>Nenhum arquivo recente</h5>
                        <p class="text-secondary">Seus arquivos recentes aparecerão aqui</p>
                    </div>
                `}
            `;
        } catch (error) {
            showToast('Erro ao carregar arquivos recentes', 'error');
        }
    }
};