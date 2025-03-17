### Update a specific message

`PUT /messages/<MESSAGE_ID>` → `PUT /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`

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
const messageId = process.env.MESSAGE_ID

const updateMessageFolder = async () => {
  try {
    const updatedMessage = await nylas.messages.update({
      identifier,
      messageId,
      requestBody: {
          folders: [folderId]
      }
    })

    console.log('Message updated:', updatedMessage)
  } catch (error) {
    console.error('Error updating message folder:', error)
  }
}

updateMessageFolder()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.List;

public class UpdateMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    UpdateMessageRequest request = new UpdateMessageRequest.Builder().
        unread(true).
        starred(true).
        build();

    Response<Message> message = nylas.messages().
        update(dotenv.get("NYLAS_GRANT_ID"), "<MESSAGE_ID>", request);

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
folder_id = os.environ.get("FOLDER_ID")
message_id = os.environ.get("MESSAGE_ID")

message = nylas.messages.update(
    grant_id,
    message_id,
    request_body={
      "folders": [folder_id]
    }
)

print(message)
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

message, _ = nylas.messages.update(identifier: "<NYLAS_GRANT_ID>",
    message_id: "<MESSAGE_ID>",
    request_body: request_body)

puts message
```

```API
curl --location --request PUT 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --data '{
    "folders": [
      "<FOLDER_ID>"
    ]
  }'
```

### Send a message

`POST /send` → `POST /v3/grants/<NYLAS_GRANT_ID>/messages/send`

```Node
app.get("/nylas/send-email", async (req, res) => {
  try {
    const sentMessage = await nylas.messages.send({
      identifier: process.env.USER_GRANT_ID,
      requestBody: {
        to: [{ name: "Name", email: process.env.EMAIL }],
        replyTo: [{ name: "Name", email: process.env.EMAIL }],
        subject: "Your Subject Here",
        body: "Your email body here.",
      },
    });

    res.json(sentMessage);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.ArrayList;
import java.util.List;

public class SendEmails {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    List<EmailName> emailNames = new ArrayList<>();
    emailNames.add(new EmailName("john.doe@example.com", "John Doe"));

    TrackingOptions options = new TrackingOptions("hey just testing", true, true, true);

    SendMessageRequest requestBody = new SendMessageRequest.Builder(emailNames).
        trackingOptions(options).
        subject("Hey Reaching Out with Nylas").
        body("Hey I would like to track this link <a href='https://espn.com'>My Example Link</a>.").
        build();

    Response<Message> email = nylas.messages().send("<NYLAS_GRANT_ID>", requestBody);

    System.out.println(email.getData());
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
email = os.environ.get("EMAIL")

message = nylas.messages.send(
    grant_id,
    request_body={
      "to": [{ "name": "Name", "email": email }],
      "reply_to": [{ "name": "Name", "email": email }],
      "subject": "Your Subject Here",
      "body": "Your email body here.",
    }
)

print(message)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

request_body = {
  subject: "Hey Reaching Out with Nylas",
  body: "Hey I would like to track this link <a href='https://espn.com'>My Example Link</a>",
  to: [{name: "John Doe", email: "john.doe@example.com"}],
  tracking_options: {label: "hey just testing",
    opens: true,
    links: true,
    thread_replies: true}
}

email, _ = nylas.messages.send(identifier: "<NYLAS_GRANT_ID>", request_body: request_body)

puts "Message \"#{email[:subject]}\" was sent with ID #{email[:id]}"
```

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/send \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "subject": "Hey Reaching Out with Nylas",
    "body": "Hey I would like to track this link <a href='https://espn.com'>My Example Link</a>",
    "to": [
      {
      "name": "John Doe",
      "email": "john.doe@example.com"
      }
    ],
    "tracking_options": {
      "opens": true,
      "links": true,
      "thread_replies": true,
      "label": "hey just testing"
    }
  }'
```

### Delete a specific message

`DELETE /messages/<MESSAGE_ID>` → `DELETE /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>`

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function deleteMessage() { 
  try {
    const result = await nylas.messages.destroy({
      identifier: process.env.NYLAS_GRANT_ID,
      messageId: process.env.MESSAGE_ID,
    })
  
    console.log('Result:', result)
  } catch (error) {
    console.error('Error deleting message:', error)
  }
}

deleteMessage()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DeleteResponse message = nylas.messages().destroy("<NYLAS_GRANT_ID>", "<MESSAGE_ID>");

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

result = nylas.messages.destroy(
    grant_id,
    message_id,
)

print(result)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

status, _ = nylas.messages.destroy(identifier: "<NYLAS_GRANT_ID>", message_id: "<MESSAGE_ID>")

puts status
```

```API
curl --request DELETE \
  --url https://api.nylas.com/messages/<MESSAGE_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_ACCESS_TOKEN>' \
  --header 'Content-Type: application/json'
```

### Compose a message using AI

You can use the [`POST /v3/grants/<NYLAS_GRANT_ID>/messages/smart-compose` endpoint](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/smart-compose) to generate an email message based on a text prompt.

```API
curl --request POST \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/smart-compose' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function composeEmail() {
  try {
    const message = await nylas.messages.smartCompose.composeMessage({
        identifier: process.env.NYLAS_GRANT_ID,
        requestBody: {
          prompt: 'Tell my colleague how we can use Nylas APIs',
        }
    })
    
    console.log('Message created:', message)
  } catch (error) {
    console.error('Error creating message:', error)
  }
}

composeEmail()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
   api_key: "<NYLAS_API_KEY>"
)

request_body = {
  prompt: 'Let''s talk about Nylas'
}

message, _ = nylasnylas.messages.smart_compose.compose_message(identifier: "<NYLAS_GRANT_ID>", 
    request_body: request_body)

puts message[:suggestion]
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
email = os.environ.get("EMAIL")

message = nylas.messages.smart_compose.compose_message(
    grant_id,
    request_body={
      "prompt": "Tell my colleague how we can use Nylas APIs",
    }
)

print(message)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class SmartCompose {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ComposeMessageRequest requestBody = new ComposeMessageRequest("Let's talk about Nylas");
    Response<ComposeMessageResponse> message = nylas.messages().smartCompose().composeMessage("<NYLAS_GRANT_ID>", requestBody);
    
    System.out.println(message.getData().getSuggestion());
  }
}
```

### Compose a reply to a specific message using AI

You can use the [`POST /v3/grants/<NYLAS_GRANT_ID>/messages/<MESSAGE_ID>/smart-compose` endpoint](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/messages/-message_id-/smart-compose) to generate a reply to a specific email message.
