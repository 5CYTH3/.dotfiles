local cmp_capabilities = require('cmp_nvim_lsp').default_capabilities()

local lsp = require('lspconfig')

lsp.ocamllsp.setup{
	capabilities = cmp_capabilities,
	on_attach = require'virtualtypes'.on_attach,
	root_dir = lsp.util.root_pattern("*.opam", "esy.json", "package.json", ".git", "dune-project", "dune-workspace", ".spm-project")
}

lsp.hls.setup {
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach
}

lsp.clangd.setup {
		capabilities = cmp_capabilities,
		on_attach = require('virtualtypes').on_attach,
		root_dir = lsp.util.root_pattern(".ccls", ".spm-project")
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

lsp.tsserver.setup {}

require('nvim-treesitter.configs').setup({
	ensure_installed = { 'c', 'rust', 'ocaml', 'lua', 'haskell' },
	highlight = {
		enable = true
	}
})

lsp.texlab.setup {
		capabilities = cmp_capabilities
}
