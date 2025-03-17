## Changes to Outbox

The v3 Email API consolidates several v2 endpoints, and specifically replaces the v2.x `/outbox` endpoints with the `/v3/messages` endpoints.

To switch from using v2 Instant Send to v3 [Scheduled Send](https://developer.nylas.com/docs/v3/email/scheduled-send/), make a [`POST /v3/grants/<NYLAS_GRANT_ID>/messages/send` request](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/send) that includes the time when you want Nylas to send the email message.

### New Scheduled Send endpoints

- Return a specific scheduled email message: [`GET /v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages/schedules/-scheduleId-)

### Migrated Outbox endpoints

- Return all scheduled email messages: `GET /outbox` → [`GET /v3/grants/<NYLAS_GRANTID>/messages/schedules`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages/schedules)
- Cancel scheduled send instructions: `DELETE /outbox/<SCHEDULE_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/messages/schedules/-scheduleId-)
