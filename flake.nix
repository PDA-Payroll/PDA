{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat.url = "https://flakehub.com/f/edolstra/flake-compat/1.tar.gz";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = {
    self,
    flake-compat,
    flake-utils,
    nixpkgs,
    ...
  } @ inputs: 
  
  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = inputs.nixpkgs.legacyPackages.${system};
    in rec {
      # This is a cache so we don't always have to rebuild
      nix.settings = {
        substituters = [
          "https://pdapayroll.cachix.org"
        ];
        trusted-public-keys = [
          "pdapayroll.cachix.org-1:pHTQTB8CQO2cYGQlYJX7fs9kxSq5ibUZMDoTSFLQLXg="
        ];
      };
      
      packages = rec {
##### Building PDA #####
        #build dependencies
        packages = rec {
          node-modules = pkgs.mkYarnPackage {
            name = "node-modules";
            src = ./.;
          };
          default = pkgs.stdenv.mkDerivation {
            name = "pda";
            src = ./.;
            buildInputs = [
              # JS stuff
              pkgs.yarn
              node-modules
            ];
            buildPhase = ''
              export HOME=$(pwd)
              ln -s ${node-modules}/libexec/pda/node_modules node_modules
              ${pkgs.yarn}/bin/yarn --offline build 
            '';
            installPhase = ''
              mkdir $out
              mv dist $out/lib
            '';
          };
        };

        # Actual build
        
        ##### Docker Stuff #####
        #entrypoint script for below docker container
        entrypoint = pkgs.writeShellScriptBin "entrypoint" ''
          ${pkgs.nodejs}/bin/node ${packages.default}/lib/node_modules/pda/main.js
        '';

        #docker container
        oci = pkgs.dockerTools.buildImage {
          name = "ghcr.io/drnfc/PDA";
          tag = "latest";
          config = {
            cmd = [ "${packages.entrypoint}/bin/entrypoint" ];
            Labels = {
              "org.opencontainers.image.source"="https://github.com/drnfc/Employment-Portal-Project";
            };
          };
        };
      };

      #development Environment
      devShells = {
        default = pkgs.mkShell {
          buildInputs = [
            pkgs.node2nix
            pkgs.nodejs
            pkgs.yarn
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
    });
}
