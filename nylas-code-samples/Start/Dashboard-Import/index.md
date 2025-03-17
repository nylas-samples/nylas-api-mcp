:::warn
⚠️ **You can only import a v2 application into a v3 application in the same data center region**. You cannot use the Import tools to move a v2 application to a different region.
:::

1. Go to the [Nylas v3 Dashboard](https://dashboard-v3.nylas.com/?utm_source=migration-station&utm_medium=devrel-surfaces&utm_campaign=migration-station&utm_content=one-click-migrate) and log in as an admin user.
   Only administrators can migrate v2 applications.
2. Find the v2 app you want to migrate. It'll be marked `Legacy`.
3. Click **Migrate app** next to that legacy app to create a new v3 application.
4. In the dialog, confirm the title and the environment tag (Development, Stating, Production), and optionally add a description.
5. Click **Create app**. Nylas copies your v2 connector data to the v3 application and starts migrating connected accounts.

   After you start a migration, Nylas brings you back to the application list. The migration process is asynchronous, and you can continue working on other things while Nylas works.

   The v3 version of the application appears in the list with a `Migrated` label. The info icon shows the v2 application ID that the v3 app is based on. You can click the v3 application and go to the **Grants** page to see the migration progress.

6. After you start the migration, go to your v3 application, and check the list of migrated connectors to make sure it looks complete. If you need to do additional steps for specific providers, they are covered later in this guide.
7. Continue following the rest of the instructions in this guide. The account migration might take some time. (If you're already done with the rest of your migration, have a ☕️ and maybe even some 🍰 to celebrate! You're almost done.)
8. When Nylas finishes migrating accounts to Grants, the Grants page for the new v3 application shows progress as 100%. You can then download a CSV report of the migration details, including any accounts that could not be migrated and the error Nylas encountered.

:::success
👀 **Good to know:** The Nylas migration job marks an account migration as `failed` if it was unable to import and create a grant for that account. However, for many of these cases, the user can still start a completely new authentication on the v3 system to use your application. This is expected in the case of Microsoft accounts that used Exchange, such as personal accounts on Hotmail, Live, and Outlook.
:::
