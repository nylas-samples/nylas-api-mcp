The Calendar and Events endpoints are available for Google, Microsoft Graph, iCloud, Exchange on-prem, and Virtual Calendars.

Nylas v3 includes the same basic ability to create, read, update, and delete both Events and Calendars (which contain Events). It also includes the following changes:

- You now need a `calendar_id` for almost all calls to Events endpoints. You can specify it in one of the following ways:
  - Using the `primary` parameter to specify the primary calendar for the grant.
  - Look up and use the ID of the calendar that you want to work with.
- You can now specify open hours by adding the `default_open_hours` parameter to the `availability_rules` object.
  - You can override the default settings by specifying a different availability for each participant.
- Round-robin availability now uses the Nylas `key5` metadata to indicate events that Nylas should consider when calculating the next available time amongst a group of participants.
- The format for event start and end times has been simplified.
- The format for recurring events has been simplified.
  - Recurring events no longer accept a recurrence time zone, and instead use the time zone specified in the `when` object to calculate the time for each event instance.
- You can now list all calendars and events for a specific grant.
  