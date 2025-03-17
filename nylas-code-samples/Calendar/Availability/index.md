
### Changes to Calendar availability

- Round-robin now uses the value of the Nylas `key5` metadata to indicate Events to consider when calculating the next available time among group members. Set `key5` to a specific string to mark events to consider when calculating a round robin order.
- Some fields have been renamed for clarity. See [Check calendar availability](https://developer.nylas.com/docs/v3/calendar/calendar-availability/), and the [v3 Availability reference](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/calendars/availability) for more details.
- [`POST /v3/calendars/availability` requests](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/calendars/availability) do not require a grant ID or calendar ID because you can specify multiple participants to check for availability.
- You can no longer use a `free_busy` object to override or add busy data to an Availability request.
- `time_slots` and `tentative_busy` parameters are removed for all Availability calls.

#### Deprecated Availability endpoints

- Get availability for multiple consecutive meetings: `POST /calendars/availability/consecutive`
