---
title: "用 AI 点瑞幸咖啡：MCP 接入教程"
description: "瑞幸咖啡 AI 开放平台上线了，支持 MCP、CLI、Skill 三种方式接入。本文手把手教你把瑞幸 MCP 接入 AI 助手，实现一句话下单。"
pubDate: 2026-06-12
updatedDate: 2026-06-12
tags: ["MCP", "AI", "瑞幸", "教程"]
important: false
---

瑞幸咖啡最近上线了 AI 开放平台，支持 MCP、CLI、Skill 三种方式接入，让 AI 助手帮你点咖啡。本文介绍如何通过 MCP 方式接入，实现一句话下单。

## 背景

MCP（Model Context Protocol）是一种标准化协议，让 AI 助手可以调用外部服务。瑞幸的 MCP 服务暴露了 8 个工具，包括搜索门店、浏览菜单、下单、支付等能力，登录状态可保留 30 天。

目前支持三种接入方式：

| 方式 | 适合人群 | 特点 |
|------|---------|------|
| MCP | 开发者 | 标准协议，接入成本低 |
| CLI | 极客 | 一行命令下单 |
| Skill | 普通用户 | 给 Siri/小爱装技能包 |

本文聚焦 MCP 方式。

## 接入步骤

### 第一步：打开瑞幸开放平台

- 浏览器搜索"瑞幸开放平台"
- 或直接访问 https://open.lkcoffee.com/

### 第二步：登录账号

1. 点击右上角"登录"
2. 输入瑞幸账号手机号
3. 获取并输入短信验证码
4. 完成登录

### 第三步：获取 MCP 配置

1. 登录后进入 AI 控制台
2. 找到"Token"区域，点击"创建或者查看 Token"
3. 找到"复制 MCP 配置 JSON"按钮，点击复制

复制出来的配置大概长这样：

```json
{
  "mcpServers": {
    "luckin-coffee": {
      "url": "https://gwmcp.lkcoffee.com/order/user/mcp",
      "headers": {
        "Authorization": "Bearer <你的token>"
      }
    }
  }
}
```

### 第四步：配置你的 AI 助手

把复制的配置发送给你的 AI 助手（比如小龙虾、Claude Desktop、Cursor 等），按照提示完成配置。

以 Claude Desktop 为例：

1. 打开 Claude Desktop 设置
2. 找到 MCP Servers 配置
3. 粘贴刚才复制的 JSON
4. 重启 Claude Desktop

### 第五步：下单

配置完成后，直接跟 AI 说你想喝什么：

- "帮我点一杯冰美式"
- "来杯生椰拿铁，大杯少冰"
- "附近有什么推荐的？"

AI 会自动搜索门店、匹配优惠券，确认后跳转支付。

## 注意事项

**1. 踩坑：switchProduct 接口不通**

想换杯型、糖度、温度？目前 `switchProduct` 接口返回"非法参数"，建议直接在下单时说明需求，或者拿到手再改。

**2. 配送？目前没有**

文档里写了配送相关字段，但实际走的是自取。传不传坐标都一样。

**3. Token 有效期 30 天**

Token 有效期约 30 天，过期后需要重新登录获取。

**4. 只能用默认规格下单**

目前只能用默认规格（大杯/冰/无糖）下单，定制化功能还没到位。

**5. 部分 AI 客户端兼容性问题**

瑞幸服务端用的是 Java MCP SDK，部分客户端（如 Hermes Agent）在初始化握手时可能报错。如果遇到连接失败，可以在配置里禁用 sampling：

```json
{
  "mcpServers": {
    "luckin-coffee": {
      "url": "https://gwmcp.lkcoffee.com/order/user/mcp",
      "headers": {
        "Authorization": "Bearer <你的token>"
      },
      "sampling": {
        "enabled": false
      }
    }
  }
}
```

## 相关链接

- 瑞幸 AI 开放平台：https://open.lkcoffee.com/
- MCP 文档：https://open.luckincoffee.com/mcp
- CLI 文档：https://open.lkcoffee.com/cli

## 总结

瑞幸的 MCP 服务是一个方向正确但还在早期的产品。核心的下单链路已经跑通，但定制化、配送等关键功能还没到位。对于想体验 AI 点单的开发者，现在是入坑的好时机。

> Token 价格跟咖啡差不多，体验没有显著差异提升，反而不如手机小程序直观。但对于技术探索来说，这是一次有趣的尝试。
