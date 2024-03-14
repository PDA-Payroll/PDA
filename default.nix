{
  config,
  lib,
  dream2nix,
  ...
}: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  mkDerivation = {
    src = ./pda;
  };

  deps = {nixpkgs, ...}: {
    # dependencies go here
  };

  nodejs-package-lock-v3 = {
    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  };
  name = "pda";
  version = "0.0.1";

  # Ecosystem-dependent package definition goes here
}
