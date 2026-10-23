---
title: "Supported Platforms"
description: "\"NingPing\" supported platforms and configuration guide"
sidebar:
  order: 120
---

## Supported Protocols

"NingPing" supports the following encrypted DNS protocols:

- **DoT (DNS over TLS)** - DNS queries encrypted via TLS
- **DoH (DNS over HTTPS)** - DNS queries encrypted via HTTPS

## Supported Platforms

### Windows 11

- Supports system-level DoH configuration
- Configure via Settings -> Network & Internet -> DNS server

### macOS (Big Sur and above)

- Supports system-level DoH/DoT configuration
- Can be configured via System Preferences -> Network

### iOS (14.0 and above)

- Supports system-level DoH/DoT configuration
- Can be configured in Settings -> General -> VPN & Device Management

### Android (9.0 and above)

- Supports system-level Private DNS (DoT)
- Configure in Settings -> Network & Internet -> Private DNS

### Browser Support

- Chrome/Edge/Brave: Supports DoH
- Firefox: Supports DoH/DoT
- Safari: Follows system DNS settings

For detailed configuration instructions, please refer to the specific configuration guides for each platform.
