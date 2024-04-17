# PDA
The open source Payroll Data Assistant.

# Building
## Why are we using nix
Nix is an incredible build system that enables a large number of benefits:
- You technically don't even have to have this repository cloned to build or run PDA.
- Individual parts of the build process are cached on a cachix repo, speeding up builds.
- The output is guarenteed to be exactly the same no matter where/what you build on (excluding different architecture if you are not cross compiling) even down to having the same hash.
- and many other numerous benefits
## Requirements to build
- Nix (setup instructions found here: https://nixos.wiki/wiki/Flakes)
- Linux, although it is likely this will work on Mac and WSL, though this has not been tested, as using anything other than Linux for a server is extremely unusual. It will probably be able to be build on WSL or Mac, but whether or not you can actually host has not been tested.
## What is being built
The build is declared in the flake.nix with 3 relevent outputs:
1. PDA itself
2. A PDA OCI compliant container
3. A development environment
## Build Instructions
### Building PDA
Run the command:
```
nix build github:pda-payroll/pda
```
If you are inside this git repo you can alternitively run:
```
nix build
```
The output will be found in the result symlink wherever you ran the previous command
### Building OCI-compliant container (Docker Container)
Run the command:
```
nix build github:pda-payroll/pda#oci
```
If you have cloned this git repo you can alternitively run:
```
nix build .#oci
```
The output will be found in the result symlink wherever you ran the previous command

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
We provide an OCI compliant container at `ghcr.io/pda-payroll/pda:latest`.

Unfortunately as this project is under active development we only provide a latest image, however nix makes it very easy for you to build this project yourself.  

Just pull the repo, check out your desired commit and run this command if you are using docker:

`nix build .#oci && docker load < result`

or this command if you are using podman:

`nix build .#oci && docker load < result`

## Docker Compose

```
version: '3.9'

services:
  pda: 
    image: ghcr.io/pda-payroll/pda:latest
    restart: always
    environment:
      POSTGRES_USER: pdaAdmin
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pdaDB
    ports:
      - 80:6969
    networks:
      default:
        external:
          name: localhost
  db:
    image: postgres
    restart: always
    # set shared memory limit when using docker-compose
    shm_size: 128mb
    # or set shared memory limit when deploy via swarm stack
    #volumes:
    #  - type: tmpfs
    #    target: /dev/shm
    #    tmpfs:
    #      size: 134217728 # 128*2^20 bytes = 128Mb
    environment:
      POSTGRES_USER: pdaAdmin
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pdaDB
    ports:
      - 7734:5432
    networks:
      default:
        external:
          name: localhost
```
