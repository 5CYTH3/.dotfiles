local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local plugins = {
		'neovim/nvim-lspconfig',		
		'samueljoli/cyberpunk.nvim',
		'hrsh7th/nvim-cmp',
		'hrsh7th/cmp-nvim-lsp',
		'L3MON4D3/LuaSnip',
    {
				'nvim-telescope/telescope.nvim', tag = '0.1.4',
				dependencies = { 'nvim-lua/plenary.nvim' }
    },
		'nvim-tree/nvim-tree.lua',
		'nvim-treesitter/nvim-treesitter',
		'nvim-tree/nvim-web-devicons',
		{
				'rust-lang/rust.vim',
				ft = "rust",
				init = function ()
						vim.g.rustfmt_autosave = 1
				end
		},
		{
				'nvim-lualine/lualine.nvim',
					dependencies = { 'nvim-tree/nvim-web-devicons' }
		},
		'jubnzv/virtual-types.nvim',
		{
				'lervag/vimtex',
				init = function ()
						vim.g.vimtex_view_method = 'zathura'
				end
		},
		
}

local opts = {}

require("lazy").setup(plugins, opts)

local capabilities = require('cmp_nvim_lsp').default_capabilities()

require('cyberpunk').setup {
		theme = 'dark'
}
require('lspconfig').ocamllsp.setup{
		capabilities = capabilities,
		on_attach = require('virtualtypes').on_attach()
}

require('lspconfig').hls.setup{
		capabilities = capabilities,
}
require('lspconfig').clangd.setup{
		capabilities = capabilities,
		on_attach = require('virtualtypes').on_attach()
}

require('lspconfig').rust_analyzer.setup({
		capabilities = capabilities,
		on_attach = require('virtualtypes').on_attach(),
		filetypes = {"rust"},
		settings = {
				["rust-analyzer"] = {
						cargo = {
								allFeatures = true,
						}
				}
		}
})

require('nvim-tree').setup()
require('nvim-treesitter.configs').setup({
		ensure_installed = { 'c', 'rust', 'ocaml', 'lua', 'haskell'},
		highlight = {
				enable = true	
		}
})

require('telescope').setup()
require('lualine').setup()

