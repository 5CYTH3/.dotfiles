vim.api.nvim_set_keymap('n', '<C-c>', ':w<cr>:!ocamlformat main.ml && ocamlc main.ml && ./a.out<cr>', { noremap = true, silent = false })

