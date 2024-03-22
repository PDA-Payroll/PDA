# PDA
The open source Payroll Data Assistant.

# Usage
There are two supported options, Nix and docker/podman/kubernetes
## Nix
### Requirements
- Nix (setup instructions found here: https://nixos.wiki/wiki/Flakes)
- A running postgresql server on port 7734 (This is non-standard and will change to the default postgresql port in the future)
### Running
`
nix run github:pda-payroll/pda
`
## Docker/Podman
We provide an OCI compliant container at `ghcr.io/pda-payroll/pda:latest`
Unfortunately as this project is under active development we only provide a latest image, however nix makes it very easy for you to build it yoursel.  Just pull the repo, check out your desired commit and run this command if you are using docker:
`nix build .#oci && docker load < result`

or this command if you are using podman:
`nix build .#oci && docker load < result`
A docker compose example is provided in the root of the repo
