### Cancel scheduled send instructions

`DELETE /outbox/<SCHEDULE_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/messages/schedules/-scheduleId-)

```Node
import "dotenv/config";
import Nylas from "nylas";

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas(NylasConfig);

async function deleteMessageSchedule() {
  try {
    const result = await nylas.messages.stopScheduledMessage({
      identifier: process.env.NYLAS_GRANT_ID,
      scheduleId: process.env.SCHEDULE_ID,
    });

    console.log("Result:", result);
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

deleteMessageSchedule();
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnMessage {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    Response<StopScheduledMessageResponse> message = nylas.messages().stopScheduledMessage(
        "<NYLAS_GRANT_ID>", 
        "SCHEDULED_MESSAGE_ID");
        
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

result = nylas.messages.stop_scheduled_message(
    grant_id,
    schedule_id,
)

print(result)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

messages, _ = nylas.messages.stop_scheduled_messages(
    identifier: ENV["NYLAS_GRANT_ID"], 
    schedule_id: "<SCHEDULE_ID>")

messages.each {|message|
  puts message
}
```

```API
curl --request DELETE \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/messages/schedules/<SCHEDULE_ID>' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>'
```
