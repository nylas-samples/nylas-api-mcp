## Changes to Calendars

Nylas v3 includes the following changes to the Calendars API:

- All Calendar call responses now include the `is_owned_by_user` property.

### Migrated Calendars endpoints

- Return all calendars: `GET /calendars` → [`GET /v3/grants/<NYLAS_GRANT_ID>/calendars`](https://developer.nylas.com//docs/api/v3/ecc/#get-/v3/grants/-grant_id-/calendars)
- Create a calendar: `POST /calendars` → [`POST /v3/grants/<NYLAS_GRANT_ID>/calendars`](https://developer.nylas.com//docs/api/v3/ecc/#post-/v3/grants/-grant_id-/calendars)
- Return a calendar: `GET /calendars/<CALENDAR_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID>`](https://developer.nylas.com//docs/api/v3/ecc/#get-/v3/grants/-grant_id-/calendars/-calendar_id-)
- Update a calendar: `PUT /calendars/<CALENDAR_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID>`](https://developer.nylas.com//docs/api/v3/ecc/#put-/v3/grants/-grant_id-/calendars/-calendar_id-)
- Delete a calendar: `DELETE /calendars/<CALENDAR_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID>`](https://developer.nylas.com//docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/calendars/-calendar_id-)
- Check a calendar for availability: `POST /calendars/availability` → [`POST /v3/calendars/availability`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/calendars/availability)
- Check a calendar for free/busy status: `POST /calendars/free-busy` → [`POST /v3/grants/<NYLAS_GRANT_ID>/calendars/free-busy`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/calendars/free-busy)

### Deprecated Calendars endpoints

- Get availability for multiple consecutive meetings: `POST /calendars/availability/consecutive`
