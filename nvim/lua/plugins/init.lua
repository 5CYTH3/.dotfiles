return {
    {
        'nvim-tree/nvim-tree.lua',
				opts = {}
		},
		'nvim-lua/plenary.nvim',
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
		{
				"folke/todo-comments.nvim",
				dependencies = { "nvim-lua/plenary.nvim" },
				opts = {
				-- your configuration comes here
				-- or leave it empty to use the default settings
				-- refer to the configuration section below
				}
		},
		{
        'samueljoli/cyberpunk.nvim',
        opts = {
            theme = 'dark'
        }
    },
}
