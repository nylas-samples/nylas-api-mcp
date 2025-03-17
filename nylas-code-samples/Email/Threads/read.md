### Get all threads

`GET /threads` → [`GET /v3/grants/<NYLAS_GRANT_ID>/threads`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchRecentThreads() {
  try {
    const identifier = process.env.NYLAS_GRANT_ID
    const threads = await nylas.threads.list({
      identifier,
      queryParams: {
        limit: 5,
      }
    })

    console.log('Recent Threads:', threads)
  } catch (error) {
    console.error('Error fetching threads:', error)
  }
}

fetchRecentThreads()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import com.nylas.models.Thread;

public class ReadThreadParameters {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ListThreadsQueryParams queryParams = new ListThreadsQueryParams.Builder().limit(5).build();
    ListResponse<Thread> threads = nylas.threads().list("<NYLAS_GRANT_ID>", queryParams);
    int index = 0;

    for(Thread thread : threads.getData()){
      System.out.printf("%s ", index);
      
      List<EmailName> participants = thread.getParticipants();
      assert participants != null;

      for(EmailName participant : participants){
        System.out.printf("  Subject: %s | Participant: %s | Email: %s%n",
            thread.getSubject(),
            participant.getName(),
            participant.getEmail());
      }

      index++;
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

threads = nylas.threads.list(
    grant_id,
    query_params={
      "limit": 5
    }
)

print(threads)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")
query_params = { limit: 5 }
threads, _ = nylas.threads.list(identifier: "<NYLAS_GRANT_ID>", query_params: query_params)

threads.map.with_index { |thread, i|
  puts("Thread #{i}")
  participants = thread[:participants]

  participants.each{ |participant|
    puts(
        "Subject: #{thread[:subject]} | "\
        "Participant: #{participant[:name]} | "\
        "Email: #{participant[:email]}"
    )
  }
}
```

```API
curl --request GET \
  --url "https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/threads?limit=5" \
  --header 'Accept: application/json' \
  --header "Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```

### Get a specific thread

`GET /threads/<THREAD_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/threads/-thread_id-)

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function fetchThreadById(): Promise<void> { 
  try {
    const events = await nylas.threads.find({
      identifier: process.env.NYLAS_GRANT_ID,
      threadId: process.env.THREAD_ID,
    })
  
    console.log('Events:', events)
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchThreadById()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import com.nylas.models.Thread;

public class ReturnThread {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Thread> thread = nylas.threads().find("<NYLAS_GRANT_ID>", "<THREAD_ID>");

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

thread = nylas.threads.find(
    grant_id,
    thread_id,
)

print(thread)
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

thread, _ = nylas.threads.find(identifier: "<NYLAS_GRANT_ID>", thread_id: "<THREAD_ID>")

participants = thread[:participants]

participants.each{ |participant|
  puts("Id: #{thread[:id]} | "\
      "Subject: #{thread[:subject]} | "\
      "Participant: #{participant[:name]} | "\
      "Email: #{participant[:email]}"
  )
}
```

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/threads/<THREAD_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
