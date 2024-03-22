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
      packages = rec {
        ##### Building PDA #####
        # Entrypoint is the command to start the server
        entrypoint = pkgs.writeShellScriptBin "startPda" ''
          ${pkgs.nodejs}/bin/node .
        '';

        # build dependencies
        node-modules = pkgs.mkYarnPackage {
          name = "node-modules";
          src = ./.;
        };

        # The actual build
        default = pkgs.stdenv.mkDerivation {
          name = "pda";
          src = ./.;
          buildInputs = [
            # JS stuff
            pkgs.postgresql_16
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

        ##### Docker Stuff #####
        #docker container
        oci = pkgs.dockerTools.buildLayeredImage {
          name = "ghcr.io/pda-payroll/pda";
          tag = "latest";
          contents = [
            entrypoint
            node-modules
            packages.default
            pkgs.coreutils
            pkgs.bash
            #I don't know if I need all these but I cba to look into it.
            pkgs.dockerTools.usrBinEnv
            pkgs.dockerTools.binSh
            pkgs.dockerTools.caCertificates
            pkgs.dockerTools.fakeNss
          ];
          extraCommands = ''
            mkdir -m 1777 tmp
          '';
          config = {
            Cmd = [ "${packages.default}/bin/pda" ];
            ExposedPorts = {
              "6969/tcp" = {};
            };
            Labels = {
              "org.opencontainers.image.source"="https://github.com/pda-payroll/";
            };
            Volumes = {
              "/" = {};
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
