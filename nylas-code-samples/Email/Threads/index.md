## Changes to Threads

Nylas v3 includes the following changes to the Threads API:

- All Threads endpoints now require a `grant_id`, an email address, or — if you're using access token authentication — the [`/me/` construction](https://developer.nylas.com/docs/api/v3/ecc/#overview--me-syntax-for-api-calls).
- You can now soft-delete threads.
- The `folder` object in all Threads now contains a list of `folder_id`s instead of an array of Folders.
- Support for the `view=expanded` query parameter is deprecated.

### New Threads endpoints

- Delete a thread: [`DELETE /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/threads/-thread_id-)

### Migrated Threads endpoints

- Return all threads: `GET /threads` → [`GET /v3/grants/<NYLAS_GRANT_ID>/threads`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads)
- Return a specific thread: `GET /threads/<THREAD_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads/-thread_id-)
- Update a specific thread: `PUT /threads/<THREAD_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/threads/-thread_id-)

### Changes to Threads response fields

Nylas v3 adds the following response fields for `/threads` requests:

- `latest_draft_or_message`: The most recent draft or email message in the thread.
- `has_drafts`: Indicates whether the thread has associated Drafts.

The following response fields have also been updated:

- `first_message_timestamp` → `earliest_message_date`
- `last_message_received_timestamp` → `latest_message_received_date`
- `last_message_sent_timestamp` → `latest_message_sent_date`
- `last_message_timestamp` → `latest_draft_or_message.date`
