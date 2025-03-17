## Changes to recurring events

Recurring events now use an array of `RRULE` and `EXDATE` strings. Recurring Events no longer accept a recurrence timezone, and instead use the timezone specified in your `when` object to calculate the time for event instances. The `when` object is a `time:` in epoch time, and a `timezone:` in [IANA format](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). See the [Recurring events](https://developer.nylas.com//docs/v3/calendar/schedule-recurring-events/) for more details.

### Architecture changes

Nylas v3 no longer syncs data from providers, but instead queries them directly. This means that  Nylas now relies on the provider as the source of truth, however some providers may require tuning to best handle their differing behavior. This is especially true for recurring events.
