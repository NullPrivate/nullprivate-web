---
title: "Home Setup"
description: "A step-by-step guide to building the NullPrivate network ad-blocking service at home"
---

# Setting Up NullPrivate at Home

NullPrivate is an enhanced fork of AdGuard Home, purpose-built for superior network-level ad blocking and privacy protection. This tutorial walks you through installing and configuring NullPrivate on your home network.

## Project Overview

[NullPrivate](https://github.com/NullPrivate/NullPrivate) is an open-source fork of [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome) that offers both SaaS hosting and a rich set of extra features, all aimed at delivering a better DNS resolution and network-filtering experience.

## Key Features

### Original Features
- **Network-wide ad blocking**: Block ads and trackers across the entire network
- **Custom filtering rules**: Add personalized blocklists and allowlists
- **Encrypted DNS support**: DNS-over-HTTPS, DNS-over-TLS, and DNSCrypt
- **Built-in DHCP server**: Ready-to-use DHCP functionality
- **Per-client settings**: Tailor settings for each individual device
- **Parental controls**: Block adult content and enforce Safe Search
- **Cross-platform**: Runs on Linux, macOS, Windows, and more
- **Privacy-first**: No usage analytics or telemetry

### NullPrivate Add-ons
- **DNS routing rule lists**: Route DNS queries using rule lists in a config file
- **App-level blocking rules**: Target specific application sources
- **Dynamic DNS (DDNS)**: Automatic hostname resolution updates
- **Advanced rate limiting**: Efficient traffic management and control
- **Enhanced deployment**: Load balancing, automatic certificate renewal, optimized connectivity

## Installation Methods

### Method 1: Download the Binary

1. Visit the [Releases page](https://github.com/NullPrivate/NullPrivate/releases) and grab the binary for your OS.
2. Create a working directory:
   ```bash
   mkdir -p ./data
   ```
3. Launch NullPrivate:
   ```bash
   ./NullPrivate -c ./AdGuardHome.yaml -w ./data --web-addr 0.0.0.0:34020 --local-frontend --no-check-update --verbose
   ```

### Method 2: Use Docker

Docker is the easiest and most portable way to deploy:

```bash
docker run --rm --name NullPrivate \
  -p 34020:80 \
  -v ./data/container/work:/opt/adguardhome/work \
  -v ./data/container/conf:/opt/adguardhome/conf \
  nullprivate/nullprivate:latest
```

### Supported Platforms

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Docker
- ✅ Other Unix-like systems

## Configuration Guide

### Initial Setup
After launch, open the web UI to finish configuration:
- Default admin URL: `http://localhost:34020`
- Create an admin account on first run
- Optionally import an existing AdGuard Home config

### Configuration Files
The main file is `AdGuardHome.yaml`, which contains:
- DNS server settings
- Filtering rules
- Client definitions
- Security options

## Command-Line Flags

| Flag | Purpose |
|------|---------|
| `-c` | Path to the configuration file |
| `-w` | Working directory |
| `--web-addr` | Address and port for the web UI |
| `--local-frontend` | Use the embedded web interface |
| `--no-check-update` | Disable automatic update checks |
| `--verbose` | Enable detailed logging |

## Usage Tips

1. **Network setup**: Point your router’s DNS to the NullPrivate IP
2. **Rule updates**: Refresh blocklists periodically for best coverage
3. **Performance monitoring**: Check DNS query stats in the web UI
4. **Security hardening**: Enable HTTPS and use a strong password
5. **Backups**: Regularly back up the config file and data directory

## Troubleshooting

### Common Issues
- **Port conflict**: Make sure port 34020 is free
- **Permission errors**: Ensure correct file permissions on Linux
- **Startup failure**: Verify the config path and working directory exist

### Getting Help
- Read the [official docs](https://github.com/NullPrivate/NullPrivate#readme)
- Open an issue on [GitHub Issues](https://github.com/NullPrivate/NullPrivate/issues)

## Wrap-up

You should now have a working NullPrivate instance at home, giving you a cleaner, more private internet experience. NullPrivate’s rich feature set and flexible configuration options make it easy to tailor the service to your exact needs.
