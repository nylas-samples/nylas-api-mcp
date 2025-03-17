### Get all folders

`GET /folders`, `GET /labels` → [`GET /v3/grants/<NYLAS_GRANT_ID>/folders`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/folders)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchFolders() {
 try {
    const folders = await nylas.folders.list({
      identifier: process.env.NYLAS_GRANT_ID,
    })

    console.log('folders:', folders)
 } catch (error) {
   console.error('Error fetching folders:', error)
 }
}

fetchFolders()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnFolders {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    ListResponse<Folder> folders = nylas.folders().list("<NYLAS_GRANT_ID>");

    for(Folder folder : folders.getData()){
      System.out.println(folder.getId() + " | " + folder.getName());
    }
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

folder = nylas.folders.list(
    grant_id
)

print(folder)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

folders, _ = nylas.folders.list(identifier: "<NYLAS_GRANT_ID>")

folders.each { |folder|
  puts "#{folder[:id]} | #{folder[:name]}"
}

```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/folders \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Get a specific folder

`GET /folders/<FOLDER_ID>`, `GET /labels/<LABEL_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/folders/-folder_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchFolderById() {
  try {
    const folder = await nylas.folders.find({
      identifier: process.env.NYLAS_GRANT_ID,
      folderId: process.env.FOLDER_ID,
    })

    console.log('Folder:', folder)
  } catch (error) {
    console.error('Error fetching folder:', error)
  }
}

fetchFolderById()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class GetLabel {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    Dotenv dotenv = Dotenv.load();
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Folder> folder = nylas.folders().find(dotenv.get("NYLAS_GRANT_ID"), "<FOLDER_ID>");
    
    System.out.println(folder);
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

message = nylas.folders.find(
    grant_id,
    folder_id,
)

print(message)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: ENV["NYLAS_API_KEY"]
)

folder, _ = nylas.folders.find(identifier: ENV["NYLAS_GRANT_ID"], folder_id: "<FOLDER_ID>")

puts folder
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/folders/<FOLDER_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
