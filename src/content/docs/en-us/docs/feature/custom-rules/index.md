---
title: "Custom Rules"
description: "NullPrivate supports multiple custom rule formats, allowing flexible configuration to meet your needs."
sidebar:
  order: 150
---

NullPrivate supports multiple custom rule formats, allowing flexible configuration to meet your needs. Below are the commonly used rule formats and examples:

| Rule Format   | Example                      | Description                                                |
| ------------- | ---------------------------- | ---------------------------------------------------------- |
| Domain Block  | `\|\|example.org^`           | Blocks example.org and all its subdomains                  |
| Allowlist     | `@@\|\|example.org^`         | Adds example.org and all its subdomains to the allowlist   |
| DNS Redirect  | `127.0.0.1 example.org`      | Resolves example.org to the specified IP                   |
| Comment       | `! comment` or `# comment`   | Adds rule comments without affecting actual filtering      |
| Regex         | `/REGEX/`                    | Matches domains using regular expressions                  |

### Advanced Usage

- You can combine multiple rule types
- Rule priority: Allowlist > Blocklist > DNS Redirect
- Supports importing third-party rule lists

For detailed information, please refer to the [AdGuard Home Hosts Blocklists documentation](https://github.com/AdGuardTeam/AdGuardHome/wiki/Hosts-Blocklists).
