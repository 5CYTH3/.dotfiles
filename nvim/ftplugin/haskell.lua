local map = require('keybindings').map

map('n', '<C-c>', ':w<cr>:!ghc -o main main.hs && ./main<cr>', { noremap = true, silent = false })
