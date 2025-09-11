local conform = require "conform"
conform.setup({
  formatters_by_ft = {
			c = { "clang-format" }
  },
})
