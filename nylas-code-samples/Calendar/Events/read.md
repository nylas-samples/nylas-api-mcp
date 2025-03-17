### Get all events

GET /events → GET /v3/grants/{grant_id}/events

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
}

const nylas = new Nylas(NylasConfig)

async function fetchAllEventsFromCalendar() { 
  try {
    const events = await nylas.events.list({
      identifier: process.env.NYLAS_GRANT_ID,
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      }
    })
  
    console.log('Events:', events)
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchAllEventsFromCalendar()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.When;

import com.nylas.models.*;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Objects;

public class read_calendar_events {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    ListEventQueryParams listEventQueryParams = new ListEventQueryParams.Builder("<CALENDAR_ID>").build();

    List<Event> events = nylas.events().list("<NYLAS_GRANT_ID>", listEventQueryParams).getData();

    for (Event event : events) {
      System.out.print("Id: " + event.getId() + " | ");
      System.out.print("Title: " + event.getTitle());

      switch (Objects.requireNonNull(event.getWhen().getObject()).getValue()) {
        case "datespan" -> {
          When.Datespan date = (When.Datespan) event.getWhen();

          System.out.print(" | The date of the event is from: " + 
              date.getStartDate() + " to " + 
              date.getEndDate());
        }
        case "date" -> {
          When.Date date = (When.Date) event.getWhen();
          
          System.out.print(" | The date of the event is: " +date.getDate());
        }
        case "timespan" -> {
          When.Timespan timespan = (When.Timespan) event.getWhen();

          String initDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").
          format(new java.util.Date((timespan.getStartTime() * 1000L)));

          String endDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").
          format(new java.util.Date((timespan.getEndTime() * 1000L)));

          System.out.print(" | The time of the event is from: " + 
          initDate + " to " + endDate);
        }
      }

      System.out.print(" | Participants: ");

      for(Participant participant : event.getParticipants()){
        System.out.print(" Email: " + participant.getEmail() +
            " Name: " + participant.getName() +
            " Status: " + participant.getStatus());
      }

      System.out.println("\n");
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

events = nylas.events.list(
    grant_id,
    query_params={
      "calendar_id": os.environ.get("CALENDAR_ID")
    }
)

print(events)
```

```Ruby
# Load gems
require 'nylas'

# Initialize Nylas client
nylas = Nylas::Client.new(
 api_key: "<NYLAS_API_KEY>"
)

# Query parameters
query_params = {
    calendar_id: "<NYLAS_GRANT_ID>"
}

# Read events from our main calendar in the specified date and time
events, _request_ids = nylas.events.list(identifier: "<NYLAS_GRANT_ID>", 
query_params: query_params)

# Loop events
events.each {|event|
 case event[:when][:object]
  when 'timespan'
   start_time = Time.at(event[:when][:start_time]).strftime("%d/%m/%Y at %H:%M:%S")
   end_time = Time.at(event[:when][:end_time]).strftime("%d/%m/%Y at %H:%M:%S")
   event_date = "The time of the event is from: #{start_time} to #{end_time}"
  when 'datespan'
   start_time = event[:when][:start_date]
   end_time = event[:when][:end_date]
   event_date = "The date of the event is from: #{start_time} to: #{end_time}"
  when 'date'
   start_time = event[:when][:date]
   event_date = "The date of the event is: #{start_time}"
  end
  event[:participants].each {|participant|
   participant_details += "Email: #{participant[:email]} " \
   "Name: #{participant[:name]} Status: #{participant[:status]} - "
  }
  print "Id: #{event[:id]} | Title: #{event[:title]} | #{event_date} | " 
  puts "Participants: #{participant_details.chomp(' - ')}"
  puts "\n"
}
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events?calendar_id=<CALENDAR_ID>&start=<EPOCH_TIMESTAMP>&end=<EPOCH_TIMESTAMP> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Get a specific event

GET /events/{id} → GET /v3/grants/{grant_id}/events/{event_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
 apiKey: process.env.NYLAS_API_KEY,
 apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchEventById() { 
  try {
    const events = await nylas.events.find({
      identifier: process.env.NYLAS_GRANT_ID,
      eventId: process.env.EVENT_ID,
      queryParams: {
        calendarId: process.env.CALENDAR_ID,
      }
    })
  
    console.log('Events:', events)
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchEventById()
```

```Java
// Import Nylas packages
import com.nylas.NylasClient;
import com.nylas.models.When;
import com.nylas.models.*;

public class ReadEvent {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    FindEventQueryParams queryParams = new FindEventQueryParams("<CALENDAR_ID>");
    Response<Event> event = nylas.events().find("<NYLAS_GRANT_ID>", "<EVENT_ID>", queryParams);
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
calendar_id = os.environ.get("CALENDAR_ID")

event = nylas.events.find(
  grant_id,
  event_id,
  query_params={
    "calendar_id": calendar_id
  }
)

print(event)
```

```Ruby
# Load gems
require 'nylas'

# Initialize Nylas client
nylas = Nylas::Client.new(
 api_key: "<NYLAS_API_KEY>"
)

# Query parameters
query_params = {
    calendar_id: "<NYLAS_GRANT_ID>"
}

# Read events from our main calendar in the specified date and time
events, _request_ids = nylas.events.find(identifier: "<NYLAS_GRANT_ID>", 
event_id: "<EVENT_ID>",  query_params: query_params)

# Loop events
events.each {|event|
 puts event
}
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/events/<EVENT_ID>?calendar_id=<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
