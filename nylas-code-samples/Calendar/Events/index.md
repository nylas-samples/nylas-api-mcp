## Changes to Events

Nylas v3 includes the following changes to the Events API:

- The format for event start and end times has been simplified.
  - The `starts_before`, `starts_after`, `ends_before`, and `ends_after` parameters have been simplified to only two variables: `start` and `end`. `start` is equivalent to `ends_after` and `end` is equivalent to `starts_before`. When you use either in a query, an Event is returned if any part of it occurs between the `start` and `end` times.
- The following are added in v3:
  - `order_by` query parameter for all Events `GET` calls.
  - `html_link` property for all Events `GET` calls.
  - `capacity` property for all Events calls.
- The following are removed in v3:
  - `event_id` query parameter for `GET` calls.
  - `updated_at_before` property for `GET` calls.
  - `participants` query parameter for `GET` calls.
  - `customer_event_id` query parameter and property for all calls.
  - `notifications` property for `POST` and `PUT` calls.
  - `original_start_time` property for `GET` calls.
  - `organizer_email` property for `GET` calls.
  - `organizer_name` property for `GET` calls.
  - `owner` property for `GET` calls.
  - `message_id` for property `GET` calls.
  - `recurrence.timezone` property for `GET` calls.
- The Generate ICS file endpoint (`POST /events/to-ics`) is not available.

### Changes to syntax

**Nylas v3 requires a calendar ID for almost all Events requests**, but also includes a new endpoint that you can use to return all calendars an end user has access to.

This means that you can no longer list all events from all calendars, and you must be able to identify which calendar an event is associated with in order to retrieve, update, or delete it. You can set the `calendar_id` to the end user's email address, or set it to `default` to select the default or main calendar for the end user on the service provider.

You can approach finding the calendar ID in the following ways:

- Get a list of all calendars for the grant ID, and find the ID of the calendar you want to work with, and use that.
- Use the `primary` parameter to specify the main calendar associated with the Grant on the service provider.
  - For virtual calendars, the `primary` calendar is the first calendar created for a grant, and it cannot be deleted.
  - iCloud calendars do not have a `primary` calendar, so you need to query for the ID first.

### New Events endpoints

- Send RSVP: [`POST /v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>/send-rsvp`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/events/-event_id-/send-rsvp)

### Migrated Events endpoints

- Return all events: `GET /events` → [`GET /v3/grants/<NYLAS_GRANT_ID>/events`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/events)
- Create an event: `POST /events` → [`POST /v3/grants/<NYLAS_GRANT_ID>/events`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/events)
- Return an event: `GET /events/<EVENT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/events/-event_id-)
- Update an event: `PUT /events/<EVENT_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/events/-event_id-)
- Delete an event: `DELETE /events/<EVENT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/events/-event_id-)
- Send RSVP: `POST /send-rsvp` → [`POST /v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>/send-rsvp`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/events/-event_id-/send-rsvp)
