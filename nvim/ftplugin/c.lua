local filename = vim.api.nvim_buf_get_name(0)

vim.api.nvim_set_keymap('n', '<C-c>', string.format(':w<cr>:!make<cr>'), { noremap = true, silent = false })
