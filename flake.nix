{
  inputs = {
     dream2nix.url = "github:nix-community/dream2nix";
     flake-utils.url = "github:numtide/flake-utils";
     flake-compat.url = "https://flakehub.com/f/edolstra/flake-compat/1.tar.gz";
     nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
     nixpkgs.follows = "dream2nix/nixpkgs";
     systems.url = "github:nix-systems/default";
  };

  outputs = {
    self,
    dream2nix,
    flake-compat,
    flake-utils,
    nixpkgs,
    systems,
    ...
  } @ inputs: 
  inputs.flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = inputs.nixpkgs.legacyPackages.${system};
  in rec {
    #This builds our server
    packages.default = dream2nix.lib.evalModules {
      packageSets.nixpkgs = inputs.dream2nix.inputs.nixpkgs.legacyPackages.${system};
      modules = [
        ./default.nix
        {
          paths.projectRoot = ./.;
          paths.projectRootFile = "flake.nix";
          paths.package = ./.;
        }
      ];
    };

    #entrypoint script for below docker container
    packages.entrypoint = pkgs.writeShellScriptBin "entrypoint" ''
      ${pkgs.nodejs}/bin/node ${packages.default}/lib/node_modules/pda/main.js
    '';

    #docker container
    packages.oci = pkgs.dockerTools.buildImage {
      name = "ghcr.io/drnfc/pda";
      tag = "latest";
      config = {
        cmd = [ "${packages.entrypoint}/bin/entrypoint" ];
        Labels = {
          "org.opencontainers.image.source"="https://github.com/drnfc/Employment-Portal-Project";
        };
      };
    };

    #development Environment
    devShells = {
      default = pkgs.mkShell {
        buildInputs = [
          pkgs.node2nix
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
  });
}
