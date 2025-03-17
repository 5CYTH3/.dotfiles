return {
		'neovim/nvim-lspconfig',
		'hrsh7th/nvim-cmp',
		'hrsh7th/cmp-nvim-lsp',
		'L3MON4D3/LuaSnip',
		{
				'nvim-treesitter/nvim-treesitter',
				opts = {
						build = ':TSUpdate'
				}
		},
		{
				'elkowar/yuck.vim',
				ft = "yuck"
		},
		{
				'rust-lang/rust.vim',
				ft = "rust",
				config = function ()
						vim.g.rustfmt_autosave = 1
				end
		},
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
		{
				'mrcjkb/haskell-tools.nvim',
				version = '^3', -- Recommended
				lazy = false, -- This plugin is already lazy
		}
}
