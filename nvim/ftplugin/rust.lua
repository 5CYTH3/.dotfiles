local map = require('keybindings').map

map('n', '<C-c>', ':w<cr>:!cargo run<cr>', { noremap = true, silent = false })
