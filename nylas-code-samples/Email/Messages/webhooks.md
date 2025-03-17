### Changes to Messages webhooks

Nylas v3 supports the following webhook triggers from v2:

- `message.created`
- `message.updated`

#### Truncated webhook notifications

If the object returned in a `message.created` or `message.updated` notification is larger than 1MB, Nylas v3 omits the large fields and adds the `.truncated` suffix to the notification (for example, `message.created.truncated`). When you get a `.truncated` notification, you might want to re-query if the omitted data is important to your project's workflow.

Nylas might send you `.truncated` notifications if you subscribe to `message.created` or `message.updated` triggers, so make sure your webhook processor can handle them. You can't subscribe to `.truncated` triggers separately, and they aren't a subscription option in the v3 Dashboard webhooks page.

### Provider limitations

iCloud, Yahoo, and IMAP providers can retrieve data for email messages that's up to 90 days old. For most providers, email message notifications are sent in real-time, but Yahoo and AOL accounts might take up to 5 minutes to deliver those notifications. Nylas does not send webhook notifications for changes to email messages (for example, folder changes) if the email message being updated is older than 90 days.
