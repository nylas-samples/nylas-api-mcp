## Changes to Search

- The `/messages/search` and `/threads/search` endpoints are deprecated. Instead, you can now include a URL-encoded provider query string in a [`GET /v3/grants/<NYLAS_GRANT_ID>/messages` request](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages) or a [`GET /v3/grants/<NYLAS_GRANT_ID>/threads` request](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads).
- You can search for email messages and threads on IMAP providers using all [standard SEARCH operators](https://datatracker.ietf.org/doc/html/rfc3501#section-6.4.4).
- You can include the `search_query_native` query parameter to add provider-specific search query strings to your criteria.
- Metadata is not supported.

### Migrated Search endpoints

- Search messages: `/messages/search` → [`GET /v3/grants/<NYLAS_GRANT_ID>/messages` request](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages)
- Search threads: `/threads/search` → [`GET /v3/grants/<NYLAS_GRANT_ID>/threads` request](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads)
