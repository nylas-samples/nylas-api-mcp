### Update contacts webhooks

Nylas v3 supports the following contacts webhook triggers:

- `contact.updated`
- `contact.deleted`

The `contact.created` webhook trigger is deprecated in v3 to maintain provider consistency. Instead, Nylas sends a `contact.updated` notification when an end user creates a contact. Be sure to update your subscriptions.

Nylas does not use the `.truncated` notification suffix for contacts.
