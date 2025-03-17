## Changes to Drafts

Nylas v3 includes the following changes to the Drafts API:

- All Drafts endpoints now require a `grant_id`, an email address, or — if you're using access token authentication — the [`/me/` construction](https://developer.nylas.com/docs/api/v3/ecc/#overview--me-syntax-for-api-calls).
- You can now send drafts.
- The `use_draft` parameter is now available for `POST` requests.
- Updated draft-related response fields in the Threads API:
  - Added `latest_draft_or_message` field.
  - Added `has_drafts` field.
  - Updated `last_message_timestap` field to be a `date` sub-field in the `latest_draft_or_message` object.

### New Drafts endpoints

- Send a draft: [`POST /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/drafts/-draft_id-)

### Migrated Drafts endpoints

- Return all drafts: `GET /drafts` → [`GET /v3/grants/<NYLAS_GRANT_ID>/drafts`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/drafts)
- Create a draft: `POST /drafts` → [`POST /v3/grants/<NYLAS_GRANT_ID>/drafts`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/drafts)
- Return a draft: `GET /drafts/<DRAFT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/drafts/-draft_id-)
- Update a draft: `PUT /drafts/<DRAFT_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/drafts/-draft_id-)
- Delete a draft: `DELETE /drafts/<DRAFT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/drafts/-draft_id-)
