import { fileService } from '../../../../services/fileService.js';
import { createFileCard } from '../../../files/FileCard.js';
import { showToast } from '../../../../utils/notifications.js';

export default {
    async render(container) {
        try {
            const files = await fileService.getFiles();
            
            container.innerHTML = `
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4>Meus Arquivos</h4>
                        <p class="text-secondary mb-0">${files.length} arquivo${files.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="btn-group">
                            <button class="btn btn-outline-secondary view-grid active">
                                <i class="bi bi-grid"></i>
                            </button>
                            <button class="btn btn-outline-secondary view-list">
                                <i class="bi bi-list"></i>
                            </button>
                        </div>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                            <i class="bi bi-cloud-upload me-2"></i>Upload
                        </button>
                    </div>
                </div>

                ${files.length > 0 ? `
                    <div class="files-grid">
                        ${files.map(file => createFileCard(file)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-cloud-upload"></i>
                        </div>
                        <h5>Nenhum arquivo encontrado</h5>
                        <p class="text-secondary">Faça upload do seu primeiro arquivo</p>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
                            <i class="bi bi-cloud-upload me-2"></i>Upload
                        </button>
                    </div>
                `}
            `;

            // Initialize view toggles
            initializeViewToggles(container);
        } catch (error) {
            showToast('Erro ao carregar arquivos', 'error');
        }
    }
};

function initializeViewToggles(container) {
    const gridBtn = container.querySelector('.view-grid');
    const listBtn = container.querySelector('.view-list');
    const filesGrid = container.querySelector('.files-grid');

    if (!gridBtn || !listBtn || !filesGrid) return;

    gridBtn.addEventListener('click', () => {
        filesGrid.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        filesGrid.classList.add('list-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}