// Definição dos itens do menu
export const menuItems = [
    {
        id: 'files',
        label: 'Meus Arquivos',
        icon: 'bi-folder',
        component: 'FilesSection'
    },
    {
        id: 'shared',
        label: 'Compartilhados',
        icon: 'bi-share',
        component: 'SharedSection'
    },
    {
        id: 'recent',
        label: 'Recentes',
        icon: 'bi-clock-history',
        component: 'RecentSection'
    },
    {
        id: 'favorites',
        label: 'Favoritos',
        icon: 'bi-star',
        component: 'FavoritesSection'
    },
    {
        id: 'trash',
        label: 'Lixeira',
        icon: 'bi-trash',
        component: 'TrashSection'
    }
];