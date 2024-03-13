{
  inputs = {
     nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
     systems.url = "github:nix-systems/default";
     flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    flake-utils,
    nixpkgs,
    systems,
    ...
  } @ inputs: 
  flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = nixpkgs.legacyPackages.${system};
  in rec {
    devShells = {
      default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs
          # You can set the major version of Node.js to a specific one instead
          # of the default version
          # pkgs.nodejs-19_x

          # You can choose pnpm, yarn, or none (npm).
          pkgs.nodePackages.pnpm
          # pkgs.yarn

          pkgs.nodePackages.typescript
          pkgs.nodePackages.typescript-language-server
        ];
        shellHook = ''
            zsh
            exit
        '';
      };
    };
    packages = rec {
      default = pkgs.stdenv.mkDerivation {
        name = "PDA";
        src = ./pda;
        buildInputs = with pkgs; [ nodejs ];
        buildPhase = ''
          mkdir $out/
          npm install
        '';
        installPhase = ''
          cp -r ./. $out/
        '';
      };
    };
  });
}
