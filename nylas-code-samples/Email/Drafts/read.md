### Get all drafts

`GET /drafts` → [`GET /v3/grants/<NYLAS_GRANT_ID>/drafts`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/drafts)

```API
curl --request GET \
  --url 'https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts' \
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

async function fetchDrafts() {
  try {
    const identifier = process.env.NYLAS_GRANT_ID

    const threads = await nylas.drafts.list({
      identifier,
    })

    console.log('Recent Drafts:', threads)
  } catch (error) {
    console.error('Error fetching drafts:', error)
  }
}

fetchDrafts()
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

drafts, _ = nylas.drafts.list(identifier: "<NYLAS_GRANT_ID>")

drafts.each {|draft|
  puts "[#{Time.at(draft[:date]).strftime("%d/%m/%Y at %H:%M:%S")}] | \
      #{draft[:id]} | \
      #{draft[:subject]} | \
      #{draft[:folders]}"
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

drafts = nylas.drafts.list(
    grant_id,
)

print(drafts)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.text.SimpleDateFormat;

public class ListDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ListResponse<Draft> drafts = nylas.drafts().list("<NYLAS_GRANT_ID>");

    for (Draft draft : drafts.getData()){
      String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date((draft.getDate() * 1000L)));

      System.out.printf("[ %s] | %s | %s | %s", date, draft.getId(), draft.getSubject(), draft.getFolders());
    }
  }
}
```

### Get a specific draft

`GET /drafts/<DRAFT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/drafts/-draft_id-)

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID> \
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

async function fetchDraftById() {
  try {
    const events = await nylas.drafts.find({
      identifier: process.env.NYLAS_GRANT_ID,
      draftId: process.env.DRAFT_ID,
    })

    console.log('Events:', events)
  } catch (error) {
    console.error('Error fetching calendars:', error)
  }
}

fetchDraftById()
```

```Ruby
require 'dotenv/load'
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

draft, _ = nylas.drafts.find(identifier: ENV["NYLAS_GRANT_ID"], draft_id: "<DRAFT_ID>")

puts draft
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
draft_id = os.environ.get("DRAFT_ID")

draft = nylas.drafts.find(
    grant_id,
    draft_id,
)

print(draft)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ListDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Draft> draft = nylas.drafts().find("<NYLAS_GRANT_ID>", "<DRAFT_ID>");

    assert draft.getData().getTo() != null;

    System.out.printf(" %s | %s | %s",
        draft.getData().getId(),
        draft.getData().getTo().get(0).getEmail(),
        draft.getData().getSubject());
  }
}
```
