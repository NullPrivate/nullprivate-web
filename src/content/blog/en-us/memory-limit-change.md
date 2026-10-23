---
title: "Basic Memory Limit Adjustment"
pubDate: "2024-11-29 16:01:48 +0800"
categories: Operations
tags: [Operations, blog]
---

Some users’ environments restart frequently; checking the logs shows the exit reason is memory usage hitting the 300 MB limit, causing a forced shutdown.

We are now raising the per-container limit to 500 MB to alleviate the restart issue.

If your environment experiences login or restart problems, please don’t hesitate to contact us at any time—solving customer issues is our responsibility.
