{
  inputs = {
     nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
     systems.url = "github:nix-systems/default";
     flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    systems,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs: 
  flake-utils.lib.eachDefaultSystem (system:
  let
    pkgs = nixpkgs.legacyPackages.${system};
    nginxPort = "6969";
    nginxConf = pkgs.writeText "nginx.conf" ''
      daemon off;
      error_log /dev/stddout info;
      pid /dev/null;
      events {}
      http {
          access_log /dev/stdout;
          server {
              listen ${nginxPort};
              root /PDA;
              location / {
                  index index.html;
              }
          }
      }
    '';
    entrypoint = pkgs.writeScript "docker-entrypoint.sh" ''
        #!${pkgs.stdenv.shell}
        set -eux -o pipefail
        if ! grep -q ^nogroup /etc/group; then
            cp -aL /etc/group /etc/group.real
            echo nogroup:x:65534: >>/etc/group.real
            rm -f /etc/group
            mv /etc/group.real /etc/group
        fi
        mkdir -p /var/log/nginx /var/cache/nginx/nginx_client_body
        exec nginx -c ${nginxConf}
    '';
  in rec {
    packages = {
        dockerImage = pkgs.dockerTools.buildImage {
            name = "PDA";
            tag = "latest";
            copyToRoot = pkgs.buildEnv {
                name = "imagePath";
                paths = [ 
                    #main things
                    pkgs.nginx
                    # Dependencies
                    pkgs.coreutils
                    pkgs.bash
                    pkgs.gnugrep
                    # I don't know if I need all these but I cba to look into it
                    pkgs.dockerTools.usrBinEnv
                    pkgs.dockerTools.binSh
                    pkgs.dockerTools.caCertificates
                    pkgs.dockerTools.fakeNss
                    ./.
                ];
                pathsToLink = ["/bin" "/etc" "/var" "/PDA"];
            };
            config = {
                Cmd = [entrypoint];
                ExposedPorts = {
                    "${nginxPort}/tcp" = {};
                };
                Volumes = {
                    "/etc/" = {};
                    "/var/" = {};
                    "/tmp" = {};
                };
            };
        };
    };
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
  });
}
