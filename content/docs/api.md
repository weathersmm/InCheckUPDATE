---
title: API Documentacion - InCheck AI
layout: documentation
---

# InCheck AI Chat API Documentation

## Overview

The **InCheck AI Chat API** provides access to medical AI assistance for **emergency medical services (EMS)** professionals. This API allows you to send chat messages and receive AI-powered responses specific to your **scope of practice** and **state regulations**.

-----

### Authentication

All API requests require authentication using a **Bearer token** in the `Authorization` header.

**Contact InCheck AI to obtain your API key.**

`Authorization: Bearer YOUR_API_KEY`

-----

### Base URL

`https://api.incheck.ai`

-----

### Chat Endpoint

**POST** `/chat`

Send a chat message and receive an AI response.

### Request Format:

```bash
curl -X POST "https://api.incheck.ai/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "conversation_id": "conv-123",
    "user_id": "user-456", 
    "org_id": "your_org_id",
    "streaming": true,
    "content": "How do I perform a cricothyrotomy?",
    "scope": "ALS",
    "state": "Massachusetts",
    "conversation_hx": null
  }'
```

### Request Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `conversation_id` | string | **Yes** | Unique identifier for the conversation. |
| `user_id` | string | **Yes** | Your user identifier. |
| `org_id` | string | **Yes** | Your organization identifier. |
| `streaming` | boolean | No | Whether to stream the response (default: `true`). |
| `content` | string | **Yes** | Your message/question (1-10,000 characters). |
| `scope` | string | **Yes** | Your scope of practice (see available scopes below). |
| `state` | string | **Yes** | Your state/region (see available states below). |
| `conversation_hx` | string | No | Previous conversation context (can be `null`, max 50,000 characters). |

-----

### Available States

  * `California-LAC` - California - LA County
  * `California-OC` - California - Orange County
  * `California-SACRAMENTOC` - California - Sacramento County
  * `California-SOLANOC` - California - Solano County
  * `California-SONOMAC` - California - Sonoma County
  * `Connecticut` - Connecticut
  * `Massachusetts` - Massachusetts
  * `NewHampshire` - New Hampshire
  * `NewYork` - New York
  * `RhodeIsland` - Rhode Island
  * `Vermont` - Vermont

-----

### Available Scopes

| Scope | Description |
| :--- | :--- |
| `ALS` | Advanced Life Support |
| `BLS` | Basic Life Support |
| `AEMT` | Advanced Emergency Medical Technician |
| `CCT` | Critical Care Transport |
| `CC` | EMTCC (New York only) |
| `CTECH` | Cardiac Tech (Rhode Island only) |

### State-Specific Scope Availability

  * **New York:** `CC`, `ALS`, `BLS`, `AEMT`, `CCT`
  * **Rhode Island:** `CTECH`, `ALS`, `BLS`, `AEMT`, `CCT`
  * **All other states:** `ALS`, `BLS`, `AEMT`, `CCT`

-----

### Response Format

### Streaming Response (`streaming: true`)

The API returns **Server-Sent Events (SSE)** with the following format:

```
data: {"content": "Cricothyrotomy is an emergency"}
data: {"content": " airway procedure that should"}
data: {"content": " only be performed when..."}
data: {"type": "complete"}
```

### Non-Streaming Response (`streaming: false`)

```json
{
  "content": "Complete response text here...",
  "type": "complete"
}
```

-----

### Example Usage

### Basic Question

```bash
curl -X POST "https://api.incheck.ai/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "conversation_id": "conv-001",
    "user_id": "medic-123",
    "org_id": "fire-dept-01", 
    "streaming": false,
    "content": "What are the contraindications for epinephrine?",
    "scope": "ALS",
    "state": "Massachusetts"
  }'
```

### Follow-up Question with Context

```bash
curl -X POST "https://api.incheck.ai/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "conversation_id": "conv-001",
    "user_id": "medic-123", 
    "org_id": "fire-dept-01",
    "streaming": true,
    "content": "What about pediatric dosing?",
    "scope": "ALS", 
    "state": "Massachusetts",
    "conversation_hx": "Previous discussion about epinephrine contraindications..."
  }'
```

-----

### Error Responses

The API returns standard HTTP status codes:

  * **`400`** - Bad Request (invalid parameters)
  * **`401`** - Unauthorized (invalid API key)
  * **`403`** - Forbidden (access denied)
  * **`429`** - Rate Limited (too many requests)
  * **`500`** - Internal Server Error

-----

### Rate Limits

API usage is subject to rate limiting. Contact InCheck AI for details about your specific rate limits.

-----

### Getting Started

1.  Contact InCheck AI to obtain your API key and organization ID.
2.  Choose your **scope** and **state** from the available options above.
3.  Start making requests using the examples provided.
4.  Use `conversation_hx` to maintain context across multiple messages in a conversation.

-----

### Support

For API keys, technical support, or questions about usage, contact InCheck AI through our official channels.