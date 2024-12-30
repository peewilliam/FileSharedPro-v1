import { fileService } from '../../../../services/fileService.js';
import { createFileCard } from '../../../files/FileCard.js';
import { showToast } from '../../../../utils/notifications.js';

export default {
    async render(container) {
        try {
            const trashedFiles = await fileService.getTrashedFiles();
            
            container.innerHTML = `
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4>Lixeira</h4>
                        <p class="text-secondary mb-0">Arquivos excluídos nos últimos 30 dias</p>
                    </div>
                    ${trashedFiles.length > 0 ? `
                        <button class="btn btn-danger" id="emptyTrashBtn">
                            <i class="bi bi-trash me-2"></i>Esvaziar Lixeira
                        </button>
                    ` : ''}
                </div>

                ${trashedFiles.length > 0 ? `
                    <div class="alert alert-warning">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Os arquivos serão permanentemente excluídos após 30 dias
                    </div>

                    <div class="files-grid">
                        ${trashedFiles.map(file => createFileCard({
                            ...file,
                            actions: ['restore', 'delete']
                        })).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-trash"></i>
                        </div>
                        <h5>Lixeira Vazia</h5>
                        <p class="text-secondary">Não há arquivos na lixeira</p>
                    </div>
                `}
            `;

            // Initialize empty trash button
            if (trashedFiles.length > 0) {
                initializeEmptyTrashButton(container);
            }
        } catch (error) {
            showToast('Erro ao carregar arquivos da lixeira', 'error');
        }
    }
};

function initializeEmptyTrashButton(container) {
    const emptyTrashBtn = container.querySelector('#emptyTrashBtn');
    if (!emptyTrashBtn) return;

    emptyTrashBtn.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja esvaziar a lixeira? Esta ação não pode ser desfeita.')) {
            try {
                await fileService.emptyTrash();
                showToast('Lixeira esvaziada com sucesso', 'success');
                await render(container);
            } catch (error) {
                showToast('Erro ao esvaziar lixeira', 'error');
            }
        }
    });
}