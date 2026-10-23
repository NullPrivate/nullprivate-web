---
title: "Service Resource Optimization Strategy Guide"
description: "Detailed explanation of NullPrivate's service resource optimization strategy, including improvements to the filter update mechanism, recommendations for parallel request optimization, and guidelines for using third-party lists, all aimed at delivering a more stable and reliable service experience."
pubDate: "2024-12-02 16:12:46 +0800"
categories: Technical Announcement
tags: [system optimization, resource management, performance tuning, service stability]
---

## Background

As user numbers grow and feature demands increase, we have observed that certain high-resource-consumption configuration options can lead to service instability. To ensure service quality, we conducted an in-depth analysis and formulated a corresponding optimization plan.

## Resource Optimization Strategy

### 1. Filter Update Mechanism Optimization

#### Current Situation

- Some users have configured **hourly filter updates**
- Each update requires a full download-parse-deduplication cycle
- International bandwidth limitations prolong update times
- Server resources remain under continuous high load

#### Optimization Plan

We have adjusted the minimum update interval to 72 hours for the following reasons:

- Most filter lists update on a 24–72 hour cycle
- Reduces ineffective resource consumption
- Ensures service stability
- Improves bandwidth utilization efficiency

#### Impact Assessment

- **Positive impacts**
  - More stable service response
  - More reasonable resource usage
  - Reduced system load
- **Minimal impact**
  - Rule updates still occur within a reasonable cycle
  - No effect on protection efficacy

### 2. Parallel Request Strategy

#### Current Situation

Most users currently have **parallel requests** enabled, but under the existing architecture the benefits are limited:

- Latency differences among Alibaba Cloud upstream services are typically within 5 ms
- May trigger Alibaba Cloud public service request-rate limits
- Adds unnecessary system overhead

#### Usage Recommendations

- We recommend using **load-balancing** mode
- Parallel requests are suitable for:
  - Scenarios with significant upstream latency differences (>200 ms)
  - Cases of unstable service quality
  - Cross-border access scenarios

> Note: We have not yet observed any throttling issues caused by parallel requests, so this feature remains available for now.

### 3. Third-Party List Management

#### Security Considerations

To ensure system stability, we have temporarily disabled support for certain third-party lists:

- External list sizes are unpredictable
- May lead to resource overruns
- Service stability cannot be guaranteed

#### Future Plans

We are researching a safer third-party list management solution so that this feature can be re-enabled in the future.
