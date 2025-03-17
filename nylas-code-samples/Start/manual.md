Nylas applications are the containers for your project's authentication configuration and general settings, and your end users' grants. Depending on how your project is organized, you might use separate Nylas applications to provide your end users with different experiences.

Nylas doesn't provide an API endpoint to create applications; you must create them using the v3 Nylas Dashboard. After they're created you can modify and interact with them using the [Administration APIs](https://developer.nylas.com/docs/api/v3/admin/#tag--Applications).

:::warn
⚠️ **Keep in mind**: You can create and manage legacy v2 Nylas applications from the v3 Dashboard, but you can't create or manage v3 applications from the v2 Dashboard.
:::

1. Log in to the v3 Dashboard.
2. Click **Create new app**.
3. Add a name for the application, and choose the data residency location.
4. Optionally, add a description and an environment label.
5. Click **Create app**.

Repeat this for each app you want to re-create.

At minimum, you should create a Nylas application for testing, and a separate production application.

This guide covers the rest of the upgrade process in the sections below.
