The first step for every project migrating from Nylas v2.x to v3 is to assess and upgrade your authentication systems. When you have your auth systems working in v3, you can then test and upgrade your other code and systems.

### Check for compatibility

Before you upgrade your authentication systems, check if you're using any of the methods that are no longer supported in Nylas v3:

- **No support for unsecured HTTP**: Nylas no longer supports unsecured connections over HTTP (port 80). You must now use HTTPS (port 443).
- **No support for Basic auth**: Nylas no longer supports Basic authentication, and instead uses Bearer auth with either an access token or API key. If you haven't already updated your code to use Bearer auth, you must do that before you can use v3.
- **No support for server-side hosted auth**: Nylas v3 no longer supports server-side hosted authentication. You must use the new Hosted OAuth method.

If you're using any of these methods, you must update them or migrate to a more modern version before you proceed.
