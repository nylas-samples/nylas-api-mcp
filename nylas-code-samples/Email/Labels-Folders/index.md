**In v3, Folders and Labels are consolidated as Folders**. Be sure to find all instances of the v2 `/labels` endpoints and `labels` objects in your code and update them to `folders`.

Nylas v3 also includes the following changes to folders and labels:

- Folders and Labels have been consolidated.
  - `folder` → `folders` for all Messages and Threads requests.
  - `labels` → `folders` for all Messages and Threads requests.
- The `folder` object in all Messages and Threads now contains a list of `folder_id`s instead of an array of Folders.

### Migrated Folders endpoints

- Return all folders/labels: `GET /folders`, `GET /labels` → [`GET /v3/grants/<NYLAS_GRANT_ID>/folders`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/folders)
- Create a folder/label: `POST /folders`, `POST /labels` → [`POST /v3/grants/<NYLAS_GRANT_ID>/folders`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/folders)
- Return a folder/label: `GET /folders/<FOLDER_ID>`, `GET /labels/<LABEL_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/folders/-folder_id-)
- Update a folder/label: `PUT /folders/<FOLDER_ID>`, `PUT /labels/<LABEL_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/folders/-folder_id-)
- Delete a folder/label: `DELETE /folders/<FOLDER_ID>`, `DELETE /labels/<LABEL_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/folders/-folder_id-)
