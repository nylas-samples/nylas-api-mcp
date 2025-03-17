### Update a specific thread

`PUT /threads/<THREAD_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/threads/-thread_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function updateThread() {
  try {
    const calendar = await nylas.threads.update({
      identifier: process.env.NYLAS_GRANT_ID,
      threadId: process.env.THREAD_ID,
      requestBody: {
        starred: true
      }
    })

    console.log('Updated Thread:', calendar)
  } catch (error) {
    console.error('Error to update thread:', error)
  }
}

updateThread()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import com.nylas.models.Thread;

public class UpdateThread {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    UpdateThreadRequest requestBody = new UpdateThreadRequest.
        Builder().
        unread(true).
        starred(true).
        build();

    Response<Thread> draft = nylas.threads().update("<NYLAS_GRANT_ID>", "<THREAD_ID>", requestBody);
    
    System.out.printf("%s%s%s%n",
        draft.getData().getId(),
        draft.getData().getUnread(),
        draft.getData().getStarred()
    );
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

thread = nylas.threads.update(
    grant_id,
    thread_id=os.environ.get("THREAD_ID"),
    request_body={
      "starred": True
    }
)

print(thread)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

request_body = {
  unread: true,
  starred: true
}

thread, _ = nylas.threads.update(identifier: "<NYLAS_GRANT_ID>", 
    thread_id: "<THREAD_ID>",
    request_body: request_body)

puts thread
```

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>\
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "unread": true,
    "starred": false,
    "folders": [
      "<FOLDER_ID>",
      "<FOLDER_ID>"
    ]
  }'
```

### Delete a thread

[`DELETE /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/threads/-thread_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const identifier = process.env.NYLAS_GRANT_ID
const threadId = process.env.THREAD_ID

const deleteThread = async () => {
  try {
    await nylas.threads.destroy({ identifier, threadId })
    console.log(`Thread with ID ${threadId} deleted successfully.`)
  } catch (error) {
    console.error(`Error deleting thread with ID ${threadId}:`, error)
  }
}

deleteThread()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import com.nylas.models.Thread;

public class ReturnThread {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DeleteResponse thread = nylas.threads().destroy("<NYLAS_GRANT_ID>", "<THREAD_ID>");

    System.out.println(thread);
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
thread_id = os.environ.get("THREAD_ID")

request = nylas.threads.destroy(
    grant_id,
    thread_id,
)

print(request)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

thread, _ = nylas.threads.destroy(identifier: "<NYLAS_GRANT_ID>", thread_id: "<THREAD_ID>")

puts thread
```

```API
curl --request DELETE \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
