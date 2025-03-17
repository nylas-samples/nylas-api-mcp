Follow this general process to upgrade your v2 webhook implementation to v3:

1. On your v2 app, make a v2 [`GET /a/<NYLAS_CLIENT_ID>/webhooks` request](https://developer.nylas.com/docs/api/v2/#get-/a/-client_id-/webhooks) to get a list of your existing webhook subscriptions.
2. Set up a v3 environment as in the guide above, and make sure your auth systems include [any new scopes for v3 webhook triggers](https://developer.nylas.com/docs/v3/notifications/notification-scopes/) you plan to test.
3. Create a grant to test your webhook subscriptions.
4. Set up a webhook URL to receive test data.
    - This endpoint must be able to listen for a [new-subscription verification request](https://developer.nylas.com/docs/v3/notifications/webhooks/#respond-to-webhook-verification-request) from Nylas, and generate a response.
    - If you don't want to run a full development stack, you can use [VS Code port forwarding](https://code.visualstudio.com/docs/editor/port-forwarding) or a service like [Hookdeck](https://hookdeck.com/?referrer=hi-from-the-nylas-docs) instead.
5. Make a v3 [`POST /v3/webhooks` request](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks) to set up your webhook destination, and include the triggers you want to subscribe to.
6. Test some actions and observe incoming data. You can use the new [Send test event API](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/send-test-event) to generate webhook messages.

When your tests meet your requirements, upgrade any code that handles v2 webhooks.

### Changes to webhooks

Nylas v3 includes the following changes to webhooks:

- Webhook notifications now send object data in a single JSON payload, instead of an array of object IDs.
  - Nylas v3 returns truncated webhook notifications for payloads greater than 1MB. Nylas adds the `.truncated` suffix (for example, `message.updated.truncated`) and omits large fields. When this happens, you'll need to re-query the Nylas APIs if you want the complete object.
- You can now set the `description` on a webhook subscription. Use this field as notes to yourself, and information about the subscription and its use.
- You can now set the `notification_email_addresses` on a webhook subscription. Use this to define a list of email addresses Nylas should notify if the webhook has [deliverability issues](https://developer.nylas.com/docs/v3/notifications/webhooks/#failed-webhooks).
- The `callback_uri` used by webhook subscriptions is now called `webhook_url`.
- Webhooks in Nylas v3 are _not_ compatible with Ngrok due to throughput limiting concerns.

### Unchanged webhook triggers

- `calendar.created`
- `calendar.deleted`
- `calendar.updated`
- `contact.deleted`
- `contact.updated`
- `event.created`
- `event.deleted`
- `event.updated`
- `folder.created`
- `folder.deleted`
- `folder.updated`
- `message.created`
- `message.updated`

### New webhook triggers

- `grant.deleted`
- `grant.updated` (Includes re-authentication.)
- `grant.expired`
- `message.send_success` (Scheduled email messages only.)
- `message.send_failed` (Scheduled email messages only.)
- `message.bounce_detected` (Scheduled email messages only.)
- `message.opened` (Tracked email messages only.)
- `message.link_clicked` (Tracked email messages only.)
- `thread.replied` (Tracked email messages only.)

### Migrated webhook triggers

- `account.connected` → `grant.created`

### Deprecated webhook triggers

- `account.invalid` (Use `grant.expired` instead.)
- `account.running`
- `account.stopped`
- `account.sync_error`
- `contact.created` (Use `contact.updated` instead.)
- `job.successful`
- `job.failed`

### New webhooks endpoints

- Get a mock payload: [`POST /v3/webhooks/mock-payload`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/mock-payload)
- Send a test event: [`POST /v3/webhooks/send-test-event`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/send-test-event)
- Rotate a webhook secret: [`POST /v3/webhooks/rotate-secret/<WEBHOOK_ID>`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks/rotate-secret/-id-)

### Migrated webhooks endpoints

- Return all webhook destinations for an application: `GET /a/<NYLAS_CLIENT_ID>/webhooks` → [`GET /v3/webhooks`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/webhooks)
- Create a webhook destination: `POST /a/<NYLAS_CLIENT_ID>/webhooks` → [`POST /v3/webhooks`](https://developer.nylas.com/docs/api/v3/admin/#post-/v3/webhooks)
- Return info for a specific webhook destination: `GET /a/<NYLAS_CLIENT_ID>/webhooks/<WEBHOOK_ID>` → [`GET /v3/webhooks/<WEBHOOK_ID>`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/webhooks/-id-)
- Update a specific webhook destination: `PUT /a/<NYLAS_CLIENT_ID>/webhooks/<WEBHOOK_ID>` → [`PUT /v3/webhooks/<WEBHOOK_ID>`](https://developer.nylas.com/docs/api/v3/admin/#put-/v3/webhooks/-id-)
- Delete a specific webhook destination: `DELETE /a/<NYLAS_CLIENT_ID>/webhooks/<WEBHOOK_ID>` → [`DELETE /v3/webhooks/<WEBHOOK_ID>`](https://developer.nylas.com/docs/api/v3/admin/#delete-/v3/webhooks/-id-)
- Return application IP addresses → Get webhook source IP addresses (`/a/<NYLAS_CLIENT_ID>/ip_addresses` → [`GET /v3/webhooks/ip-addresses`](https://developer.nylas.com/docs/api/v3/admin/#get-/v3/webhooks/ip-addresses))

### Create a webhook

`POST /webhooks` → `POST /v3/webhooks`

```Node
import 'dotenv/config'
import Nylas from "nylas"

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)

const createWebhook = async () => {
  try {
    const webhook = await nylas.webhooks.create({
      requestBody: {
        triggerTypes: [WebhookTriggers.EventCreated],
        webhookUrl: process.env.WEBHOOK_URL,
        description: "My first webhook",
        notificationEmailAddress: process.env.EMAIL,
      }
    })

    console.log("Webhook created:", webhook)
  } catch (error) {
    console.error("Error creating webhook:", error)
  }
}

createWebhook()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;
import com.nylas.resources.Webhooks;
import com.nylas.models.WebhookTriggers;
import java.util.*;

public class webhooks {
  public static void main(String[] args) throws NylasSdkTimeoutError, NylasApiError {
    NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

    List<WebhookTriggers> triggers = new ArrayList<>();
    triggers.add(WebhookTriggers.EVENT_CREATED);

    CreateWebhookRequest webhookRequest = new CreateWebhookRequest(triggers, "<WEBHOOK_URL>",
        "My first webhook", "<EMAIL_ADDRESS>");

    try {
      Response<WebhookWithSecret> webhook = new Webhooks(nylas).create(webhookRequest);

      System.out.println(webhook.getData());
    } catch (Exception e) {
      System.out.println("Error: " + e);
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
from nylas.models.webhooks import WebhookTriggers

nylas = Client(
  os.environ.get('NYLAS_API_KEY'),
  os.environ.get('NYLAS_API_URI')
)

grant_id = os.environ.get("NYLAS_GRANT_ID")
webhook_url = os.environ.get("WEBHOOK_URL")
email = os.environ.get("EMAIL")

webhook = nylas.webhooks.create(
  request_body={
    "trigger_types": [WebhookTriggers.EVENT_CREATED],
    "webhook_url": webhook_url,
    "description": "My first webhook",
    "notification_email_address": email,
  }
)

print(webhook)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(api_key: "<NYLAS_API_KEY>")

request_body = {
  trigger_types: [Nylas::WebhookTrigger::EVENT_CREATED],
  webhook_url: "<WEBHOOK_URL>",
  description: 'My first webhook',
  notification_email_address: ["EMAIL_ADDRESS"]
}

begin
  webhooks, = nylas.webhooks.create(request_body: request_body)
  
  puts "Webhook created: #{webhooks}"
rescue StandardError => ex
  puts "Error creating webhook: #{ex}"
end
```

```API
curl --location 'https://api.us.nylas.com/v3/webhooks/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <NYLAS_API_KEY>' \
--data-raw '{
  "trigger_types": [
    "grant.created",
    "grant.deleted",
    "grant.expired"
  ],
  "description": "local",
  "webhook_url": "<your webhook url>",
  "notification_email_addresses": ["jane@example.com", "joe@example.com"]
}'
```

### Receive Webhook

POST /webhook → POST /v3/webhook

```Node
import "dotenv/config";
import express from "express";
import Nylas from "nylas";
import crypto from 'crypto';

const config = {
  clientId: process.env.NYLAS_CLIENT_ID,
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
};

const nylas = new Nylas({
  apiKey: config.apiKey,
  apiUri: config.apiUri,
});

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/callback/nylas", (req, res) => {
  if (req.query.challenge) {
    console.log(`Received challenge code! - ${req.query.challenge}`);
    console.log(`Now returning challenge code! - ${req.query.challenge}`);
    
    return res.send(req.query.challenge);
  }
});
```

```Java
//webhook_info.java
import lombok.Data;

@Data
public class Webhook_Info {
  private String id;
  private String date;
  private String subject;
  private String from_email;
  private String from_name;
}

import spark.ModelAndView;
import static spark.Spark.*;
import spark.template.mustache.MustacheTemplateEngine;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.digest.HmacUtils;

public class ReadWebhooks {
  public static String getHmac(String data, String key) {
    return new HmacUtils("HmacSHA256", key).hmacHex(data);
  }

  public static void main(String[] args) {
    ArrayList<Webhook_Info> array = new ArrayList<Webhook_Info>();

    get("/", (request, response) -> {
      Map<String, Object> model = new HashMap<>();
      model.put("webhooks", array);
      return new ModelAndView(model, "show_webhooks.mustache");
    }, new MustacheTemplateEngine());

    get("/webhook", (request, response) -> request.queryParams("challenge"));

    post("/webhook", (request, response) -> {
      ObjectMapper mapper = new ObjectMapper();

      JsonNode incoming_webhook = mapper.readValue(request.body(), JsonNode.class);

      if (getHmac(request.body(), URLEncoder.
          encode(System.getenv("WEBHOOK_SECRET"), "UTF-8")).
          equals(request.headers("X-Nylas-Signature"))) {
            Webhook_Info new_webhook = new Webhook_Info();

            System.out.println(incoming_webhook.get("data").get("object"));

            new_webhook.setId(incoming_webhook.get("data").
                get("object").get("id").textValue());

            new_webhook.setDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").
                format(new java.util.Date((incoming_webhook.get("data").
                get("object").get("date").asLong() * 1000L))));

            new_webhook.setSubject(incoming_webhook.get("data").
                get("object").get("subject").textValue());

            new_webhook.setFrom_email(incoming_webhook.get("data").
                get("object").get("from").get(0).get("email").textValue());

            new_webhook.setFrom_name(incoming_webhook.get("data").
                get("object").get("from").get(0).get("name").textValue());

            array.add(new_webhook);
      }
      response.status(200);
      return "Webhook Received";
    });
  }
}   
```

```Python
# Import packages
from flask import Flask, request, render_template
import hmac
import hashlib
import os
from dataclasses import dataclass
import pendulum

# Array to hold webhook dataclass
webhooks = []

# Webhook dataclass
@dataclass
class Webhook:
  _id: str
  date: str
  subject: str
  from_email: str
  from_name: str

# Get today’s date
today = pendulum.now()

# Create the Flask app and load the configuration
app = Flask(__name__)

# Read and insert webhook data
@app.route("/webhook", methods=["GET", "POST"])
def webhook():
  # We are connected to Nylas, let’s return the challenge parameter.
  if request.method == "GET" and "challenge" in request.args:
    print(" * Nylas connected to the webhook!")
    return request.args["challenge"]

  if request.method == "POST":
    is_genuine = verify_signature(
        message=request.data,
        key=os.environ["WEBHOOK_SECRET"].encode("utf8"),
        signature=request.headers.get("X-Nylas-Signature"),
    )

    if not is_genuine:
      return "Signature verification failed!", 401
    data = request.get_json()

    hook = Webhook(
        data["data"]["object"]["id"],
        pendulum.from_timestamp(
        data["data"]["object"]["date"], today.timezone.name
        ).strftime("%d/%m/%Y %H:%M:%S"),
        data["data"]["object"]["subject"],
        data["data"]["object"]["from"][0]["email"],
        data["data"]["object"]["from"][0]["name"],
    )

    webhooks.append(hook)

    return "Webhook received", 200

# Main page
@app.route("/")
def index():
  return render_template("main.html", webhooks=webhooks)

# Signature verification
def verify_signature(message, key, signature):
  digest = hmac.new(key, msg=message, digestmod=hashlib.sha256).hexdigest()

  return hmac.compare_digest(digest, signature)

# Run our application
if __name__ == "__main__":
  app.run()
```

```Ruby
# frozen_string_literal: true

# Load gems
require 'nylas'
require 'sinatra'
require 'sinatra/config_file'

webhook = Data.define(:id, :date, :subject, :from_email, :from_name)
webhooks = []

get '/webhook' do
  params['challenge'].to_s if params.include? 'challenge'
end

post '/webhook' do
  # We need to verify that the signature comes from Nylas
  is_genuine = verify_signature(request.body.read, ENV['WEBHOOK_SECRET'],
      request.env['HTTP_X_NYLAS_SIGNATURE'])
  unless is_genuine
    status 401
    'Signature verification failed!'
  end

  # Read the webhook information and store it on the data class.
  request.body.rewind

  model = JSON.parse(request.body.read)

  puts(model["data"]["object"])

  hook = webhook.new(model["data"]["object"]["id"], 
      Time.at(model["data"]["object"]["date"]).strftime("%d/%m/%Y %H:%M:%S"), 
      model["data"]["object"]["subject"], model["data"]["object"]["from"][0]["email"], 
      model["data"]["object"]["from"][0]["name"])

  webhooks.append(hook)

  status 200
  'Webhook received'
end

get '/' do
  puts webhooks
  erb :main, locals: { webhooks: webhooks }
end

# Generate a signature with our client secret and compare it with the one from Nylas.
def verify_signature(message, key, signature)
  digest = OpenSSL::Digest.new('sha256')
  digest = OpenSSL::HMAC.hexdigest(digest, key, message)

  secure_compare(digest, signature)
end

# Compare the keys to see if they are the same
def secure_compare(a_key, b_key)
  return false if a_key.empty? || b_key.empty? || a_key.bytesize != b_key.bytesize

  l = a_key.unpack "C#{a_key.bytesize}"
  res = 0

  b_key.each_byte { |byte| res |= byte ^ l.shift }

  res.zero?
end
```

### Update a webhook

`PUT /webhooks/<webhook_id>` → `PUT /v3/webhooks/<webhook_id>`

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
 apiKey: process.env.NYLAS_API_KEY,
 apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const webhookId = process.env.WEBHOOK_ID

async function updateWebhook() {
  try {
    const folder = await nylas.webhooks.update({
      webhookId,
      requestBody: {
        notificationEmailAddresses: [process.env.EMAIL],
      }
    })

    console.log('Updated Folder:', folder)
  } catch (error) {
    console.error('Error to update folder:', error)
  }
}

updateWebhook()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class webhooks {
    public static void main(String[] args) throws 
    NylasSdkTimeoutError, NylasApiError {

        NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

        UpdateWebhookRequest webhookRequest = new
                UpdateWebhookRequest.Builder().
                description("My updated webhook").
                build();

        Response<Webhook> webhook = nylas.webhooks().update("<WEBHOOK_ID>", 
        webhookRequest);
        System.out.println(webhook.getData());
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

webhook_id = os.environ.get("WEBHOOK_ID")
email = os.environ.get("EMAIL")

webhook = nylas.webhooks.update(
  webhook_id,
  request_body={
    "notification_email_addresses": [email],
  }
)

print(webhook)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
  api_key: "<NYLAS_API_KEY>"
)

request_body = {
    description: 'My updated webhook'
}

webhooks = nylas.webhooks.update(webhook_id: "<WEBHOOK_ID>", 
request_body: request_body)
puts webhooks
```

```API
curl --request PUT \
  --url 'https://api.us.nylas.com/v3/webhooks/<WEBHOOK_ID>' \  
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --data '{
    "notification_email_addresses": [
      "EMAIL_ADDRESS_1",
    ]
  }'
```

### Delete a webhook

`DELETE /webhooks/{id}` → `DELETE /v3/webhooks/{id}`

```Node
import 'dotenv/config'
import Nylas from 'nylas'

const NylasConfig = {
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI,
}

const nylas = new Nylas(NylasConfig)
const webhookId = process.env.WEBHOOK_ID

const deleteWebhook = async () => {
  try {
    await nylas.webhooks.destroy({ webhookId })
    console.log(`Webhook with ID ${webhookId} deleted successfully.`)
  } catch (error) {
    console.error(`Error deleting webhook with ID ${webhookId}:`, error)
  }
}


deleteWebhook()
```

```Java
import com.nylas.NylasClient;
import com.nylas.models.*;

public class webhooks {
    public static void main(String[] args) throws 
    NylasSdkTimeoutError, NylasApiError {

        NylasClient nylas = new NylasClient.Builder("<NYLAS_API_KEY>").build();

        WebhookDeleteResponse deleteResponse = 
        nylas.webhooks().destroy("<WEBHOOK_ID>");
        System.out.println(deleteResponse);
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

webhook_id = os.environ.get("WEBHOOK_ID")

request = nylas.webhooks.destroy(
  webhook_id,
)

print(request)
```

```Ruby
require 'nylas'

nylas = Nylas::Client.new(
  api_key: "<NYLAS_API_KEY>"
)

status = nylas.webhooks.destroy(webhook_id: "<WEBHOOK_ID>")
puts status
```

```API
curl --request DELETE \
  --url 'https://api.us.nylas.com/v3/webhooks/<WEBHOOK_ID>' \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer <NYLAS_API_KEY>' \
  --header 'Content-Type: application/json'
```
