import { DashboardNavigation } from '../components/dashboard/navigation/Navigation.js';
import { initUploadModal } from '../components/upload/uploadModal.js';
import { authService } from '../services/auth/authService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!authService.isAuthenticated()) {
        window.location.href = '/';
        return;
    }

    // Initialize dashboard navigation
    const dashboardNav = new DashboardNavigation();

    // Initialize other components
    initUploadModal();

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        if (e.state?.section) {
            dashboardNav.navigateToSection(e.state.section);
        }
    });
});