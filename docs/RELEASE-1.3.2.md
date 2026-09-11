# DiamondCrew Interactive Staff Center 1.3.2

The DiamondCrew Interactive Image Service Docker build now creates its storage directory with `mkdir -p`. The Alpine base image already contains `/media`; the previous `mkdir` failed before ownership and permissions were applied. The build now handles both an existing and a new directory, retaining owner `node:node` and mode `750` before running as the `node` user.

This patch prepares the Image Service for isolated Linux Docker verification. It does not migrate the existing CDN, change public media URLs, or enable production Image Service SSO. Staff application behavior and deployment configuration are unchanged.
