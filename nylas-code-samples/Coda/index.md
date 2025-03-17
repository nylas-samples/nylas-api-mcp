You did it! 🎉 You got through all the migration instructions!

The info below is some "good to know" information that you don't necessarily need to upgrade and migrate, but that you'll want to know for later.

### Tuning your queries

Service providers like Google and Microsoft implement strict [rate limiting](https://developer.nylas.com/docs/dev-guide/platform/rate-limits/). Because Nylas v3 queries providers directly, it's important that you make sure your API requests limit the amount of data they request so you don't hit these provider rate limits.

You can use filtering and query selection to limit both the number of objects Nylas queries, and the amount of data Nylas returns about those objects. For example, if you're searching for an event with a specific title, you would ignore other returned fields like the event description. To make an efficient query, you could use a `title=<Your title here>` query parameter, and then use `select=title,id` to make sure Nylas only returns the information you need.

### Changes to metadata

In Nylas v2, you could add up to 50 pairs of arbitrary metadata key-pairs to Calendars, Events, and Messages, and use the keys as query parameters to filter data that Nylas returns. This sometimes led to high latency when returning results.

In v3, you can still add metadata key-pairs to Calendars and Events, but Nylas only indexes five specific keys: `key1`, `key2`, `key3`, `key4`, and `key5`. To continue using metadata filtering, you must write the values you want to filter by to the keys that Nylas indexes.

Nylas uses the `key5` value when calculating round-robin availability for events. If you're using round-robin scheduling, you might want to make a plan for how you distribute queryable metadata among the five keys.

You cannot use metadata filters with provider value filters, except for `calendar_id`.

### Terminology updates

We've taken the opportunity to clarify some of our language with Nylas v3:

- The **integration** object that you create in your Nylas application to store provider details is now called a **connector**.
- **Provider integration applications** are now called **provider auth apps**.
- **Native authentication** is now **Custom authentication**.
- **Service accounts** (sometimes called "app permissions") are now **bulk authentication grants**.
- The `redirect_uri` set in Nylas applications that use Hosted auth is now called the `callback_uri`. This helps to distinguish it from the Nylas `redirect_uri` set in provider auth apps.
- The `callback_uri` used by webhook subscriptions is now called `webhook_url`.

### Do your users need to re-authenticate?

When you migrate from Nylas v2 to v3, some end users will be able to log in right away, and some will need to re-authenticate.

- When you create a connector for a new provider such as iCloud, Yahoo, or Exchange on-prem.
- When you upgrade a Microsoft account's scopes from Exchange scopes to Graph scopes.
  - If the account used token auth, they just need to refresh their account.
  - If the account used password auth, they must fully re-authenticate.
- When you change the scopes you request for your Google or Microsoft provider auth app.
