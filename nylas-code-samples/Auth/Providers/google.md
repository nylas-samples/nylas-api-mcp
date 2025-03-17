Nylas v3 includes the following changes to how Google Cloud Platform (GCP) auth apps are handled:

- The **Authorized redirect URIs** for Hosted Auth have been updated in v3.
  - **U.S.**: `https://api.us.nylas.com/v3/connect/callback`
  - **E.U.**: `https://api.eu.nylas.com/v3/connect/callback`
- Nylas v3 no longer uses "Nylas scopes", and uses Google's scopes instead.

### Update authorized redirect URIs in GCP app

For all GCP auth apps that you want to connect to Nylas v3, the authorized redirect URIs for Hosted Auth have been updated. Add one, or both, of the following to the **Authorized redirect URIs** section of your GCP app:

- **U.S.**: `https://api.us.nylas.com/v3/connect/callback`
- **E.U.**: `https://api.eu.nylas.com/v3/connect/callback`

### Calculate v3 scopes for GCP app

In v3, Nylas no longer uses "Nylas scopes", but directly uses Google's scopes instead. Make a list of the v2 API endpoints your project uses, then read the [v3 scopes documentation](https://developer.nylas.com/docs/v3/auth/v3-scopes/) to determine the scopes you need for v3.

When you know what v3 scopes you need, add them to your GCP app.

### Do I need to re-verify my GCP app?

_In general_, you shouldn't need to re-verify your GCP app unless you're adding new features to your project. However, two items might require changes if your app doesn't already include their scopes:

- **If you use `thread.replied` webhook notifications**, these now use the `email.read` scope in v3, instead of the v2 `email.metadata` scopes.
- **If you use the Contacts APIs and want to use domain-level or inbox contacts**, you might need to add some scopes. If you use address book contacts only, you don't need to make any changes.
