The Nylas Microsoft connector (`provider: microsoft`) allows end users to authenticate with several different Microsoft services so they can connect to your project. However, Microsoft no longer supports Exchange servers, and end users cannot auth with them using Nylas v3.

To authenticate end users who use Exchange on-premises services for email _and_ calendar, you must [create a separate EWS connector](https://developer.nylas.com/docs/dev-guide/provider-guides/exchange-web-services/).

If you use Exchange on-premises services for email _only_ and your project doesn't need to use the Nylas Calendar APIs, you can authenticate using an IMAP connector instead.

Nylas no longer supports Exchange on-premises _service_ accounts. Personal accounts on Hotmail, Live, and Outlook must start a new authentication using the Microsoft connector instead of Exchange.
