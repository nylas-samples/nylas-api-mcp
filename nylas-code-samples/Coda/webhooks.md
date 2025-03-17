These changes to webhooks are important to know about, but you don't _need_ to know about in order to migrate and update your code.

### New webhook utilities

Nylas API v3 introduces new Webhook endpoints to make testing and maintenance easier. Use these endpoints to quickly get a "test" payload, to see the IP addresses for your webhooks, and to rotate webhook credentials.

- [**Get Mock Payload**](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/mock-payload): Retrieve a mock webhook notification payload for testing purposes.
- [**Send Test Event**](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/send-test-event): Send a test event to a specific `webhook_url` so you can verify the webhook's functionality and responsiveness.
- [**Get IP Addresses**](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/webhooks/ip-addresses): Get a list of IP addresses associated with the specified webhook. Use this for allowlisting and other security purposes.
- [**Rotate webhook secret**](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/rotate-secret/-id-): Update the webhook secret used to encode the `X-Nylas-Signature` header on webhook requests, for enhanced security and authentication.

### Build v3 webhook infrastructure for scale

In general, you should prepare for changes in webhook notification size, which might mean you should [Build for scalability](https://developer.nylas.com/docs/dev-guide/best-practices/webhook-best-practices/#build-for-scalability).

Nylas also suggests you make the following changes to accommodate the v3 webhook infrastructure:

- Make sure the webhook listener that you subscribe to `message` and `event` triggers can handle webhook notification payloads up to 1MB in size. Changes to the v3 webhooks shouldn't drastically impact the number of notifications you get (unless your API v2 implementation uses historical webhooks), but it will change the amount of data processed for each notification.
  - Make sure that any systems that autoscale are prepared to accept and process larger webhook payloads. For more information, see [Build for scalability](https://developer.nylas.com/docs/dev-guide/best-practices/webhook-best-practices/#build-for-scalability).
  - You might want to run some tests using v3 webhooks to determine your average payload size.
- You can remove or adapt the logic you used to re-query the Nylas API for an object using its ID, and instead parse the webhook notification payload.
- You can adapt your re-query logic to listen for `.truncated` webhook triggers (for objects over 1MB in size), then query for the rest of the object's information as needed.
- No more historical sync means that if you previously used webhooks to access your end users' historical data, you must query for that data the first time an end user authenticates instead. You can use the `grant.created` webhook to listen for new grants so you can trigger the query logic.

### You can now rotate webhook signatures

In previous versions of the API, Nylas webhook destinations used HMAC-SHA256 signatures with your application's `client_secret` as the signing key.

In API v3, Nylas generates a new webhook secret for each webhook destination when it is created, and returns the value as `webhook_secret` in the success response. These webhook secrets are used as unique signing keys, and the signatures are still HMAC-SHA256-encoded.

You use the webhook secret to sign any requests you make to update the webhook. If you want to update a webhook secret, you can now make a `POST` request to the [Rotate Secret endpoint](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/rotate-secret/-id-).

See [Respond to webhook verification request](https://developer.nylas.com/docs/v3/notifications/webhooks/#respond-to-webhook-verification-request) for more details.

### Failed webhooks are no longer restarted

API v3 improves how Nylas handles webhook destinations that are `failing` or `failed`. You can read more about that [in the v3 Webhook documentation](https://developer.nylas.com/docs/v3/notifications/webhooks/#failing-and-failed-webhooks).

:::warn
⚠️ **Nylas API v3 does not automatically restart or reactivate webhook destinations in a "failed" state**. When you get a webhook failure notification, check your webhook listener, resolve any issues, and when you're confident that the issues have been resolved change the webhook's status to `active`.
:::

Nylas v3 also adds the `webhook_delivery_attempt` counter to the webhook notification payloads, so you can see how many times Nylas tried to deliver the notification.

### No webhook notifications for historic sync

Nylas no longer syncs data from before the user _first_ authenticated, and you don't get notifications for changes, messages, or calendar events that occurred _before_ the user authenticated.

Instead of relying on webhook notifications for historical data you can query the Nylas API endpoints after the user authenticates to get any historical data you need.

### Webhook notification backfill for expired grants

In v3, Nylas does _not_ send notifications for events that happened before an end user authenticated with your application for the first time. When an end user's grant expires, Nylas stops sending notifications for changes because it can no longer access the account's data.

If the grant expires then becomes valid _within 72 hours_, Nylas produces notifications for the period that the grant was out of service. You might get a high volume of incoming webhooks while Nylas syncs the events. See the [webhooks best practices guide](https://developer.nylas.com/docs/dev-guide/best-practices/webhook-best-practices/) for suggestions on how to prepare to process a large number of incoming webhooks.

If the grant expires and becomes valid _after_ that 72 hour period, Nylas does _not_ send backfill notifications for events that occurred while their grant was out of service. In this case, look for the `grant.expired` and `grant.updated` notifications and query the Nylas APIs for objects that changed between those timestamps.
