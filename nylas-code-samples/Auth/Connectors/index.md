**In v3, "integrations" are now called "connectors**. These objects store information about auth providers for each Nylas application. All authentication types, including Custom auth (previously called "Native auth"), require connectors for each provider.

Each Nylas application can have only one connector per provider. If you're in a multi-tenant environment, you can use connector credentials with Google and Microsoft connectors to override connection information.

### New connector endpoints

- Return all connectors: [`GET /v3/connectors`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connectors)
- Return a specific connector: [`GET /v3/connectors/<PROVIDER>`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/connectors/-provider-)
- Create a connector: [`POST /v3/connectors`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors)
- Update a connector: [`PATCH /v3/connectors/<provider>`](https://developer.nylas.com/docs/api/v3/admin/#patch-/v3/connectors/-provider-)
- Delete a connector: [`DELETE /v3/connectors/<provider>`](https://developer.nylas.com/docs/api/v3/admin/#delete-/v3/connectors/-provider-)

### Migrated integrations endpoints

- Detect provider: `POST /connect/detect-provider` → [`POST /v3/providers/detect`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/providers/detect)
