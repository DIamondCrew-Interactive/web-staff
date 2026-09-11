# DiamondCrew Interactive Staff Center 1.3.2

The DiamondCrew Interactive Image Service Docker build now creates its storage directory with `mkdir -p`. The Alpine base image already contains `/media`; the previous `mkdir` failed before ownership and permissions were applied. The build now handles both an existing and a new directory, retaining owner `node:node` and mode `750` before running as the `node` user.

This patch prepares the Image Service for isolated Linux Docker verification. It does not migrate the existing CDN, change public media URLs, or enable production Image Service SSO. Deployment configuration is unchanged.

Production maintenance and rollback documentation now uses the existing external Staff/Proxy runtime Compose files, preserving SSO configuration, mounts and networks. It distinguishes deployed versions, explicit account mappings and isolated Image validation from a production CDN migration.

Public Status now returns the same sanitized service snapshot as Staff, including DIA-01, Server Controller, Proxy Manager and both DEV game entries. Infrastructure services use full DiamondCrew Interactive names. Probe URLs, upstream payloads and credentials remain server-only; missing data remains UNKNOWN.
