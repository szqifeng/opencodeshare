---
sidebar_position: 1
---

# 自定义 Agent

学习如何创建自定义 Agent。

## 概述

OpenCode 支持创建自定义 Agent 来满足特定需求。

## Agent 定义

```yaml
name: my-agent
description: 我的自定义 Agent
mode: subagent
model: anthropic/claude-opus-4-5-thinking
temperature: 0.3
```

## 配置位置

Agent 配置文件保存在 `~/.config/opencode/agent/` 目录下。
