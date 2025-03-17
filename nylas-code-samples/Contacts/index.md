## Changes to Contacts

Nylas v3 includes the following changes to the Contacts API:

- Contacts are now returned as JSON objects, instead of being listed as comma-separated values.
- All Contacts endpoints now require a `grant_id`, an email address, or — if you're using access token authentication — the [`/me/` construction](https://developer.nylas.com/docs/api/v3/ecc/#overview--me-syntax-for-api-calls).
- You might need to add scopes to access domain-level or inbox contacts. If you use only contacts from address books, you don't need to make any changes.
  - To access contacts parsed from an end user's inbox, use the `inbox` source and request the `contacts.other.readonly` Google scope or `People.Read` Microsoft scope.
  - To access contacts parsed from an end user's domain address book, use the `domain` source and request the `directory.readonly` Google scope or `People.Read` Microsoft scope.
- Nylas polls for changes to contacts for Google accounts in five-minute intervals.

### Migrated Contacts endpoints

- Return all contacts: `GET /contacts` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts)
- Create a contact: `POST /contacts` → [`POST /v3/grants/<NYLAS_GRANT_ID>/contacts`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/contacts)
- Return a contact: `GET /contacts/<CONTACT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts/-contact_id-)
- Update a contact: `PUT /contacts/<CONTACT_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/contacts/-contact_id-)
- Delete a contact: `DELETE /contacts/<CONTACT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/contacts/-contact_id-)
- Return all contact groups: `GET /contacts/groups` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts/groups`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts/groups)

### Deprecated Contacts endpoints

The v2 `GET /contacts/<CONTACT_ID>/picture` endpoint has been deprecated. Instead, you can now include the `?profile_picture=true` query parameter in a [Get Contact request](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts/-contact_id-).
