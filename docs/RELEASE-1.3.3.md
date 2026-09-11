# DiamondCrew Interactive Image Service 1.3.3

Media paths now accept Unicode letters and combining marks, plus apostrophes, preserving existing filenames and image bytes exactly. The legacy paths `uploads/at_muzzle_precision'.png` and `uploads/obrázek_2026-05-18_222909787.png` work with public serving, management inventory/copy/rename and the migration audit. No Unicode normalization or automatic renaming occurs.

Generated public URLs encode each path component, including apostrophes. Management uploads percent-encode multipart filenames and the server decodes them once before applying the same path validation, avoiding the multipart parser's Latin-1 filename corruption. ASCII clients remain compatible; API clients uploading Unicode names should use this encoded filename transport.

Traversal, symlinks, controls, invisible formatting characters, reserved routes/device names and other metacharacters remain rejected. Components are limited to 128 Unicode code points and 255 UTF-8 bytes. This candidate changes no production routing, credentials or stored media; migration requires separate inventory, backup and verification.
