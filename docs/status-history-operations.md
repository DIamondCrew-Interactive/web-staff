# Hourly public history

The public status detail shows 24 hours or 7 days of hourly buckets. One observation per minute is retained; missed minutes are never interpolated. Availability is the ratio of ONLINE observations to ONLINE + OFFLINE observations, excluding maintenance/unknown/missing readings. It is a sample ratio, not a contractual uptime SLA. The current hour is incomplete. No measurements exist before collection is enabled.

## Runtime configuration

Create a persistent directory owned by container UID 1000, mode 0700. Bind mount the directory (not the individual JSON file). Set `STATUS_HISTORY_DIRECTORY` to that mount path. Set `STATUS_HISTORY_COLLECT=true` on **only the public status container**, which has the complete monitoring targets. Staff can mount the same directory read-only with collection disabled. Do not use independent volumes: they would show different history. The index process starts the minute timer on listen and stops it on termination. HTTP visitors do not trigger samples.

The store keeps `history.json`, version 1, with at most 168 hourly buckets per known service. Writes use a flushed temporary file and atomic rename. `collector.lock` is an exclusive directory lock that prevents competing writers from corrupting the snapshot. A crash during a write can leave the lock behind. Stop all collectors, verify that no writer remains, back up the directory, then remove **only the empty `collector.lock` directory** and restart the single collector. Never clear a live writer's lock. A leftover `.tmp` can be preserved for diagnosis; committed history is `history.json`.

Malformed/oversized/future-dated snapshots fail closed: API reports history unavailable and collection does not overwrite them. Back up the file and restore the last valid version while collectors are stopped. The response provides `sampledAt` and `stale`; the UI reports a stale collector after three minutes. No upstream URLs, credentials, user IDs or incident text are persisted or exposed by this endpoint.

Deploy configuration alongside the application update using the existing external runtime compose file. Preserve secrets and image volumes. Back up the runtime and history directory first; rollback restores the previous application/runtime and leaves collected history intact. This candidate has not been deployed.
