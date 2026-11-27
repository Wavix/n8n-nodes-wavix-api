# n8n-nodes-wavix-api

Send SMS from your n8n workflows with Wavix.

This is the official [Wavix](https://wavix.com) node for [n8n](https://n8n.io). We build and maintain it.

## Contents

- [What the node does](#what-the-node-does)
- [Before you start](#before-you-start)
- [Install](#install)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Send your first SMS](#send-your-first-sms)
- [Send SMS fields](#send-sms-fields)
- [Receive delivery statuses in n8n](#receive-delivery-statuses-in-n8n)
- [Use with AI agents](#use-with-ai-agents)
- [Troubleshooting](#troubleshooting)
- [Support](#support)
- [Resources](#resources)
- [Version history](#version-history)
- [License](#license)

## What the node does

- **Send SMS**: send a text message from your Wavix number or Sender ID.
- **Get SMS**: check a sent message's delivery status by its `message_id`.
- **Idempotency**: add an idempotency key to Send SMS, so a repeated run with the same key returns the first message and doesn't send a second one.
- **Delivery-status callbacks**: add a callback URL to Send SMS, and Wavix posts the message's delivery status to it.

## Before you start

You need:

- A [Wavix account](https://docs.wavix.com/getting-started/create-account). A sandbox account works.
- A number or Sender ID to send from. A sandbox account comes with a number.
- An [API key](https://docs.wavix.com/api-reference/authentication), created in the Wavix portal under **Administration** → **API Keys**.

## Install

In n8n, open the nodes panel, search for **Wavix**, and select **Install**. On a self-hosted instance, you can also follow the [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials

In n8n, create a **Wavix API** credential and paste your API key into **Access Token**.

## Compatibility

The node uses n8n Nodes API version 1.

## Send your first SMS

1. In n8n, create a workflow and add a **Manual Trigger** node.
2. Add the **Wavix** node and select your Wavix API credential.
3. Set **Operation** to **Send SMS**.
4. In **From**, enter your Wavix number or Sender ID, such as `+12015550123`.
5. In **To**, enter your own mobile number. In the sandbox, this must be your verified number.
6. In **Message Text**, enter `Hello from n8n`.
7. Select **Execute step**.

The node returns the message, including its `message_id` and a `status` of `accepted`. To check delivery, add a second Wavix node, set **Operation** to **Get SMS**, and enter the `message_id` in **SMS UUID**. The status moves from `accepted` to `sent` to `delivered`.

## Send SMS fields

| Field | Required | What it does |
| --- | --- | --- |
| From | Yes | The number or Sender ID the message is sent from |
| To | Yes | The recipient's phone number |
| Message Text | Yes | The text of the message |
| Idempotency | No | Set to **Custom** and enter a key to send it in the `Idempotency-Key` header |
| Callback URL | No | The URL that receives delivery-status callbacks for this message |

With an idempotency key, a repeated Send SMS with the same key and the same field values returns the first message and sends nothing. Use it when a workflow can run a step twice, such as with **Retry On Fail**. Wavix keeps a key for 24 hours. The same key with different field values returns a `409` error.

## Receive delivery statuses in n8n

1. In a separate workflow, add a **Webhook** node and set **HTTP Method** to **POST**.
2. Activate the workflow and copy the node's **Production URL**.
3. In the Wavix node, paste the URL into **Callback URL**.

Wavix posts to the URL when the message is sent or fails to send, and again when the final status is known: `delivered`, `undelivered`, or `rejected`. Each callback includes the `message_id`.

## Use with AI agents

The node works as a tool for n8n's **AI Agent** node. Connect it to the agent's **Tool** input, and the agent can send an SMS or retrieve a message.

## Troubleshooting

| What you see | What to check |
| --- | --- |
| `401 Unauthorized` | The API key in **Access Token** is wrong or deleted. Create a new key in the Wavix portal. |
| `403 Forbidden` | A restricted API key needs **Write** access to **Messages**. |
| The message is rejected in the sandbox | **To** must be your verified number until you go live. |
| An error about the Sender ID | The Sender ID must exist in your Wavix account and be available in the destination country. |
| No delivery callback arrives | The Webhook workflow must be active, and **Callback URL** must be the Production URL. |

For other errors, see the [SMS troubleshooting guide](https://docs.wavix.com/messaging/troubleshooting).

## Support

Email [support@wavix.com](mailto:support@wavix.com), or open an issue in the [GitHub repository](https://github.com/Wavix/n8n-nodes-wavix-api/issues).

## Resources

- [Send SMS messages](https://docs.wavix.com/messaging/send-sms)
- [Receiving message delivery reports](https://docs.wavix.com/messaging/webhooks-delivery-reports)
- [Wavix API reference](https://docs.wavix.com/api-reference/getting-started)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)

## Version history

This list has the versions published on npm. For changes that aren't released yet, see the [changelog](CHANGELOG.md).

- **0.1.4** (April 2026): updated operation and field descriptions.
- **0.1.2 and 0.1.3** (March 2026): first releases, with Send SMS and Get SMS.

## License

[MIT](LICENSE)
