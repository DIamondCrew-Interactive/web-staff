# DiamondCrew Interactive Staff Center 1.3.4

Adds the default-off `LAUNCHER_IMAGE_ENABLED` runtime flag. After migration and real Image Service SSO acceptance, an operator can enable the existing management link without another frontend rebuild. Only the Image card changes; the disabled state and all other destinations are preserved.

Application rollout preserves the complete existing Staff runtime configuration, including SSO. Flag activation is a separate reviewed runtime change. This release does not require redeploying the independently running Image Service 1.3.3 image or changing stored media.
