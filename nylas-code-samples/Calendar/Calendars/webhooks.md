## Calendar webhook triggers

The webhook triggers for calendar notifications have not changed, however Nylas has changed the webhook notification format and some behavior.

Nylas now sends webhook notifications enriched with information about the object that changed, and does not send historical webhooks. See the [Webhooks changes in v3](https://developer.nylas.com/docs/new/in-v3/webhooks-changes/) for more information about the changes, and the [Calendar webhook schemas](https://developer.nylas.com/docs/v3/notifications/notification-schemas/#calendar-notifications) for more information.

Nylas v3 supports the following calendar webhook triggers:

- `calendar.created`
- `calendar.updated`
- `calendar.deleted`
