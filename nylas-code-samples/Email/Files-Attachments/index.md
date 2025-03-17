**In v3, "Files" are now called "Attachments"**. Be sure to find all instances of the v2 `/files` endpoints in your code and change them to the appropriate v3 endpoints.

In Nylas v3, you use the Messages or Drafts APIs to add or remove attachments from a message payload, and use the Attachments APIs to download or get information about the attachments. [Learn more about working with attachments in v3](/docs/v3/email/attachments/).

### Migrated Attachments endpoints

- Return attachment metadata: `GET /files/<FILE_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/attachments/-attachment_id-)
- Download an attachment: `GET /files/<FILE_ID>/download` → [`GET /v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>/download`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/attachments/-attachment_id-/download)
