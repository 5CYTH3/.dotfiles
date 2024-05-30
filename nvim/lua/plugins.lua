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
				'elkowar/yuck.vim',
				ft = "yuck"
		},
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
						vim.g.tex_flavor = 'latex'
						vim.opt.conceallevel = 1
						vim.g.tex_conceal = 'abdmg'
						vim.g.vimtex_view_forward_search_on_start = false
				end,
				ft = "tex"
		},
}

local opts = {}

require("lazy").setup(plugins, opts)

local cmp_capabilities = require('cmp_nvim_lsp').default_capabilities()

local lsp = require('lspconfig')

require('cyberpunk').setup {
		theme = 'dark'
}

lsp.ocamllsp.setup{
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach,
		root_dir = lsp.util.root_pattern("*.opam", "esy.json", "package.json", ".git", "dune-project", "dune-workspace", ".spm-project")
}

lsp.hls.setup{
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach
}

lsp.clangd.setup{
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach
}

-- Requires system package `rls` and the rustup toolchain
lsp.rust_analyzer.setup({
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach,
		filetypes = { "rust" },
		settings = {
				["rust-analyzer"] = {
						cargo = {
								allFeatures = true,
						}
				}
		}
})

-- Requires system package `lua-language-server`
lsp.lua_ls.setup {
		settings = {
				Lua = {
						diagnostics = {
								globals = { "vim" }
						}
				}
		}
}

require('nvim-tree').setup()
require('nvim-treesitter.configs').setup({
		ensure_installed = { 'c', 'rust', 'ocaml', 'lua', 'haskell' },
		highlight = {
				enable = true
		}
})

require('telescope').setup()
require('lualine').setup()
