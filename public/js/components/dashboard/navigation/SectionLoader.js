import { showToast } from '../../../utils/notifications.js';

export async function loadSection(sectionId) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    try {
        // Show loading state
        mainContent.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>
        `;

        // Dynamic import of section component
        const module = await import(`../sections/${sectionId}/${sectionId}.js`);
        const { render } = module.default;
        
        // Render section content
        await render(mainContent);
    } catch (error) {
        console.error(`Error loading section ${sectionId}:`, error);
        showToast('Erro ao carregar seção', 'error');
        
        mainContent.innerHTML = `
            <div class="alert alert-danger m-4">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Erro ao carregar a seção. Por favor, tente novamente.
            </div>
        `;
    }
}