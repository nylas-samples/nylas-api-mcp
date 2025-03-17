If you get lots of Message or Event webhook notifications, you might want to [consider setting up PubSub channel](https://developer.nylas.com/docs/v3/notifications/pubsub-channel/) for these notifications _instead_ of using webhooks. PubSub channels are new in v3, and are ideal for projects where webhook volume, latency, or deliverability are concerns, or where your project requires deliverability guarantees.

A PubSub channel is separate from the PubSub topic you set up to get notifications about Google messages. The PubSub _topic_ improves Google's latency sending notifications _to_ your Nylas app, while the PubSub _channel_ allows you to _consume_ notifications.

:::info
🔍 **Good to know**: Although you set up the PubSub notification channel on Google Cloud, it can receive notifications about events on any of the providers Nylas supports - not just Google.
:::
