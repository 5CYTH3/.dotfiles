local map = require('keybindings').map

map('n', '<C-c>', ':w<cr>:!ocamlc main.ml && ./a.out<cr>', { noremap = true, silent = false })
