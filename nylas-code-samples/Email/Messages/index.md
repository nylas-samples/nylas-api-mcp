## Changes to Messages

Nylas v3 includes the following changes to the Messages API:

- All Messages endpoints now require a `grant_id`, an email address, or — if you're using access token authentication — the [`/me/` construction](https://developer.nylas.com/docs/api/v3/ecc/#overview--me-syntax-for-api-calls).
- You can now soft-delete email messages.
- The `folder` object in all Messages now contains a list of `folder_id`s instead of an array of Folders.

### New Messages endpoints

- Clean an email message: [`PUT /v3/grants/<NYLAS_GRANT_ID>/messages/clean`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/messages/clean)
- Delete an email message: [`DELETE /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/messages/-message_id-)
- Compose an email message: [`POST /v3/grants/<NYLAS_GRANT_ID>/messages/smart-compose`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/smart-compose)
- Compose a reply to a specific email message: [`POST /v3/grants/<NYLAS-GRANT_ID>/messages/<MESSAGE_ID>/smart-compose`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/-message_id-/smart-compose)

### Migrated Messages endpoints

- Return all email messages: `GET /messages` → [`GET /v3/grants/<NYLAS_GRANT_ID>/messages`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages)
- Return a specific email message: `GET /messages/<MESSAGE_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages/-message_id-)
- Update an email message: `PUT /messages/<MESSAGE_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/messages/-message_id-)
- Send an email message: `POST /send` → [`POST /v3/grants/<NYLAS_GRANT_ID>/messages/send`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/send)
