
vim.api.nvim_set_keymap('n', '<C-c>', ':w<cr>:!ghc -o main main.hs && ./main<cr>', { noremap = true, silent = false })
