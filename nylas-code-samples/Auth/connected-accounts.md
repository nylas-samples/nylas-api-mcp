### Connected Accounts changed to Grants

In Nylas v3, the concept of "grants" (as in, "the end user _granted_ you this access") replaces "connected accounts". This name better reflects the new offering and lays the groundwork for future enhancements and features.

- Nylas APIs now return a `grant_id` instead of an `account_id`.
- All Email, Calendar, and Contacts APIs include the `/v3/grants/<NYLAS_GRANT_ID>` prefix.
  - You can refer to an end user's grant using their `grant_id`, their email address, or (if you're using an access token for their grant), the `/me/` construction.
- The `account.invalid` webhook trigger is deprecated. You should subscribe to `grant.expired` instead.

### New Grants endpoints

- Update a grant: [`PATCH /v3/grants/<NYLAS_GRANT_ID>`](https://developer.nylas.com/docs/api/v3/admin/#patch-/v3/grants/-grantId-)
- Get the current grant: [`GET /v3/grants/me`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/grants/me)

### Migrated Accounts endpoints

- Return all grants: `GET /a/<NYLAS_CLIENT_ID>` → [`GET /v3/grants`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/grants)
- Return a specific grant: `GET /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/grants/-grantId-)
- Delete a grant: `DELETE /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>`](https://developer.nylas.com/docs/api/v3/admin/#delete-/v3/grants/-grantId-)

### Deprecated Accounts endpoints

- Cancel an account: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/downgrade`
- Reactivate an account: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/upgrade`
- Revoke all tokens: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/revoke-all`
- Return token information: `POST /a/<NYLAS_CLIENT_ID>/accounts/<NYLAS_ACCOUNT_ID>/token-info`
- Revoke an access token: `POST /oauth/revoke`
- Return account details: `GET /account`
