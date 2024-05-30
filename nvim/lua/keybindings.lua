-- Telescope toggling
local builtin = require('telescope.builtin')
vim.keymap.set('n', '<leader>ff', builtin.find_files, {})

-- Open errors in big
vim.keymap.set('n', '<space>e', vim.diagnostic.open_float, {})

-- Show tree
local toggle_tree = function ()
	local nvim_tree = require('nvim-tree.api')
	local current_buf = vim.api.nvim_get_current_buf()
	local current_buf_ft = vim.api.nvim_get_option_value("filetype", { buf = current_buf })
	if current_buf_ft == "NvimTree" then
		nvim_tree.tree.toggle()
	else
		nvim_tree.tree.focus()
	end
end

vim.keymap.set('n', '<leader>fd', toggle_tree, {})

-- Copy to system clipboard
vim.api.nvim_set_keymap('v', '<leader>y', '"+y', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<leader>yy', '"+yy', { noremap = true, silent = true })
