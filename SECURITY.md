# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AniUI, please report it responsibly.

**Do not open a public issue.** Instead, email **security@aniui.dev** or open a private security advisory on GitHub:

https://github.com/anishlp7/aniui/security/advisories/new

We will acknowledge receipt within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

AniUI is a copy-paste component library — components are source files that live in your project. The security-relevant surface is:

- **CLI (`aniui`)** — Reads/writes files to your project during `init` and `add`
- **MCP server (`@aniui/mcp`)** — Exposes component registry data to AI tools
- **Generate command** — Sends prompts to the Anthropic API (requires your API key)

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |
