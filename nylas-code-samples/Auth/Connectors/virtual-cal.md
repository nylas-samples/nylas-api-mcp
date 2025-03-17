You need to create a Virtual Calendar connector before you can create or work with Nylas virtual calendars. Each Nylas application that uses Virtual Calendars needs its own Virtual Calendar connector.

To create a Virtual Calendar connector, make a [`POST /v3/connectors` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors) and set `provider` to `virtual-calendar`.

You can also do this from the v3 Dashboard by clicking **Connectors** and then the **+** button next to Virtual Calendars.
