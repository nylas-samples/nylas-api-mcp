### Update a specific draft

`PUT /drafts/<DRAFT_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/drafts/-draft_id-)

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "unread": true,
    "starred": true
  }'
```

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

async function updateDraft() {
  try {
    const calendar = await nylas.drafts.update({
      identifier: process.env.NYLAS_GRANT_ID,
      draftId: process.env.DRAFT_ID,
      requestBody: {
        starred: true
      }
    })

    console.log('Updated Draft:', calendar)
  } catch (error) {
    console.error('Error to update draft:', error)
  }
}

updateDraft()
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

draft, _ = nylas.drafts.update(identifier: "<NYLAS_GRANT_ID>",
    draft_id: "<DRAFT_ID>",
    request_body: request_body)

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

thread = nylas.drafts.update(
    grant_id,
    draft_id=os.environ.get("DRAFT_ID"),
    request_body={
      "scope": ["mail.ready"]
    }
)

print(thread)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class UpdateDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    UpdateDraftRequest requestBody = new UpdateDraftRequest.
        Builder().
        unread(true).
        starred(true).
        build();

    Response<Draft> draft = nylas.drafts().update("<NYLAS_GRANT_ID>", "<DRAFT_ID>", requestBody);

    System.out.printf("%s%s%s%n",
        draft.getData().getId(),
        draft.getData().getUnread(),
        draft.getData().getStarred());
  }
}
```

### Create a draft

`POST /drafts` → [`POST /v3/grants/<NYLAS_GRANT_ID>/drafts`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/drafts)

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "subject": "With Love, From Nylas",
    "to": [{
      "email": "dorothy@example.com",
      "name": "Dorothy Vaughan"
    }],
    "cc": [{
      "email": "George Washington Carver",
      "name": "carver@example.com"
    }],
    "bcc": [{
      "email": "Albert Einstein",
      "name": "al@example.com"
    }],
    "reply_to": [{
      "email": "skwolek@example.com",
      "name": "Stephanie Kwolek"
    }],
    "body": "This email was sent using the Nylas Email API. Visit https://nylas.com for details.",
    "tracking_options": {
      "opens": true,
      "links": true,
      "thread_replies": true,
      "label": "just testing"
    }
  }'
```

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const identifier = process.env.NYLAS_GRANT_ID

const createDraft = async () => {
  try {
    const draft = {
      subject: "With Love, From Nylas",
      to: [{ name: "Dorothy Vaughan", email: "dorothy@example.com" }],
      body: "This email was sent using the Nylas Email API. Visit https://nylas.com for details.",
    }

    const createdDraft = await nylas.drafts.create({
        identifier,
        requestBody: draft
    })

    console.log('Draft created:', createdDraft)

  } catch (error) {
    console.error('Error creating draft:', error)
  }
}

createDraft()
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

request_body = {
  subject: "With Love, From Nylas",
  body: 'This email was sent using the Nylas Email API. ' + 
      'Visit https://nylas.com for details.',
  to: [{
    name: "Dorothy Vaughan", 
    email: "dorothy@example.com"
  }],
  cc: [{
    name: "George Washington Carver", 
    email: "carver@example.com"
  }],
  bcc: [{
    name: "Albert Einstein", 
    email: "al@example.com"
  }],
  reply_to: [{
    name: "Stephanie Kwolek", 
    email: "skwolek@example.com"
  }],
  tracking_options: {
    label: "just testing", 
    opens: true, 
    links: true,
    thread_replies: true
  }
}

draft, _ = nylas.drafts.create(identifier: "<NYLAS_GRANT_ID>", request_body: request_body)

puts "Draft \"#{draft[:subject]}\" was created with ID: #{draft[:id]}"
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

draft = nylas.drafts.create(
    grant_id,
    request_body={
      "to": [{ "name": "Dorothy Vaughan", "email": email }],
      "reply_to": [{ "name": "Dorothy Vaughan", "email": email }],
      "subject": "With Love, From Nylas",
      "body": "This email was sent using the Nylas Email API. Visit https://nylas.com for details.",
    }
)

print(draft)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

import com.nylas.util.FileUtils;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CreateDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    CreateDraftRequest requestBody = new CreateDraftRequest.Builder().
        to(Collections.singletonList(new EmailName("dorothy@example.com", "Dorothy Vaughan"))).
        cc(Collections.singletonList(new EmailName("carver@example.com", "George Washington Carver"))).
        bcc(Collections.singletonList(new EmailName("al@example.com", "Albert Einstein"))).
        subject("With Love, From Nylas").
        body("This email was sent using the Nylas Email API. Visit https://nylas.com for details.").
        build();

    Response<Draft> drafts = nylas.drafts().create(dotenv.get("NYLAS_GRANT_ID"), requestBody);

    System.out.println("Draft " + drafts.getData().getSubject() + 
        " was created with ID " + drafts.getData().getId());
  }
}
```

### Send a specific draft

You can use the [`POST /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>` endpoint](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/drafts/-draft_id-) to send a draft.

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>  \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
```

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const identifier = process.env.NYLAS_GRANT_ID
const draftId = process.env.DRAFT_ID

const sendDraft = async () => {
  try {
    const sentMessage = await nylas.drafts.send({ identifier, draftId })

    console.log('Draft sent:', sentMessage)
  } catch (error) {
    console.error('Error sending draft:', error)
  }
}

sendDraft()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(
    api_key: "<NYLAS_API_KEY>"
)

draft, _ = nylas.drafts.send(identifier: "<NYLAS_GRANT_ID>", draft_id: "<DRAFT_ID>")
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

draft = nylas.drafts.send(
    grant_id,
    draft_id
)

print(draft)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class SendDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Message> draft = nylas.drafts().send("<NYLAS_GRANT_ID>", "<DRAFT_ID>");

    System.out.println(draft.getData());
  }
}
```

### Delete a specific draft

`DELETE /drafts/<DRAFT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/drafts/-draft_id-)

```API
curl --request DELETE \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/drafts/<DRAFT_ID> \
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
const identifier = process.env.NYLAS_GRANT_ID
const draftId = process.env.DRAFT_ID

const deleteDraft = async () => {
  try {
    await nylas.drafts.destroy({ identifier, draftId })

    console.log(\`Draft with ID \${draftId} deleted successfully.\`)
  } catch (error) {
    console.error(\`Error deleting contact with ID \${draftId}:\`, error)
  }
}

deleteDraft()
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
   api_key: "<NYLAS_API_KEY>"
)

status, _ =  nylas.drafts.destroy(identifier: "<NYLAS_GRANT_ID>", draft_id: "<DRAFT_ID>")

if status
  puts "Draft successfully deleted"
end
```

```Python
from nylas import Client

nylas = Client(
    api_key = "<NYLAS_API_KEY>"
)

drafts = nylas.drafts.destroy("<NYLAS_GRANT_ID>", "<DRAFT_ID>")

print(drafts)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class SendDraft {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DeleteResponse draft = nylas.drafts().destroy("<NYLAS_GRANT_ID>", "<DRAFT_ID>");

    System.out.println(draft.getRequestId());
  }
}
```
