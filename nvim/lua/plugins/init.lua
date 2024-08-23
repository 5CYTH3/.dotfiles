return {
    {
        'samueljoli/cyberpunk.nvim',
        opts = {
            theme = 'dark'
        }
    },
    {
        'nvim-tree/nvim-tree.lua',
        opts = {}
    },
    {
        'nvim-telescope/telescope.nvim', tag = '0.1.4',
        dependencies = { 'nvim-lua/plenary.nvim' },
        opts = {}
    },
    'nvim-tree/nvim-web-devicons',
    {
        'nvim-lualine/lualine.nvim',
        dependencies = { 'nvim-tree/nvim-web-devicons' },
        opts = {}
    },
    'jubnzv/virtual-types.nvim',
}
