### (Maybe don't) create a Yahoo connector (right now)

A new Yahoo OAuth method is available that _greatly_ improves Yahoo performance and reliability. However, this new method requires that you create a new Yahoo OAuth application - and this might take a week or more.

For now, we recommend you use the IMAP connector to authenticate users, but put this on your To Do list post-upgrade.

When you've got your Yahoo OAuth app approved, you can make a [`POST /v3/connectors` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/connectors) and set the `provider` to `yahoo`.
