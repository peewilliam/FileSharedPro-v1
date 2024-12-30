import { fileService } from '../../../../services/fileService.js';
import { createFileCard } from '../../../files/FileCard.js';
import { showToast } from '../../../../utils/notifications.js';

export default {
    async render(container) {
        try {
            const sharedFiles = await fileService.getSharedFiles();
            
            container.innerHTML = `
                <div class="section-header mb-4">
                    <h4>Arquivos Compartilhados</h4>
                    <p class="text-secondary mb-0">Arquivos compartilhados com você</p>
                </div>

                <div class="input-group mb-4" style="max-width: 400px;">
                    <input type="text" class="form-control" placeholder="Digite o código do arquivo">
                    <button class="btn btn-primary" id="accessFileBtn">
                        <i class="bi bi-box-arrow-in-right me-2"></i>Acessar Arquivo
                    </button>
                </div>

                ${sharedFiles.length > 0 ? `
                    <div class="files-grid">
                        ${sharedFiles.map(file => createFileCard(file)).join('')}
                    </div>
                ` : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-share"></i>
                        </div>
                        <h5>Nenhum arquivo compartilhado</h5>
                        <p class="text-secondary">Cole o código de um arquivo compartilhado para acessá-lo</p>
                    </div>
                `}
            `;

            // Initialize access button
            initializeAccessButton(container);
        } catch (error) {
            showToast('Erro ao carregar arquivos compartilhados', 'error');
        }
    }
};

function initializeAccessButton(container) {
    const accessBtn = container.querySelector('#accessFileBtn');
    const codeInput = container.querySelector('.form-control');

    if (!accessBtn || !codeInput) return;

    accessBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        if (!code) {
            showToast('Digite o código do arquivo', 'error');
            return;
        }

        try {
            const file = await fileService.getFileByCode(code);
            showToast('Arquivo acessado com sucesso', 'success');
            // Recarregar a lista de arquivos
            await render(container);
        } catch (error) {
            showToast('Código inválido ou arquivo não encontrado', 'error');
        }
    });
}