Virtual Calendars are much the same in Nylas v3, except that virtual calendars can now have a `primary` calendar, and can have up to 10 total calendars per account, and [a few other improvements](#general-changes-to-virtual-calendars).

Virtual calendars use the new v3 Nylas Calendar and Events APIs, and all Calendar-related endpoint changes in v3 API also apply to virtual calendars. To upgrade these APIs, use the Upgrade Calendar APIs instructions.

## Virtual calendar schema changes

The schema for the underlying virtual account has changed. The client ID is now passed in the API request, the `scopes` and `name` fields have been removed, the `provider` is now `virtual-calendar`, and the `email` string is now inside the `settings`.

```
{  //v2 virtual calendar account
  "client_id": "3",
  "provider": "nylas",
  "scopes": "calendar",
  "email": "virtual_account_unique_id",
  "name": "Virtual Calendar",
  "settings": {}
}
```

```
{ //v3 virtual calendar account
  "provider": "virtual-calendar",
  "settings": {
  "email": "virtual_account_unique_id" //a human-readable ID
  }
}
```

When you make new virtual accounts in the future, make sure the `email` string provides a clear description for the virtual account.

## Migrate virtual calendar data to v3

You can start by migrating your virtual calendar data to v3 to help you upgrade the rest of your project code. Start with a dev or test application so you don't disturb your production users.

Migrated virtual calendar event and calendar object IDs don't change. You can use the same IDs to reference the same events and calendars in your v3 app. Migrated virtual accounts keep the `email` from the v2 version, but are converted to a grant. Use the grant ID for the virtual account's grant to locate its calendar and event data.

When you're ready for your users to start switching to the v3 version, you can re-run the migration tool to catch up on any new or changed data since the initial sync.

### Changes to virtual calendar data during migration

The migration tool looks at your v2 virtual calendar data, transforms it into the v3 format, and copies it to the v3 systems. You can expect the following changes:

- When you migrate virtual calendar data using the [Nylas migration API](/docs/api/v3/migration/), Nylas saves the content of the `name` and `organizer` fields to the grant's metadata. If you need access to this metadata, contact Nylas Support.
- Other metadata from v2 is not migrated to v3.
- The v2 virtual account `name` and v2 event `organizer` are not supported in v3 Virtual Calendars. The v3 equivalent for the `organizer` field is the `email` string that you set when you created the virtual calendar.
- The `created_at` and `updated_at` timestamps are be updated for all events and calendars during migration.
- In v2, when a VC event is deleted, it was marked as `status=cancelled`, considered a soft delete. In v3, however, events are permanently deleted immediately.
- The v2 recurrence timezone is now part of the `when` property of v3 events. Timezones are not available for all-day events in v3, so Nylas drops the timezone when converting v2 all-day events to v3 format.
- The `read_only` field in v3 Virtual Calendars is always set to `null`.
- Reminders are not supported in v3 Virtual Calendars and are not migrated.

## General changes to virtual calendars

- Virtual calendars are no longer limited to one calendar per account (now called a grant). You can now have up to 10 calendars per grant, and you can still create as many grants as you need. You are still billed per grant.
- You create new grants using Custom auth and the `virtual-calendar` provider.
- In v3 new virtual accounts are created without any calendars so you can specify the `email` identifier and control which is set as `primary`. Create new virtual calendars for each grant using the `POST /v3/calendars` endpoint.
- You must provide an identifier when you create the Grant for virtual calendars. Previously this was optional. This can be any arbitrary string, and no longer needs to be in email address format.
- In v3 Nylas can set one calendar per account as the "primary" calendar, and you can use the word `primary` instead of a `calendar_id` in Calendar API calls. In virtual calendars, the `primary` calendar is the first calendar created for a grant. Once created, that first calendar cannot be deleted.
