The [Nylas Migration APIs](https://developer.nylas.com/docs/api/v3/migration/) help you migrate your application and end-user data from Nylas v2 to v3. This section is intended to help you [upgrade the rest of your application](https://developer.nylas.com/docs/v2/upgrade-to-v3/) to Nylas v3.

:::warn
⚠️ **The Migration APIs are for one-time translation of data and objects from v2 to v3**. You can retry API calls if you run into issues, but they will be rate-limited, and you _should not_ use them as part of your project's code or object handling logic.
:::

Before you begin...

- Make sure your v2 and v3 Nylas organizations are linked. If they're correctly linked, you can see all your legacy v2 Nylas applications from both regions in the v3 Dashboard.
  - If you don't see all of your legacy applications on the Dashboard, [contact Nylas Support](https://support.nylas.com/hc/en-us/requests/new?ticket_form_id=360000247971).
- Create a v3 Nylas application for each v2 application you plan to migrate.

### Migrate your Nylas implementation

:::warn
⚠️ **Make sure you use the correct region!** In Nylas v3, you manage both your U.S. and E.U. applications using the same Dashboard. Make sure you select the same region as the corresponding v2 application when you create a v3 application.
:::

Now that you're set up, it's time to migrate your data:

1. Make a [`POST /v3/migration-tools/link-v2v3-apps` request](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/link-v2v3-apps) to link a v2 application to its equivalent v3 application.
2. Make a [`POST /v3/migration-tools/import-v2-app` request](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/link-v2v3-apps) to migrate your v2 Integrations to v3 Connectors, and copy other important application settings.
3. Make any necessary changes to your provider auth apps. This will be covered later in the guide, but you can return to this section when you complete the process.
4. Configure your connectors. (This is also covered later in the guide.)
5. **Subscribe to v3 notification triggers** (using either webhooks or Pub/Sub) so you can keep track of any objects that change while you're migrating.
6. Make a [`POST /v3/migration-tools/grants/<NYLAS_ACCOUNT_ID>/clone` request](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/grants/-account_id-/clone) to test migrating a single account at a time.
    - You can use this migrated account to do initial testing on your webhooks and other API settings before you migrate more end users.
7. When you're ready to migrate more end-user information, make a [`POST /v3/migration-tools/snapshot-batch-clone` request](https://developer.nylas.com/docs/api/v3/migration/#post-/v3/migration-tools/snapshot-batch-clone) to migrate all of your v2 Connected Accounts to v3 Grants.
    - Migrated grants are de-duplicated with your v2 connected accounts, so they're counted as one account for billing purposes.
8. Upgrade your project code to use the Nylas v3 APIs and systems.
    - Make sure you update your login page to use v3 authentication, so end users can seamlessly use v3 when they re-authenticate!
