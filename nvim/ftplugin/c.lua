vim.api.nvim_set_keymap('n', '<C-c>', ':w<cr>:!gcc -Wall -Werror -Wextra -fsanitize=address,undefined main.c -lm && ./a.out<cr>', { noremap = true, silent = false })
