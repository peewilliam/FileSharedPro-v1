import { menuItems } from './MenuItems.js';
import { loadSection } from './SectionLoader.js';

export class DashboardNavigation {
    constructor() {
        this.currentSection = 'files';
        this.init();
    }

    init() {
        this.renderMenu();
        this.initializeEventListeners();
        this.loadInitialSection();
    }

    renderMenu() {
        const menuContainer = document.querySelector('.menu-items');
        if (!menuContainer) return;

        menuContainer.innerHTML = menuItems.map(item => `
            <li class="${item.id === this.currentSection ? 'active' : ''}">
                <a href="#" data-section="${item.id}">
                    <i class="bi ${item.icon}"></i>
                    <span>${item.label}</span>
                </a>
            </li>
        `).join('');
    }

    initializeEventListeners() {
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = e.currentTarget.dataset.section;
                this.navigateToSection(sectionId);
            });
        });
    }

    async navigateToSection(sectionId) {
        // Update active state
        this.currentSection = sectionId;
        document.querySelectorAll('[data-section]').forEach(link => {
            link.parentElement.classList.toggle('active', 
                link.dataset.section === sectionId);
        });

        // Load section content
        await loadSection(sectionId);

        // Update URL without page reload
        history.pushState({section: sectionId}, '', `#${sectionId}`);
    }

    loadInitialSection() {
        const hash = window.location.hash.slice(1);
        const initialSection = hash || 'files';
        this.navigateToSection(initialSection);
    }
}