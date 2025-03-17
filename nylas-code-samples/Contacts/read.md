### Get all contacts

`GET /contacts` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts)

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/contacts \
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

async function fetchContacts() {
  try {
    const identifier = process.env.NYLAS_GRANT_ID
    const contacts = await nylas.contacts.list({
      identifier,
      queryParams: {}, 
    })

    console.log('Recent Contacts:', contacts)
  } catch (error) {
    console.error('Error fetching drafts:', error)
  }
}

fetchContacts()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")
contacts, _ = nylas.contacts.list(identifier: ENV["NYLAS_GRANT_ID"])

contacts.each {|contact|
  puts "Name: #{contact[:given_name]} #{contact[:surname]} | " \
      "Email: #{contact[:emails][0][:email]} | ID: #{contact[:id]}"
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

contacts = nylas.contacts.list(
  grant_id,
)

print(contacts)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReadAllContacts {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ListResponse<Contact> contacts = nylas.contacts().list("<NYLAS_GRANT_ID>");

    for(Contact contact : contacts.getData()) {
      System.out.println(contact);
      System.out.println("\n");
    }
  }
}
```

### Get a specific contact

`GET /contacts/<CONTACT_ID>` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts/-contact_id-)

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID> \
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

async function fetchContactById() { 
  try {
    const contact = await nylas.contacts.find({
      identifier: process.env.NYLAS_GRANT_ID,
      contactId: process.env.CONTACT_ID,
      queryParams: {},
    })
  
    console.log('contact:', contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
  }
}

fetchContactById()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")
contact, _ = nylas.contacts.find(identifier: "<NYLAS_GRANT_ID>", contact_id: "<CONTACT_ID>")

puts contact
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
contact_id = os.environ.get("CONTACT_ID")

contact = nylas.contacts.find(
  grant_id,
  contact_id,
)

print(contact)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReturnAContact {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    Response<Contact> contact = nylas.contacts().find("<NYLAS_GRANT_ID>", "<CONTACT_ID>");

    System.out.println(contact);
  }
}
```

### Return all contact groups

`GET /groups` → [`GET /v3/grants/<NYLAS_GRANT_ID>/contacts/groups`](https://developer.nylas.com/docs/api/v3/ecc/#get-/v3/grants/-grant_id-/contacts/groups)

```API
curl --request GET \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/contacts/groups \
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

async function fetchContactGroups() {
  try {
    const identifier = process.env.NYLAS_GRANT_ID
    const contactGroups = await nylas.contacts.groups({
      identifier,
    })

    console.log('Contacts Groups:', contactGroups)
  } catch (error) {
    console.error('Error fetching contact groups:', error)
  }
}

fetchContactGroups()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")
groups = nylas.contacts.list_groups(identifier: "<NYLAS_GRANT_ID>")

puts groups
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

contact_groups = nylas.contacts.list_groups(
  grant_id,
)

print(contact_groups)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class ReadContactGroups {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    ListResponse<ContactGroup> groups = nylas.contacts().listGroups("<NYLAS_GRANT_ID>");
    
    System.out.println(groups);
  }
}
```
