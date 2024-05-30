if status is-interactive
    # Commands to run in interactive sessions can go here
end

# opam configuration
source /home/scythe/.opam/opam-init/init.fish > /dev/null 2> /dev/null; or true
set PATH "$HOME/.cabal/bin:$HOME/.ghcup/bin" $PATH

# Created by `pipx` on 2024-05-10 21:30:31
set PATH $PATH /home/scythe/.local/bin

alias zathura="zathura --fork"
