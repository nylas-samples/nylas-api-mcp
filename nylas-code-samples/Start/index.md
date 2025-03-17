#### Changes to API format and use

- The Nylas API endpoints have changed for v3:
  - `api.nylas.com` → `api.us.nylas.com`
  - `canada.api.nylas.com` → `api.us.nylas.com`
  - `ireland.api.nylas.com` → `api.eu.nylas.com`
- All Nylas traffic now goes through HTTPS (port `443`), and Nylas no longer supports HTTP (port `80`).
- The Nylas API no longer honors the `Nylas-API-Version` header.
- Endpoint URIs now include the Nylas API version (for example, `GET /v3/applications`).
- URIs for endpoints that act on an end user's data include a `/grants/<NYLAS_GRANT_ID>` prefix that serves as a record locator (for example, `POST /v3/grants/<NYLAS_GRANT_ID>/calendars`).
- Nylas v3 retrieves data directly from the service provider, and references it using the provider's object IDs.
  - Nylas no longer generates a "Nylas ID" for objects. If your project uses Nylas IDs to keep track of objects, you can use the [`POST /v3/migration-tools/translate` endpoint](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/translate) to update object IDs in your database.

#### Upgrading to Bearer token authentication

Nylas v3 supports `Authorization: Bearer <TOKEN>` only. You can no longer authenticate end users using `Authorization: <TOKEN>` or `Authorization: Basic <BASE64_ENCODED_TOKEN>`.

You can authenticate using either the secret from an application-wide API key (generated in the v3 Nylas Dashboard), or the short-lived access token for an individual end user (returned as part of a successful authentication).

#### Use API key instead of Client Secret

The v3 Nylas Dashboard only displays the `client_id` for Nylas applications.

Where you would previously have used the Nylas application's `client_secret` in API requests, you now use an _API key secret_.

#### Grants replace Connected Accounts

Nylas v3 replaces "connected accounts" with "grants" (as in, "the end user _granted_ you access to their data"). Because of this, Nylas v3 returns a `grant_id` instead of an `account_id` in responses.

If you're authorizing requests using an API key, you can reference a specific grant using either its `grant_id` or the associated email address.
If you're authorizing requests using an end user's access token, you can use the [`/me/` construction](https://developer.nylas.com/docs/api/v3/ecc/#overview--me-syntax-for-api-calls) to refer to the grant associated with the token (for example, `GET /v3/grants/me/messages`).

#### Provider scopes replace Nylas scopes

Nylas v3 removes the [Nylas scopes abstraction](https://developer.nylas.com/docs/v2/developer-guide-v2/authentication/authentication-scopes/), and instead uses provider scopes to control your application's access to end-user data.

You can either create a login button for each provider that your application supports, or use the [`POST /v3/providers/detect` endpoint](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/providers/detect) to determine which provider an end user is trying to authenticate with, so you can request the correct set of provider scopes.

#### Changes to pagination

Nylas v3 replaces the `offset` parameter with the new `cursor` query parameter, and changes the default page size to 50. For more information, see the [Pagination reference](https://developer.nylas.com/docs/api/v3/ecc/#overview--pagination).
