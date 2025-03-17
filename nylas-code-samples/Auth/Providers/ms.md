Nylas v3 includes the following changes that require you modify your Azure auth app before you can re-authenticate your end users:

- The **Authorized redirect URIs** for Hosted Auth have been updated in v3.
  - **U.S.**: `https://api.us.nylas.com/v3/connect/callback`
  - **E.U.**: `https://api.eu.nylas.com/v3/connect/callback`
- Nylas v3 no longer uses "Nylas scopes", and uses Microsoft's scopes instead.

### Update authorized redirect URIs in Azure app

For all Azure auth apps that you want to connect to Nylas v3, the authorized redirect URIs for Hosted Auth have been updated. Add one, or both, of the following to the **Authorized redirect URIs** section of your Azure app:

- **U.S.**: `https://api.us.nylas.com/v3/connect/callback`
- **E.U.**: `https://api.eu.nylas.com/v3/connect/callback`

### Calculate v3 scopes for Azure app

In v3, Nylas no longer uses "Nylas scopes", but directly uses Microsoft's scopes instead. Make a list of the v2 API endpoints your project uses, then read the [v3 scopes documentation](https://developer.nylas.com/docs/v3/auth/v3-scopes/) to determine the scopes you need for v3.

When you know what v3 scopes you need, add them to your Azure auth app's Entra ID system (previously "Azure ID"). For more information, see Microsoft's official [Configure Azure AD Graph permissions for an app registration guide](https://learn.microsoft.com/en-us/graph/migrate-azure-ad-graph-configure-permissions).

### Do I need to re-verify my Azure app?

_In general_, you shouldn't need to re-verify your Azure app unless you're adding new features to your project. However, some items might require changes if your app doesn't already include their scopes:

- **If you're using Microsoft Hosted OAuth in v2 _without_ Graph scopes**, you might need to re-verify when you migrate to Graph scopes.
  - Nylas recommends you migrate to Graph scopes using a new Azure auth app, so you can switch over without disrupting your end users' workflows.
- **If you use `thread.replied` webhook notifications**, these now use the `email.read` scope in v3, instead of the v2 `email.metadata` scopes.
- **If you use the Contacts APIs and want to use domain-level or inbox contacts**, you might need to add some scopes. If you use address book contacts only, you don't need to make any changes.

### Changes to Microsoft auth features

- The only EWS account type that Nylas v3 supports is **Exchange on-premises**. Other EWS accounts (personal accounts on Hotmail, Office 365, Live, and Outlook) must complete a fresh authentication flow using the Microsoft connector, which upgrades them to use Graph scopes.
- Nylas no longer supports Exchange on-premises service accounts.
- Nylas now supports **Account in any organizational directory and personal Microsoft accounts**. This allows end users to authenticate using their personal accounts.
