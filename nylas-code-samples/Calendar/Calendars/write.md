### Update a specific calendar

PUT /calendars/{id} → PUT /v3/grants/{grant_id}/calendars/{calendar_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function updateCalendar() {
  try {
    const calendar = await nylas.calendars.update({
      identifier: process.env.NYLAS_GRANT_ID,
      calendarId: process.env.CALENDAR_ID,
      requestBody: {
        name: 'Nylas DevRel Calendar',
        description: 'Nylas Developer Relations',
      }
    })

    console.log('Updated Calendar:', calendar)
  } catch (error) {
    console.error('Error to update calendar:', error)
  }
}

updateCalendar()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class UpdateCalendar {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
      
    UpdateCalendarRequest requestBody = new UpdateCalendarRequest.Builder().
        name("My New Calendar").
        description("Description of my new calendar").
        location("Location description").
        timezone("America/Los_Angeles").
        build();
      
    Response<Calendar> calendar = nylas.calendars().update(
        "<CALENDAR_ID>",
        "<CALENDAR_ID>", 
        requestBody);

    System.out.println(calendar.getData());        
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

calendar = nylas.calendars.update(
    grant_id,
    calendar_id=os.environ.get("CALENDAR_ID"),
    request_body={
      "name": 'Nylas DevRel Calendar',
      "description": 'Nylas Developer Relations'
    }
)

print(calendar)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
 "name": "\"New Test Calendar (changed)\"",
 "description": "\"this calendar has been updated!\"",
}

calendar, _request_ids = nylas.calendars.update(
  identifier: "<NYLAS_GRANT_ID>", 
  calendar_id: "<CALENDAR_ID", 
  request_body: request_body)

puts calendar
```

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "My New Calendar",
    "description": "Description of my new calendar",
    "location": "Location description",
    "timezone": "America/Los_Angeles"
}'
```

### Create a specific calendar

POST /calendars → POST /v3/grants/{grant_id}/calendars

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function createCalendar() {
  try {
    const calendar = await nylas.calendars.create({
      identifier: process.env.NYLAS_GRANT_ID,
      requestBody: {
        name: 'Nylas DevRel',
        description: 'Nylas Developer Relations',
      }
    })

    console.log('Calendar:', calendar)
  } catch (error) {
    console.error('Error to create calendar:', error)
  }
}

createCalendar()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.Map;

public class CreateCalendar {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    CreateCalendarRequest requestBody = new CreateCalendarRequest(
        "My New Calendar",
        "Description of my new calendar",
        "Location description",
        "America/Toronto",
        Map.of("key1", "This is my metadata"));

    Response<Calendar> calendar = nylas.calendars().
        create("<NYLAS_GRANT_ID>", requestBody);

    System.out.println(calendar.getData());
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

calendar = nylas.calendars.create(
    grant_id,
    request_body={
      "name": 'Nylas DevRel',
      "description": 'Nylas Developer Relations'
    }
)

print(calendar)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

query_params = {
 calendar_id: "<CALENDAR_ID>"
}

request_body = {
 "name": "My New Calendar",
 "description": "Description of my new calendar",
 "location": "Location description",
 "timezone": "America/Toronto",
 "metadata": { "key1":"This is my metadata" }
}

calendar, _request_ids = nylas.calendars.create(
  identifier: "<NYLAS_GRANT_ID>", 
  request_body: request_body)

puts calendar
```

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/calendars \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "My New Calendar",
    "description": "Description of my new calendar",
    "location": "Location description",
    "timezone": "America/Los_Angeles"
}'
```

### Delete a specific calendar

DELETE /calendars/{id} → DELETE /v3/grants/{grant_id}/calendars/{calendar_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
 apiKey: process.env.NYLAS_API_KEY,
 apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function deleteCalendar() {
  try {
    const calendar = await nylas.calendars.destroy({
      identifier: process.env.NYLAS_GRANT_ID,
      calendarId: process.env.CALENDAR_ID,
    })

    console.log('Calendar:', calendar)
  } catch (error) {
    console.error('Error to create calendar:', error)
  }
}

deleteCalendar()
```

```Java
// Import packages
import com.nylas.NylasClient;
import com.nylas.models.*;

public class DeleteCalendar {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    // Delete the requested calendar
    try {
      nylas.calendars().destroy("<NYLAS_GRANT_ID>", "<CALENDAR_ID>");

      System.out.println("Deleted successfully");
    }
    catch(Exception e) {
      System.out.println("There was an error " + e);
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
calendar_id = os.environ.get("CALENDAR_ID")

request = nylas.calendars.destroy(
  grant_id,
  calendar_id,
)

print(request)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

calendar, = nylas.calendars.destroy(identifier: "<NYLAS_GRANT_ID>",
calendar_id: "<CALENDAR_ID")

puts calendar
```

```API
curl --request DELETE \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
