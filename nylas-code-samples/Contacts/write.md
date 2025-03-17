### Update a specific contact

`PUT /contacts/<CONTACT_ID>` → [`PUT /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>`](https://developer.nylas.com/docs/api/v3/ecc/#put-/v3/grants/-grant_id-/contacts/-contact_id-)

```API
curl --request PUT \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID> \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "birthday": "1960-12-31",
    "company_name": "Nylas",
    "emails": [
      {
        "email": "john-work@example.com",
        "type": "work"
      },
      {
        "email": "john-home@example.com",
        "type": "home"
      }
    ],
    "given_name": "John",
    "groups": [
      {
        "id": "starred"
      },
      {
        "id": "all"
      }
    ],
    "im_addresses": [
      {
        "type": "jabber",
        "im_address": "myjabberaddress"
      },
      {
        "type": "msn",
        "im_address": "mymsnaddress"
      }
    ],
    "job_title": "Software Engineer",
    "manager_name": "Bill",
    "middle_name": "Jacob",
    "nickname": "JD",
    "notes": "Loves Ramen",
    "office_location": "123 Main Street",
    "phone_numbers": [
      {
        "number": "+1-555-555-5555",
        "type": "work"
      },
      {
        "number": "+1-555-555-5556",
        "type": "home"
      }
    ],
    "physical_addresses": [
      {
        "type": "work",
        "street_address": "123 Main Street",
        "postal_code": 94107,
        "state": "CA",
        "country": "USA",
        "city": "San Francisco"
      },
      {
        "type": "home",
        "street_address": "456 Main Street",
        "postal_code": 94107,
        "state": "CA",
        "country": "USA",
        "city": "San Francisco"
      }
    ],
    "suffix": "Jr.",
    "surname": "Doe",
    "web_pages": [
      {
        "type": "work",
        "url": "http://www.linkedin.com/in/johndoe"
      },
      {
        "type": "home",
        "url": "http://www.johndoe.com"
      }
    ]
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

async function updateContact() {
  try {
    const contact = await nylas.contacts.update({
      identifier: process.env.NYLAS_GRANT_ID,
      contactId: process.env.CONTACT_ID,
      requestBody: {
        givenName: "Nyla",
      }
    })

    console.log('Contact:', JSON.stringify(contact))
  } catch (error) {
    console.error('Error to create contact:', error)
  }
}

updateContact()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
  notes: "This is *the best* swag",
}

contact, _ = nylas.contacts.update(identifier: "<NYLAS_GRANT_ID>", 
    contact_id: "<CONTACT_ID>", 
    request_body: request_body)

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

contact = nylas.contacts.update(
    grant_id,
    contact_id,
    request_body={
      "given_name": "Nyla",
    }
)

print(contact)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class UpdateContact {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    UpdateContactRequest requestBody = new UpdateContactRequest.
        Builder().
        notes("This is *the best* swag").
        build();

    Response<Contact> contact = nylas.contacts().update("<NYLAS_GRANT_ID>", "<CONTACT_ID>", requestBody);

    System.out.println(contact);
  }
}
```

### Create a contact

`POST /contacts` → [`POST /v3/grants/<NYLAS_GRANT_ID>/contacts`](https://developer.nylas.com/docs/api/v3/ecc/#post-/v3/grants/-grant_id-/contacts)

```API
curl --request POST \
  --url https://api.us.nylas.com/v3/grants/<NYLAS_GRANT_ID>/contacts \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "birthday": "1960-12-31",
    "company_name": "Nylas",
    "emails": [
      {
        "email": "john-work@example.com",
        "type": "work"
      },
      {
        "email": "john-home@example.com",
        "type": "home"
      }
    ],
    "given_name": "John",
    "groups": [
      {
        "id": "starred"
      },
      {
        "id": "all"
      }
    ],
    "im_addresses": [
      {
        "type": "jabber",
        "im_address": "myjabberaddress"
      },
      {
        "type": "msn",
        "im_address": "mymsnaddress"
      }
    ],
    "job_title": "Software Engineer",
    "manager_name": "Bill",
    "middle_name": "Jacob",
    "nickname": "JD",
    "notes": "Loves ramen",
    "office_location": "123 Main Street",
    "phone_numbers": [
      {
        "number": "+1-555-555-5555",
        "type": "work"
      },
      {
        "number": "+1-555-555-5556",
        "type": "home"
      }
    ],
    "physical_addresses": [
      {
        "type": "work",
        "street_address": "123 Main Street",
        "postal_code": 94107,
        "state": "CA",
        "country": "USA",
        "city": "San Francisco"
      },
      {
        "type": "home",
        "street_address": "456 Main Street",
        "postal_code": 94107,
        "state": "CA",
        "country": "USA",
        "city": "San Francisco"
      }
    ],
    "suffix": "Jr.",
    "surname": "Doe",
    "web_pages": [
      {
        "type": "work",
        "url": "http://www.linkedin.com/in/johndoe"
      },
      {
        "type": "home",
        "url": "http://www.johndoe.com"
      }
    ]
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

async function createContact() {
  try {
    const contact = await nylas.contacts.create({
      identifier: process.env.NYLAS_GRANT_ID,
      requestBody: {
        givenName: "My",
        middleName: "Nylas",
        surname: "Friend",
        notes: "Make sure to keep in touch!",
        emails: [{type: 'work', email: 'swag@example.com'}],
        phoneNumbers: [{type: 'work', number: '(555) 555-5555'}],
        webPages: [{type: 'other', url: 'nylas.com'}]
      }
    })

    console.log('Contact:', JSON.stringify(contact))
  } catch (error) {
    console.error('Error to create contact:', error)
  }
}

createContact()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
  given_name: "My",
  middle_name: "Nylas",
  surname: "Friend",  
  emails: [{email: "nylas-friend@example.com", type: "work"}],
  notes: "Make sure to keep in touch!",
  phone_numbers: [{number: "555 555-5555", type: "business"}],
  web_pages: [{url: "https://www.nylas.com", type: "homepage"}]
}

contact, _ = nylas.contacts.create(identifier: "<NYLAS_GRANT_ID>", request_body: request_body)

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

contact = nylas.contacts.create(
    grant_id,
    request_body={
      "middleName": "Nylas",
      "surname": "Friend",
      "notes": "Make sure to keep in touch!",
      "emails": [{"type": "work", "email": "swag@example.com"}],
      "phoneNumbers": [{"type": "work", "number": "(555) 555-5555"}],
      "webPages": [{"type": "other", "url": "nylas.com"}]
    }
)

print(contact)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import java.util.ArrayList;
import java.util.List;

public class CreateAContact {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    List<ContactEmail> contactEmails = new ArrayList<>();
    contactEmails.add(new ContactEmail("swag@nylas.com", "work"));

    List<WebPage> contactWebpages = new ArrayList<>();
    contactWebpages.add(new WebPage("https://www.nylas.com", "work"));

    CreateContactRequest requestBody = new CreateContactRequest.Builder().
        emails(contactEmails).
        companyName("Nylas").
        givenName("Nylas' Swag").
        notes("This is good swag").
        webPages(contactWebpages).
        build();

    Response<Contact> contact = nylas.contacts().create("<NYLAS_GRANT_ID>", requestBody);

    System.out.println(contact);
  }
}
```

### Delete a specific contact

`DELETE /contacts/<CONTACT_ID>` → [`DELETE /v3/grants/<NYLAS_GRANT_ID>/contacts/<CONTACT_ID>](https://developer.nylas.com/docs/api/v3/ecc/#delete-/v3/grants/-grant_id-/contacts/-contact_id-)

```API
curl --request DELETE \
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
const identifier = process.env.NYLAS_GRANT_ID
const contactId = process.env.CONTACT_ID

const deleteContact = async () => {
  try {
    await nylas.contacts.destroy({ identifier, contactId })
    console.log(`Contact with ID ${contactId} deleted successfully.`)
  } catch (error) {
    console.error(`Error deleting contact with ID ${contactId}:`, error)
  }
}

deleteContact()
```

```Ruby
require 'nylas' 

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")
status, _ = nylas.contacts.destroy(identifier: "<NYLAS_GRANT_ID>", contact_id: "<CONTACT_ID>")

puts status
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

request = nylas.contacts.destroy(
    grant_id,
    contact_id,
)

print(request)
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class DeleteAContact {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();
    DeleteResponse contact = nylas.contacts().destroy("<NYLAS_GRANT_ID>", "<CONTACT_ID>");

    System.out.println(contact);
  }
}
```
