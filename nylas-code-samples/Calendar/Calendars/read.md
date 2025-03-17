### Get all calendars

GET /calendars → /v3/grants/{grant_id}/calendars

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig);

async function fetchFiveAvailableCalendars() {
  try {
    const calendars = await nylas.calendars.list({
      identifier: process.env.NYLAS_GRANT_ID,
      limit: 5
  })

  console.log('Available Calendars:', calendars);
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchFiveAvailableCalendars()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.List;
import java.util.Map;

public class ReturnCalendars {
    public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
        NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

        ListCalendersQueryParams listCalendersQueryParams = 
                                 new ListCalendersQueryParams();

        ListCalendersQueryParams returnFiveCalendars = new ListCalendersQueryParams.
                                                      Builder().limit(5).build();

        List<Calendar> calendars = nylas.calendars().
                       list("<NYLAS_GRANT_ID>", listCalendersQueryParams).getData();

        for (Calendar calendar : calendars){
            System.out.println("Id: " + calendar.getId() +
                               " | Name: " + calendar.getName() +
                               " | Description: " + calendar.getDescription() +
                               " | Is Read Only?: " + calendar.getReadOnly() +
                               " | Metadata: " + calendar.getMetadata());
        }

        ListCalendersQueryParams CalendarsMetadata = new ListCalendersQueryParams.
                                                         Builder().
                                                         metadataPair(
                                                         Map.of("key1", 
                                                                "This is my metadata")
                                                         ).
                                                         build();
                                                         
        List<Calendar> metaCalendars = nylas.calendars().
                                       list("<NYLAS_GRANT_ID>", CalendarsMetadata).
                                       getData();
                                       
        System.out.println();
        System.out.println(metaCalendars);
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
calendars = nylas.calendars.list(grant_id)

print(calendars)
```

```Ruby
# Load gems
require 'nylas'

# Initialize Nylas client
nylas = Nylas::Client.new(
  api_key: "<NYLAS_API_KEY>"
)

# Build the query without parameters
listCalendersQueryParams = {}

# Build the query with parameters
returnFiveCalendars = {
 limit: 5
}

# Get a list of calendars
calendars, _request_ids = nylas.calendars.list(identifier: "<NYLAS_GRANT_ID>", 
  query_params: listCalendersQueryParams)

# Loop the calendars
calendars.each {|calendar|
 puts("Name: #{calendar[:name]} | " \
   "Description: #{calendar[:description]} | " \
   "Is Read Only?: #{calendar[:read_only]} | " \
   "Metadata: #{calendar[:metadata]}")
}

# Build the event parameters with metadata
CalendarsMetadata = {
 metadata_pair: {"key1":"This is my metadata"}
}

# Get a list of calendars
calendars, _request_ids = nylas.calendars.list(identifier: ENV["NYLAS_GRANT_ID"], 
  query_params: CalendarsMetadata)

puts ""                          
calendars.each {|calendar|
 puts calendar
}
```

```API
curl --request GET \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/calendars' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Get a specific calendar

GET /calendars/{id} → /v3/grants/{grant_id}/calendars/{calendar_id}

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig);

async function fetchCalendar() {
  try {
    const calendar = await nylas.calendars.find({
      identifier: process.env.NYLAS_GRANT_ID,
      calendarId: process.env.CALENDAR_ID,
    })

    console.log('Calendar:', calendar)
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchCalendar()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class GetCalendar {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
  NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
  Response<Calendar> calendar = nylas.calendars().find("<NYLAS_GRANT_ID>", "<CALENDAR_ID>");

  System.out.println("Id: " + calendar.getData().getId() +
      " | Name: " + calendar.getData().getName() +
      " | Description: " + calendar.getData().getDescription());
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

calendar = nylas.calendars.find(
    grant_id,
    os.environ.get("CALENDAR_ID")
)

print(calendar)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

calendar, _request_ids = nylas.calendars.find(
  identifier: "<NYLAS_GRANT_ID>", 
  calendar_id: "<CALENDAR_ID>"
)

puts calendar
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/calendars/<CALENDAR_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
