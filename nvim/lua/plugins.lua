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
		{ 
				'akai54/2077.nvim',
				lazy = false,
				priority = 1000,
				config = function()
						vim.cmd [[colorscheme 2077]]
						vim.termguicolors = true
						vim.g.airline_theme = 'cyberpunk'
				end
		},
		--{
		--		'mrcjkb/haskell-tools.nvim',
		--		version = '^3', -- Recommended
		--		ft = { 'haskell', 'lhaskell', 'cabal', 'cabalproject' },
		--},
    {
    'nvim-telescope/telescope.nvim', tag = '0.1.4',
				dependencies = { 'nvim-lua/plenary.nvim' }
    },
}

local opts = {}

require("lazy").setup(plugins, opts)

require'lspconfig'.ocamllsp.setup{}
require'lspconfig'.hls.setup{}
require'lspconfig'.clangd.setup{}
