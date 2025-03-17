### Update a specific folder

`PUT /folders/<FOLDER_ID>`, `PUT /labels/<LABEL_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/folders/-folder_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function updateFolder() {
  try {
    const folder = await nylas.folders.update({
      identifier: process.env.NYLAS_GRANT_ID,
      folderId: process.env.FOLDER_ID,
      requestBody: {
        name: "Updated Folder Name",
        textColor: "#000000",
        backgroundColor: "#434343",
      }
    })

    console.log('Updated Folder:', folder)
  } catch (error) {
    console.error('Error to update folder:', error)
  }
}

updateFolder()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class UpdateLabel {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    UpdateFolderRequest updateRequest = new UpdateFolderRequest.Builder().name("Renamed ").build();
    Response<Folder> folder = nylas.folders().update("<NYLAS_GRANT_ID>", "<FOLDER_ID>", updateRequest);
  }
}
```

```Python
from dotenv import load_dotenv
load_dotenv()

import os
import sys
from nylas import Client

nylas = Client(
    os.environ.get('NYLAS_API_KEY'),
    os.environ.get('NYLAS_API_URI')
)

grant_id = os.environ.get("NYLAS_GRANT_ID")

folder = nylas.folders.update(
    grant_id,
    folder_id=os.environ.get("FOLDER_ID"),
    request_body={
      "name": "Updated Folder Name",
      "text_color": "#000000",
    }
)

print(folder)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: ENV["NYLAS_API_KEY"]
)

request_body = {
  name: "Renamed folder"
}

folder, _ = nylas.folders.update(identifier: ENV["NYLAS_GRANT_ID"],
    folder_id: "Label_19", request_body: request_body)

puts folder
```

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Renamed folder"
  }'
```

### Create a folder

`POST /folders`, `POST /labels` → [`POST /v3/grants/<NYLAS_GRANT_ID>/folders`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/folders)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const identifier = process.env.NYLAS_GRANT_ID

const createFolder = async () => {
  try {
    const folder = await nylas.folders.create({
      identifier,
      requestBody: {
        name: 'New Folder'
      }
    })

    console.log('Folder created:', folder)
  } catch (error) {
    console.error('Error creating folder:', error)
  }
}

createFolder()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class CreateFolder {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    CreateFolderRequest request = new CreateFolderRequest("My Custom folder", "", "", "");
    Response<Folder> label = nylas.folders().create("<NYLAS_GRANT_ID>", request);
  }
}
```

```Python
from dotenv import load_dotenv
load_dotenv()

import os
import sys
from nylas import Client

nylas = Client(
    os.environ.get('NYLAS_API_KEY'),
    os.environ.get('NYLAS_API_URI')
)

grant_id = os.environ.get("NYLAS_GRANT_ID")

folder = nylas.folders.create(
    grant_id,
    request_body={
      "name": 'New Folder',
      "parent": None,
    }
)

print(folder)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

request_body = {
  name: "My Custom label"
}

folder = nylas.folders.create(identifier: "<NYLAS_GRANT_ID>",
    request_body: request_body)
```

```API
curl --location 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/folders' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --data '{
    "text_color": "#000000",
    "name": "new folder",
    "background_color": "#434343"
  }'
```

### Delete a specific folder

`DELETE /folders/<FOLDER_ID>`, `DELETE /labels/<LABEL_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/folders/-folder_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const identifier = process.env.NYLAS_GRANT_ID
const folderId = process.env.FOLDER_ID

const deleteFolder = async () => {
  try {
    await nylas.folders.destroy({ identifier, folderId })
    console.log(`Folder with ID ${folderId} deleted successfully.`)
  } catch (error) {
    console.error(`Error deleting folder with ID ${folderId}:`, error)
  }
}

deleteFolder()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class DestroyLabel {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DeleteResponse folder = nylas.folders().destroy("<NYLAS_GRANT_ID>", "<FOLDER_ID>");
  }
}
```

```Python
from dotenv import load_dotenv
load_dotenv()

import os
import sys
from nylas import Client

nylas = Client(
    os.environ.get('NYLAS_API_KEY'),
    os.environ.get('NYLAS_API_URI')
)

grant_id = os.environ.get("NYLAS_GRANT_ID")
folder_id = os.environ.get("FOLDER_ID")

request = nylas.folders.destroy(
    grant_id,
    folder_id,
)

print(request)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

folder, _ = nylas.folders.destroy(identifier: "<NYLAS_GRANT_ID>",
    folder_id: "<FOLDER_ID>")

puts folder
```

```API
curl --location --request DELETE 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```
