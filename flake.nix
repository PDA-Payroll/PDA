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
          entrypoint = pkgs.writeShellScriptBin "startPda" ''
            ${pkgs.nodejs}/bin/node .
          '';

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
              entrypoint
            ];
            installPhase = ''
              mkdir -p $out/bin
              cp -r src $out/lib
              cp ${entrypoint}/bin/startPda $out/bin/pda
            '';
          };
        };
        
        
        # Actual build
        
        ##### Docker Stuff #####

        #docker container
        oci = pkgs.dockerTools.buildImage {
          name = "ghcr.io/drnfc/PDA";
          tag = "latest";
          config = {
            cmd = [ "${packages.default}/bin/pda" ];
            Labels = {
              "org.opencontainers.image.source"="https://github.com/drnfc/Employment-Portal-Project";
            };
          };
        };
      };

      #development Environment
      devShells = {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            node2nix
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodejs
            postgresql_16
            yarn
          ];
          shellHook = ''
              zsh
              exit
          '';
        };
      };
    });
}
