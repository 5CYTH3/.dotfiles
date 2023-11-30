if status is-interactive
    # Commands to run in interactive sessions can go here
end

# opam configuration
source /home/scythe/.opam/opam-init/init.fish > /dev/null 2> /dev/null; or true
set PATH "$HOME/.cabal/bin:$HOME/.ghcup/bin" $PATH
