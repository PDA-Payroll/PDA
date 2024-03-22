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
