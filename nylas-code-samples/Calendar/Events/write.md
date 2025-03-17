### Update a specific event

PUT /events/{id} → PUT /v3/grants/{grant_id}/events/{event_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
}

const nylas = new Nylas(NylasConfig)

async function addParticipantToAndEvent() {
  try {
    const event = await nylas.events.update({
      identifier: process.env.NYLAS_GRANT_ID,
      eventId: process.env.EVENT_ID,
      requestBody: {
        participants: [{
          name: 'Nylas DevRel',
          email: 'devrel-@-nylas.com'
        }]
      },
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      },
    })
  } catch (error) {
    console.error('Error adding participant to event:', error)
  }
}

addParticipantToAndEvent()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class update_calendar_events {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    UpdateEventQueryParams params = new UpdateEventQueryParams("<CALENDAR_ID>", Boolean.FALSE);
    UpdateEventRequest requestBody = new UpdateEventRequest.Builder().location("Nylas' Theatre'").build();

    Response<Event> event = nylas.events().update(
      "<NYLAS_GRANT_ID>",
      "<EVENT_ID>",
      requestBody,
      params);
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
event_id = os.environ.get("EVENT_ID")

event = nylas.events.update(
    grant_id,
    event_id,
    request_body={
      "participants": [{
        "name": "Nylas DevRel",
        "email": "devrel-@-nylas.com"
      }]
    },
    query_params={
      "calendar_id": os.environ.get("CALENDAR_ID")
    }
)

print(event)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
    location: "Nylas' Theatre",
}

query_params = {
    calendar_id: "<NYLAS_GRANT_ID>"
}

events, _request_ids = nylas.events.update(
        identifier: "<NYLAS_GRANT_ID>", 
        event_id: "<EVENT_ID>", 
        query_params: query_params,
        request_body: request_body)
```

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>?calendar_id=<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Birthday Party",
    "busy": true,
    "participants": [{
      "name": "Dorothy Vaughan",
      "email": "dorothy@example.com",
      "comment": "string"
    }],
    "description": "Come ready to skate",
    "when": {
      "time": 1408875644,
      "timezone": "America/New_York"
    },
    "location": "Roller Rink",
    "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO",
      "EXDATE:20211011T000000Z"
    ],
    "conferencing": {
      "provider": "WebEx",
      "details": {
        "password": "string",
        "pin": "string",
        "url": "string"
      }
    },
    "reminder_minutes": "[20]",
    "reminder_method": "popup"
}'
```

### Create a specific event

POST /events → POST /v3/grants/{grant_id}/events

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

const now = Math.floor(Date.now() / 1000)

async function createAnEvent() {
  try {
    const event = await nylas.events.create({
      identifier: process.env.NYLAS_GRANT_ID,
      requestBody: {
        title: 'Build With Nylas',
        when: {
          startTime: now,
          endTime: now + 3600,
        }
      },
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      },
    })

    console.log('Event:', event);
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

createAnEvent()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class create_calendar_events {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    LocalDate today = LocalDate.now();

    Instant sixPmUtc = today.atTime(13, 0).toInstant(ZoneOffset.UTC);

    Instant sixPmUtcPlus = sixPmUtc.plus(30, ChronoUnit.MINUTES);

    long startTime = sixPmUtc.getEpochSecond();
    long endTime = sixPmUtcPlus.getEpochSecond();

    String title = "Let's learn some about the Nylas Java SDK!";
    String location = "Nylas Headquarters";
    String description = "Using the Nylas API with the Java SDK is easy.";

    CreateEventRequest.When.Timespan timespan = new CreateEventRequest.
        When.Timespan.
        Builder(Math.toIntExact(startTime), Math.toIntExact(endTime)).
        build();

    List<CreateEventRequest.Participant> participants_list = new ArrayList<>();

    participants_list.add(new CreateEventRequest.
        Participant("johndoe@example.com", ParticipantStatus.NOREPLY,
        "John Doe", "", ""));

    CreateEventRequest createEventRequest = new CreateEventRequest.Builder(timespan)
        .participants(participants_list)
        .title(title)
        .location(location)
        .description(description)
        .build();

    CreateEventQueryParams createEventQueryParams = new CreateEventQueryParams.Builder("<CALENDAR_ID>").build();

    Event event = nylas.events().create(
        "<NYLAS_GRANT_ID>",
        createEventRequest,
        createEventQueryParams).getData();
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

events = nylas.events.create(
  grant_id,
  request_body={
    "title": 'Build With Nylas',
    "when": {
      "start_time": 1609372800,
      "end_time": 1609376400
    },
  },
  query_params={
    "calendar_id": os.environ.get("CALENDAR_ID")
  }
)

print(events)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

query_params = {
    calendar_id: "<NYLAS_GRANT_ID>"
}

today = Date.today
start_time = Time.local(today.year, today.month, today.day, 13, 0, 0).strftime("%s")
end_time = Time.local(today.year, today.month, today.day, 13, 30, 0).strftime("%s")

request_body = {
    when: {
        start_time: start_time.to_i,
        end_time: end_time.to_i
    },
    title: "Let's learn some Nylas Ruby SDK!",
    location: "Nylas' Headquarters",
    description: "Using the Nylas API with the Ruby SDK is easy.",
    participants: [{
        name: "Blag",
        email: "atejada@gmail.com", 
        status: 'noreply'
    }]
}

events, _request_ids = nylas.events.create(
        identifier: "<NYLAS_GRANT_ID>", 
        query_params: query_params,
        request_body: request_body)
```

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events?calendar_id=<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "title": "Annual Philosophy Club Meeting",
    "status": "confirmed",
    "busy": true,
    "participants": [
      {
        "name": "Aristotle",
        "email": "aristotle@example.com"
      },
      {
        "name": "Jane Stephens",
        "email": "jane.stephens@example.com"
      }
    ],
    "description": "Come ready to talk philosophy!",
    "when": {
      "time": 1700060400
    },
    "location": "New York Public Library, Cave room",
    "recurrence": [
      "RRULE:FREQ=WEEKLY;BYDAY=MO",
      "EXDATE:20211011T000000Z"
  ],
}'
```

### Delete a specific event

DELETE /events/{id} → DELETE /v3/grants/{grant_id}/events/{event_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
}

const nylas = new Nylas(NylasConfig)

async function deleteEvent() {
  try {
    const event = await nylas.events.destroy({
      identifier: process.env.NYLAS_GRANT_ID,
      eventId: process.env.EVENT_ID,
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      },
    })

    console.log('Event deleted:', event)
  } catch (error) {
    console.error('Error to delete event:', error)
  }
}

deleteEvent()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class delete_calendar_events {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DestroyEventQueryParams queryParams = new DestroyEventQueryParams("<CALENDAR_ID>", Boolean.FALSE);

    DeleteResponse event = nylas.events().destroy(
        "<NYLAS_GRANT_ID>",
        "<EVENT_ID>",
        queryParams);
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
event_id = os.environ.get("EVENT_ID")

event = nylas.events.destroy(
    grant_id,
    event_id,
    query_params={
      "calendar_id": os.environ.get("CALENDAR_ID")
    }
)

print(event)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

query_params = {
  calendar_id: "<NYLAS_GRANT_ID>"
}

result, _request_ids = nylas.events.destroy(
    identifier: "<NYLAS_GRANT_ID>", 
    event_id: "<EVENT_ID>",
    query_params: query_params)

puts result
```

```API
curl --request DELETE \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>?calendar_id=<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Send RSVP

POST /send-rsvp → POST /v3/grants/{grant_id}/events/{event_id}/send-rsvp

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
}

const nylas = new Nylas(NylasConfig)

async function sendEventRSVP() {
  try {
    const event = await nylas.events.update({
      identifier: process.env.NYLAS_GRANT_ID,
      eventId: process.env.EVENT_ID,
      requestBody: {
        participants: [{
          name: 'Nylas DevRel',
          email: 'devrelram@nylas.com',
          status: 'yes',
        }]
      },
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      },
    })

    console.log('Event RSVP:', event)
  } catch (error) {
    console.error('Error to RSVP participant for event:', error)
  }
}

sendEventRSVP()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class rsvp {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    SendRsvpRequest requestBody = new SendRsvpRequest(RsvpStatus.YES);
    SendRsvpQueryParams queryParams = new SendRsvpQueryParams("<CALENDAR_ID>");

    DeleteResponse rsvp = nylas.events().sendRsvp(
        "<NYLAS_GRANT_ID>",
        "<EVENT_ID>", 
        requestBody,
        queryParams);
        
    System.out.println(rsvp);
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
event_id = os.environ.get("EVENT_ID")

event = nylas.events.update(
    grant_id,
    event_id,
    request_body={
      "participants": [{
        "name": "Nylas DevRel",
        "email": "devrel@nylas.com",
        "status": "yes"
      }]
    },
    query_params={
      "calendar_id": os.environ.get("CALENDAR_ID")
    }
)

print(event)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
  status: "yes"
}

query_params = {
  calendar_id: "<CALENDAR_ID>"
}

event_rsvp = nylas.events.send_rsvp(
    identifier: "<NYLAS_GRANT_ID>",
    event_id: "<EVENT_ID>", 
    request_body: request_body,
    query_params: query_params)
    
puts event_rsvp
```

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>/send-rsvp?calendar_id=<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "status": "string"
}'
```
