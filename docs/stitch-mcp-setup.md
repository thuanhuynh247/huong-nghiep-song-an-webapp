# Stitch MCP Setup

This repo is prepared for Stitch MCP, but it does not store a real API key.

## Local setup

1. Copy `stitch.mcp.example.toml` to `stitch.mcp.local.toml`.
2. Paste your real Stitch API key into the local file.
3. Load that local MCP config from the environment where your Codex or MCP client runs.

Example local file:

```toml
[mcp_servers.stitch]
url = "https://stitch.googleapis.com/mcp"

[mcp_servers.stitch.http_headers]
"X-Goog-Api-Key" = "YOUR_REAL_KEY"
```

## Why the repo keeps only a template

- Public Android-first release should not leak secrets.
- The repo can be pushed, shared, or deployed without exposing your Stitch key.
- Each environment can inject its own key safely.

## Planned Stitch responsibilities

- Sync quiz sessions across devices after the PWA MVP is validated.
- Store result history on the server instead of only in local storage.
- Add counselor/admin workflows such as exports and student follow-up.
- Support authentication and remote backups.

## Current environment note

The current workspace was prepared to be Stitch-ready, but direct Stitch MCP execution was not completed here because this environment does not expose a working local MCP client/runtime for Stitch.
