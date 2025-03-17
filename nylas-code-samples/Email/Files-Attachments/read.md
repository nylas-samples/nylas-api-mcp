### Get metadata for a specific attachment

`GET /files/<FILE_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/attachments/-attachment_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchAttachmentById() {
  try {
    const attachment = await nylas.attachments.find({
      identifier: process.env.NYLAS_GRANT_ID,
      attachmentId: process.env.ATTACHMENT_ID,
      queryParams: {
        messageId: process.env.MESSAGE_ID,
      }
    })

    console.log('Attachment:', attachment)
  } catch (error) {
    console.error('Error fetching attachment:', error)
  }
}

fetchAttachmentById()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class attachment {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError, NylasOAuthError {
    NylasClient nylas = new NylasClient.Builder("NYLAS_API_KEY").build();
    FindAttachmentQueryParams queryParams = new FindAttachmentQueryParams("<MESSAGE_ID>");
    Attachment attachment = nylas.attachments().find("<NYLAS_GRANT_ID>", "<ATTACHMENT_ID>", queryParams).getData();

    System.out.println(attachment);
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
attachment_id = os.environ.get("ATTACHMENT_ID")

attachment = nylas.attachments.find(
    grant_id,
    attachment_id,
    query_params= {
      "message_id": os.environ.get("MESSAGE_ID"),
    }
)

print(attachment)
```

```Ruby
require 'dotenv/load'
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

query_params = {
  message_id: "<MESSAGE_ID>"
}

attachment = nylas.attachments.find(identifier: "<NYLAS_GRANT_ID>",
    attachment_id: "<ATTACHMENT_ID>", query_params: query_params)

puts attachment
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>?message_id=<MESSAGE_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```

### Download a specific attachment

`GET /files/<FILE_ID>/download` → [`GET /v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>/download`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/attachments/-attachment_id-/download)

```Node
import 'dotenv/config'
import fs from 'fs'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function downloadAttachment() {
  try {
    const attachmentResponse = await nylas.attachments.download({
      identifier: process.env.NYLAS_GRANT_ID,
      attachmentId: process.env.ATTACHMENT_ID,
      queryParams: {
        messageId: process.env.MESSAGE_ID,
      }
    })

    const fileName = 'attachment'

    const fileStream = fs.createWriteStream(fileName)
      attachmentResponse.pipe(fileStream)
      fileStream.on('finish', () => {
        console.log(`File saved as ${fileName}`)
      })
  } catch (error) {
    console.error('Error fetching attachment:', error)
  }
}

downloadAttachment()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import okhttp3.ResponseBody;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class attachment_download {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasOAuthError, IOException {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    FindAttachmentQueryParams queryParams = new FindAttachmentQueryParams("<MESSAGE_ID>");
    ResponseBody attachment = nylas.attachments().download("<NYLAS_GRANT_ID>", "<ATTACHMENT_ID>", queryParams);

    try {
      FileOutputStream out = new FileOutputStream("src/main/resources/image.png");

      out.write(attachment.bytes());
      out.close();
    } catch (FileNotFoundException e) {
      System.out.println("File not found");
    }
  }
}
```

```Python
from dotenv import load_dotenv
load_dotenv()

import os
from nylas import Client

nylas = Client(
    os.environ.get('NYLAS_API_KEY'),
    os.environ.get('NYLAS_API_URI')
)

grant_id = os.environ.get("NYLAS_GRANT_ID")
attachment_id = os.environ.get("ATTACHMENT_ID")

attachment = nylas.attachments.download(
    grant_id,
    attachment_id,
    query_params= {
      "message_id": os.environ.get("MESSAGE_ID"),
    }
)

with open("attachment", 'wb') as f:
  f.write(attachment.content)
```

```Ruby
require 'dotenv/load'
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

query_params = {
  message_id: "<MESSAGE_ID>"
}

attachment = nylas.attachments.download(identifier: "<NYLAS_GRANT_ID">,
    attachment_id: "<ATTACHMENT_ID>", query_params: query_params)

File.open("./image.png", "wb") do |file|
  file.write(attachment)
end
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/attachments/<ATTACHMENT_ID>/download?message_id=<MESSAGE_ID> \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```
