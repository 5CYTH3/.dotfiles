local filename = vim.api.nvim_buf_get_name(0)

vim.api.nvim_set_keymap('n', '<C-c>', string.format(':w<cr>:!gcc -Wall -Werror -Wextra -fsanitize=address,undefined %s -lm && ./a.out<cr>', filename), { noremap = true, silent = false })
