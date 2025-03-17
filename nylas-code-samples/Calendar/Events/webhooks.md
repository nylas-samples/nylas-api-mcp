## Event webhook triggers

The webhook triggers for calendar and events notifications have not changed, however Nylas has changed the webhook notification format and some behavior.

Nylas now sends webhook notifications enriched with information about the object that changed, and does not send historical webhooks. See the [Webhooks changes in v3](https://developer.nylas.com/docs/new/in-v3/webhooks-changes/) for more information about the changes, and the [Event webhook schemas](https://developer.nylas.com/docs/v3/notifications/notification-schemas/#event-notifications) for more information.

Nylas v3 supports the following event webhook triggers:

- `event.created`
- `event.updated`
- `event.deleted`

## Truncated event webhooks

The `.truncated` suffix is new in v3. Watch for it, because it indicates a data payload that exceeds a base limit of 1MB. You will want to re-query for additional data in that case only.
