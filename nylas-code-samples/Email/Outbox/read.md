### Get all scheduled messages

`GET /outbox` → [`GET /v3/grants/{grant_id}/messages/schedules`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages/schedules)

```Node
import 'dotenv/config'
import Nylas from 'nylas'
const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchMessageSchedules() {
  try {
    const identifier: string = process.env.NYLAS_GRANT_ID
    const messageSchedules = await nylas.messages.listScheduledMessages({
      identifier,
    })

    console.log('Message Schedules:', messageSchedules)
  } catch (error) {
    console.error('Error fetching message schedules:', error)
  }
}

fetchMessageSchedules()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<ScheduledMessagesList> message = nylas.messages().listScheduledMessages("<NYLAS_GRANT_ID>");
    
    System.out.println(message.getData());
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

messages = nylas.messages.list_scheduled_messages(
    grant_id
)

print(messages)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

messages, _ = nylas.messages.list_scheduled_messages(identifier: ENV["NYLAS_GRANT_ID"])

messages.each {|message|
  puts message
}
```

```API
curl --request GET \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/schedules' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```

### Get a specific scheduled message

You can use the [`GET /v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>` endpoint](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/messages/schedules/-scheduleId-) to get a specific scheduled email message.

```Node
import "dotenv/config";
import Nylas from "nylas";

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas(NylasConfig);

async function fetchScheduledMessageById() {
  try {
    const events = await nylas.messages.findScheduledMessage({
      identifier: process.env.NYLAS_GRANT_ID,
      scheduleId: process.env.SCHEDULE_ID,
    });

    console.log("Events:", events);
  } catch (error) {
    console.error("Error fetching calendars:", error);
  }
}

fetchScheduledMessageById();
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    Response<ScheduledMessage> message = nylas.messages().findScheduledMessage(
        "<NYLAS_GRANT_ID>", 
        "<SCHEDULED_MESSAGE_ID>");
        
    System.out.println(message.getData());
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
schedule_id = os.environ.get("SCHEDULE_ID")

event = nylas.messages.find_scheduled_message(
    grant_id,
    schedule_id,
)

print(event)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

messages, _ = nylas.messages.find_scheduled_messages(
    identifier: ENV["NYLAS_GRANT_ID"], 
    schedule_id: "<SCHEDULE_ID>")

messages.each {|message|
  puts message
}
```

```API
curl --request GET \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```
