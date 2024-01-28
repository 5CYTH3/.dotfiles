vim.opt.tabstop = 2
vim.opt.shiftwidth=4
vim.opt.expandtab = false
vim.opt.number = true

vim.opt.rtp:append("/home/scythe/.opam/default/share/ocp-indent/vim")

require 'plugins'
require 'plugin_config.completions'
require 'keybindings'

vim.termguicolors = true

local builtin = require('telescope.builtin')

vim.keymap.set('n', '<leader>ff', builtin.find_files, {})
