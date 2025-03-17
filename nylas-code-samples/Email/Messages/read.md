### Get all messages

`GET /messages` → [`GET /v3/grants/<NYLAS_GRANT_ID>/messages`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages)

```Node
app.get("/nylas/recent-emails", async (req, res) => {
  try {
    const identifier = process.env.USER_GRANT_ID;
    const messages = await nylas.messages.list({
      identifier,
      queryParams: {
        limit: 5,
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
});
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.text.SimpleDateFormat;

public class ReadEmail {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ListResponse<Message> message = nylas.messages().list(dotenv.get("NYLAS_GRANT_ID"));

    for(Message email : message.getData()){
      String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").
          format(new java.util.Date((email.getDate() == null ? 1 : 1000L)));

      System.out.println(email.getId() + "[" + date + "] | " +
          email.getSubject() + " | " +
          email.getFolders());
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

messages = nylas.messages.list(
    grant_id,
    query_params={
      "limit": 5
    }
)

print(messages)
```

```Ruby
require 'nylas'

# Initialize Nylas client
nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

messages, _ = nylas.messages.list(identifier: "<NYLAS_GRANT_ID>")

messages.each {|message|
  puts "[#{Time.at(message[:date]).strftime("%d/%m/%Y at %H:%M:%S")}] | \
  #{message[:id]} | \
  #{message[:subject]} | \
  #{message[:folders]}"
}
```

```API
curl --request GET \
  --url "https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages?limit=5" \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Get a specific message

`GET /messages/<MESSAGE_ID>` → `GET /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchMessageById() {
  try {
    const message = await nylas.messages.find({
      identifier: process.env.NYLAS_GRANT_ID,
      messageId: process.env.MESSAGE_ID,
    })

    console.log('message:', message)
  } catch (error) {
    console.error('Error fetching message:', error)
  }
}

fetchMessageById()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Message> message = nylas.messages().find("<NYLAS_GRANT_ID>", "<MESSAGE_ID>");

    System.out.println(message);
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
message_id = os.environ.get("MESSAGE_ID")

message = nylas.messages.find(
    grant_id,
    message_id,
)

print(message)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

message, _ = nylas.messages.find(identifier: ENV["NYLAS_GRANT_ID"], message_id: "<MESSAGE_ID>")

puts message
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Clean a message

You can use the [`PUT /v3/grants/<NYLAS_GRANT_ID>/messages/clean` endpoint](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/messages/clean) to remove extra information from an email message.

```API
curl --location --request PUT 'https://api.us.nylas.com/v3/grants/NYLAS_GRANT_ID/messages/clean' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY_OR_ACCESS_TOKEN>' \
  --data '{
    "message_id": ["18df98cadcc8534a"],
    "ignore_links": false,
    "ignore_images": false,
    "images_as_markdown": true,
    "ignore_tables": true,
    "remove_conclusion_phrases": true
  }'
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Clean_Message {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    List<String> messagesId = List.of("<MESSAGE_ID>");

    CleanMessagesRequest requestBody = new CleanMessagesRequest.Builder(messagesId).
        ignoreImages(true).
        ignoreLinks(true).
        ignoreTables(true).
        imagesAsMarkdown(true).
        removeConclusionPhrases(true).
        build();

    ListResponse<CleanMessagesResponse> clean = nylas.messages().cleanMessages("<NYLAS_GRANT_ID>", requestBody);

    System.out.println(clean.getData());
  }
}
```
