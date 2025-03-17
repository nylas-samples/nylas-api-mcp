import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register resources for Nylas API endpoints
 */
export function registerEndpointResources(server: McpServer) {
  // Register a resource that lists all available endpoints
  server.resource(
    "nylas-endpoints",
    "nylas://endpoints",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `# Nylas API Endpoints

This resource provides documentation for Nylas API endpoints organized by category.

## Authentication

- [Authentication](nylas://endpoints/auth)
- [Connected Accounts](nylas://endpoints/connected-accounts)

## Email

- [Messages](nylas://endpoints/messages)
- [Threads](nylas://endpoints/threads)
- [Drafts](nylas://endpoints/drafts)
- [Files & Attachments](nylas://endpoints/attachments)
- [Folders & Labels](nylas://endpoints/folders)
- [Search](nylas://endpoints/search)

## Calendar

- [Calendars](nylas://endpoints/calendars)
- [Events](nylas://endpoints/events)
- [Availability](nylas://endpoints/availability)
- [Free/Busy](nylas://endpoints/free-busy)

## Contacts

- [Contacts](nylas://endpoints/contacts)

## Webhooks

- [Webhooks](nylas://endpoints/webhooks)`,
        mimeType: "text/markdown"
      }]
    })
  );

  // Register a resource for specific endpoint categories
  server.resource(
    "endpoint-category",
    new ResourceTemplate("nylas://endpoints/{category}", { list: undefined }),
    async (uri, { category }) => {
      // Convert category to string if it's an array
      const categoryStr = typeof category === 'string' ? category : category[0];
      
      // Map of categories to their endpoint documentation
      const categories: Record<string, string> = {
        "messages": `# Messages Endpoints

## Overview

The Messages endpoints allow you to read, send, and manage email messages.

## Endpoints

### List Messages

\`GET /v3/grants/{grant_id}/messages\`

Retrieves a list of messages from a user's mailbox.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`limit\` (query): Maximum number of messages to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`sort\` (query): Sort order (default: "-date")
- \`view\` (query): View type ("ids", "count", "expanded")
- \`thread_id\` (query): Filter by thread ID
- \`received_after\` (query): Filter by received date (Unix timestamp)
- \`received_before\` (query): Filter by received date (Unix timestamp)
- \`in\` (query): Filter by folder/label ID

**Response:**
- \`data\`: Array of message objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Message

\`GET /v3/grants/{grant_id}/messages/{message_id}\`

Retrieves a specific message by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`message_id\` (path): The ID of the message

**Response:**
- Message object with full details

### Send Message

\`POST /v3/grants/{grant_id}/messages\`

Sends a new email message.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`subject\`: Email subject
- \`to\`: Array of recipient objects
- \`cc\` (optional): Array of CC recipient objects
- \`bcc\` (optional): Array of BCC recipient objects
- \`body\`: Email body content
- \`file_ids\` (optional): Array of file IDs to attach

**Response:**
- Created message object

### Update Message

\`PUT /v3/grants/{grant_id}/messages/{message_id}\`

Updates a message's properties.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`message_id\` (path): The ID of the message

**Request Body:**
- \`unread\` (optional): Boolean indicating read/unread state
- \`starred\` (optional): Boolean indicating starred state
- \`folder_id\` (optional): ID of the folder to move the message to

**Response:**
- Updated message object

### Delete Message

\`DELETE /v3/grants/{grant_id}/messages/{message_id}\`

Moves a message to the trash folder.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`message_id\` (path): The ID of the message

**Response:**
- \`status\`: Success status`,

        "threads": `# Threads Endpoints

## Overview

The Threads endpoints allow you to read and manage email threads (conversations).

## Endpoints

### List Threads

\`GET /v3/grants/{grant_id}/threads\`

Retrieves a list of threads from a user's mailbox.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`limit\` (query): Maximum number of threads to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`view\` (query): View type ("ids", "count", "expanded")
- \`received_after\` (query): Filter by received date (Unix timestamp)
- \`received_before\` (query): Filter by received date (Unix timestamp)
- \`in\` (query): Filter by folder/label ID

**Response:**
- \`data\`: Array of thread objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Thread

\`GET /v3/grants/{grant_id}/threads/{thread_id}\`

Retrieves a specific thread by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`thread_id\` (path): The ID of the thread

**Response:**
- Thread object with full details including messages

### Update Thread

\`PUT /v3/grants/{grant_id}/threads/{thread_id}\`

Updates a thread's properties.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`thread_id\` (path): The ID of the thread

**Request Body:**
- \`unread\` (optional): Boolean indicating read/unread state
- \`starred\` (optional): Boolean indicating starred state
- \`folder_id\` (optional): ID of the folder to move the thread to

**Response:**
- Updated thread object`,

        "drafts": `# Drafts Endpoints

## Overview

The Drafts endpoints allow you to create, read, update, and send email drafts.

## Endpoints

### List Drafts

\`GET /v3/grants/{grant_id}/drafts\`

Retrieves a list of drafts from a user's mailbox.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`limit\` (query): Maximum number of drafts to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset

**Response:**
- \`data\`: Array of draft objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Draft

\`GET /v3/grants/{grant_id}/drafts/{draft_id}\`

Retrieves a specific draft by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`draft_id\` (path): The ID of the draft

**Response:**
- Draft object with full details

### Create Draft

\`POST /v3/grants/{grant_id}/drafts\`

Creates a new email draft.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`subject\`: Email subject
- \`to\` (optional): Array of recipient objects
- \`cc\` (optional): Array of CC recipient objects
- \`bcc\` (optional): Array of BCC recipient objects
- \`body\` (optional): Email body content
- \`file_ids\` (optional): Array of file IDs to attach

**Response:**
- Created draft object

### Update Draft

\`PUT /v3/grants/{grant_id}/drafts/{draft_id}\`

Updates an existing draft.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`draft_id\` (path): The ID of the draft

**Request Body:**
- \`subject\` (optional): Email subject
- \`to\` (optional): Array of recipient objects
- \`cc\` (optional): Array of CC recipient objects
- \`bcc\` (optional): Array of BCC recipient objects
- \`body\` (optional): Email body content
- \`file_ids\` (optional): Array of file IDs to attach

**Response:**
- Updated draft object

### Delete Draft

\`DELETE /v3/grants/{grant_id}/drafts/{draft_id}\`

Deletes a draft.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`draft_id\` (path): The ID of the draft

**Response:**
- \`status\`: Success status

### Send Draft

\`POST /v3/grants/{grant_id}/drafts/{draft_id}/send\`

Sends an existing draft.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`draft_id\` (path): The ID of the draft

**Response:**
- Sent message object`,

        "attachments": `# Files & Attachments Endpoints

## Overview

The Files & Attachments endpoints allow you to upload, download, and manage files attached to emails.

## Endpoints

### List Files

\`GET /v3/grants/{grant_id}/files\`

Retrieves a list of files attached to emails.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`limit\` (query): Maximum number of files to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`message_id\` (query): Filter by message ID

**Response:**
- \`data\`: Array of file objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get File

\`GET /v3/grants/{grant_id}/files/{file_id}\`

Retrieves metadata for a specific file.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`file_id\` (path): The ID of the file

**Response:**
- File object with metadata

### Download File

\`GET /v3/grants/{grant_id}/files/{file_id}/download\`

Downloads the content of a file.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`file_id\` (path): The ID of the file

**Response:**
- Binary file content with appropriate Content-Type header

### Upload File

\`POST /v3/grants/{grant_id}/files\`

Uploads a new file to be attached to emails.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- Multipart form data with file content

**Response:**
- Uploaded file object with ID for attachment`,

        "folders": `# Folders & Labels Endpoints

## Overview

The Folders & Labels endpoints allow you to manage email organization structures.

## Endpoints

### List Folders

\`GET /v3/grants/{grant_id}/folders\`

Retrieves a list of folders from a user's mailbox.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Response:**
- \`data\`: Array of folder objects

### Get Folder

\`GET /v3/grants/{grant_id}/folders/{folder_id}\`

Retrieves a specific folder by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`folder_id\` (path): The ID of the folder

**Response:**
- Folder object with details

### Create Folder

\`POST /v3/grants/{grant_id}/folders\`

Creates a new folder.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`name\`: Folder name
- \`parent_id\` (optional): Parent folder ID for nested folders

**Response:**
- Created folder object

### Update Folder

\`PUT /v3/grants/{grant_id}/folders/{folder_id}\`

Updates a folder's properties.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`folder_id\` (path): The ID of the folder

**Request Body:**
- \`name\` (optional): New folder name
- \`parent_id\` (optional): New parent folder ID

**Response:**
- Updated folder object

### Delete Folder

\`DELETE /v3/grants/{grant_id}/folders/{folder_id}\`

Deletes a folder.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`folder_id\` (path): The ID of the folder

**Response:**
- \`status\`: Success status`,

        "search": `# Search Endpoints

## Overview

The Search endpoints allow you to search for emails by various criteria.

## Endpoints

### Search Messages

\`GET /v3/grants/{grant_id}/messages/search\`

Searches for messages matching specific criteria.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`q\` (query): Search query string
- \`limit\` (query): Maximum number of results to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`in\` (query): Filter by folder/label ID
- \`date_gt\` (query): Filter by date greater than (Unix timestamp)
- \`date_lt\` (query): Filter by date less than (Unix timestamp)

**Response:**
- \`data\`: Array of matching message objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Search Threads

\`GET /v3/grants/{grant_id}/threads/search\`

Searches for threads matching specific criteria.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`q\` (query): Search query string
- \`limit\` (query): Maximum number of results to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`in\` (query): Filter by folder/label ID
- \`date_gt\` (query): Filter by date greater than (Unix timestamp)
- \`date_lt\` (query): Filter by date less than (Unix timestamp)

**Response:**
- \`data\`: Array of matching thread objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist`,

        "calendars": `# Calendars Endpoints

## Overview

The Calendars endpoints allow you to read and manage calendar containers.

## Endpoints

### List Calendars

\`GET /v3/grants/{grant_id}/calendars\`

Retrieves a list of calendars for a user.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Response:**
- \`data\`: Array of calendar objects

### Get Calendar

\`GET /v3/grants/{grant_id}/calendars/{calendar_id}\`

Retrieves a specific calendar by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`calendar_id\` (path): The ID of the calendar

**Response:**
- Calendar object with details

### Create Calendar

\`POST /v3/grants/{grant_id}/calendars\`

Creates a new calendar.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`name\`: Calendar name
- \`description\` (optional): Calendar description
- \`location\` (optional): Calendar location
- \`timezone\` (optional): Calendar timezone
- \`metadata\` (optional): Custom metadata

**Response:**
- Created calendar object

### Update Calendar

\`PUT /v3/grants/{grant_id}/calendars/{calendar_id}\`

Updates a calendar's properties.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`calendar_id\` (path): The ID of the calendar

**Request Body:**
- \`name\` (optional): New calendar name
- \`description\` (optional): New calendar description
- \`location\` (optional): New calendar location
- \`timezone\` (optional): New calendar timezone
- \`metadata\` (optional): Updated custom metadata

**Response:**
- Updated calendar object

### Delete Calendar

\`DELETE /v3/grants/{grant_id}/calendars/{calendar_id}\`

Deletes a calendar.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`calendar_id\` (path): The ID of the calendar

**Response:**
- \`status\`: Success status`,

        "events": `# Events Endpoints

## Overview

The Events endpoints allow you to read, create, update, and delete calendar events.

## Endpoints

### List Events

\`GET /v3/grants/{grant_id}/events\`

Retrieves a list of events from a user's calendars.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`calendar_id\` (query): Filter by calendar ID
- \`limit\` (query): Maximum number of events to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`start_time\` (query): Filter by start time (Unix timestamp)
- \`end_time\` (query): Filter by end time (Unix timestamp)
- \`show_cancelled\` (query): Include cancelled events (default: false)

**Response:**
- \`data\`: Array of event objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Event

\`GET /v3/grants/{grant_id}/events/{event_id}\`

Retrieves a specific event by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`event_id\` (path): The ID of the event

**Response:**
- Event object with full details

### Create Event

\`POST /v3/grants/{grant_id}/events\`

Creates a new calendar event.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`calendar_id\`: Calendar ID to create the event in
- \`title\`: Event title
- \`start_time\`: Event start time (Unix timestamp)
- \`end_time\`: Event end time (Unix timestamp)
- \`description\` (optional): Event description
- \`location\` (optional): Event location
- \`participants\` (optional): Array of participant objects
- \`conferencing\` (optional): Conferencing details
- \`busy\` (optional): Whether the event shows as busy (default: true)
- \`reminders\` (optional): Array of reminder objects
- \`recurrence\` (optional): Recurrence rule

**Response:**
- Created event object

### Update Event

\`PUT /v3/grants/{grant_id}/events/{event_id}\`

Updates an existing event.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`event_id\` (path): The ID of the event

**Request Body:**
- \`calendar_id\` (optional): Calendar ID to move the event to
- \`title\` (optional): New event title
- \`start_time\` (optional): New event start time (Unix timestamp)
- \`end_time\` (optional): New event end time (Unix timestamp)
- \`description\` (optional): New event description
- \`location\` (optional): New event location
- \`participants\` (optional): Updated array of participant objects
- \`conferencing\` (optional): Updated conferencing details
- \`busy\` (optional): Whether the event shows as busy
- \`reminders\` (optional): Updated array of reminder objects
- \`recurrence\` (optional): Updated recurrence rule

**Response:**
- Updated event object

### Delete Event

\`DELETE /v3/grants/{grant_id}/events/{event_id}\`

Deletes an event.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`event_id\` (path): The ID of the event

**Response:**
- \`status\`: Success status`,

        "availability": `# Availability Endpoints

## Overview

The Availability endpoints allow you to find free/busy information and available times.

## Endpoints

### Get Availability

\`POST /v3/grants/{grant_id}/calendars/availability\`

Finds available time slots across multiple participants' calendars.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`start_time\`: Start of the time range to check (Unix timestamp)
- \`end_time\`: End of the time range to check (Unix timestamp)
- \`duration_minutes\`: Length of the slots to find
- \`participants\`: Array of participant objects with emails
- \`interval_minutes\` (optional): Interval between potential slots (default: 15)
- \`availability_rule\` (optional): Rule for determining availability ("any" or "all", default: "all")
- \`buffer_minutes\` (optional): Buffer time between meetings (default: 0)
- \`working_hours\` (optional): Working hours constraints
- \`open_hours\` (optional): Open hours constraints

**Response:**
- \`time_slots\`: Array of available time slot objects
- \`timezone\`: Timezone used for calculations`,

        "free-busy": `# Free/Busy Endpoints

## Overview

The Free/Busy endpoints allow you to check when users are free or busy.

## Endpoints

### Get Free/Busy

\`POST /v3/grants/{grant_id}/calendars/free-busy\`

Retrieves free/busy information for users.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`start_time\`: Start of the time range to check (Unix timestamp)
- \`end_time\`: End of the time range to check (Unix timestamp)
- \`emails\`: Array of email addresses to check

**Response:**
- \`free_busy\`: Object mapping emails to arrays of busy time periods`,

        "contacts": `# Contacts Endpoints

## Overview

The Contacts endpoints allow you to read, create, update, and delete contact information.

## Endpoints

### List Contacts

\`GET /v3/grants/{grant_id}/contacts\`

Retrieves a list of contacts.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`limit\` (query): Maximum number of contacts to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`email\` (query): Filter by email address
- \`phone_number\` (query): Filter by phone number
- \`source\` (query): Filter by source of the contact

**Response:**
- \`data\`: Array of contact objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Contact

\`GET /v3/grants/{grant_id}/contacts/{contact_id}\`

Retrieves a specific contact by ID.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`contact_id\` (path): The ID of the contact

**Response:**
- Contact object with full details

### Create Contact

\`POST /v3/grants/{grant_id}/contacts\`

Creates a new contact.

**Parameters:**
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`given_name\` (optional): First name
- \`middle_name\` (optional): Middle name
- \`surname\` (optional): Last name
- \`nickname\` (optional): Nickname
- \`emails\` (optional): Array of email objects
- \`phone_numbers\` (optional): Array of phone number objects
- \`physical_addresses\` (optional): Array of address objects
- \`web_pages\` (optional): Array of web page objects
- \`notes\` (optional): Notes about the contact
- \`job_title\` (optional): Job title
- \`company_name\` (optional): Company name
- \`picture\` (optional): Profile picture URL
- \`birthday\` (optional): Birthday (Unix timestamp)

**Response:**
- Created contact object

### Update Contact

\`PUT /v3/grants/{grant_id}/contacts/{contact_id}\`

Updates an existing contact.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`contact_id\` (path): The ID of the contact

**Request Body:**
- \`given_name\` (optional): Updated first name
- \`middle_name\` (optional): Updated middle name
- \`surname\` (optional): Updated last name
- \`nickname\` (optional): Updated nickname
- \`emails\` (optional): Updated array of email objects
- \`phone_numbers\` (optional): Updated array of phone number objects
- \`physical_addresses\` (optional): Updated array of address objects
- \`web_pages\` (optional): Updated array of web page objects
- \`notes\` (optional): Updated notes about the contact
- \`job_title\` (optional): Updated job title
- \`company_name\` (optional): Updated company name
- \`picture\` (optional): Updated profile picture URL
- \`birthday\` (optional): Updated birthday (Unix timestamp)

**Response:**
- Updated contact object

### Delete Contact

\`DELETE /v3/grants/{grant_id}/contacts/{contact_id}\`

Deletes a contact.

**Parameters:**
- \`grant_id\` (path): The ID of the grant
- \`contact_id\` (path): The ID of the contact

**Response:**
- \`status\`: Success status`,

        "webhooks": `# Webhooks Endpoints

## Overview

The Webhooks endpoints allow you to set up real-time notifications for changes to user data.

## Endpoints

### List Webhooks

\`GET /v3/applications/{application_id}/webhooks\`

Retrieves a list of webhooks for an application.

**Parameters:**
- \`application_id\` (path): The ID of the application
- \`limit\` (query): Maximum number of webhooks to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset

**Response:**
- \`data\`: Array of webhook objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Webhook

\`GET /v3/applications/{application_id}/webhooks/{webhook_id}\`

Retrieves a specific webhook by ID.

**Parameters:**
- \`application_id\` (path): The ID of the application
- \`webhook_id\` (path): The ID of the webhook

**Response:**
- Webhook object with full details

### Create Webhook

\`POST /v3/applications/{application_id}/webhooks\`

Creates a new webhook.

**Parameters:**
- \`application_id\` (path): The ID of the application

**Request Body:**
- \`webhook_url\`: URL to send webhook events to
- \`description\` (optional): Description of the webhook
- \`trigger_types\`: Array of event types to trigger the webhook
- \`webhook_secret\` (optional): Secret for securing webhook payloads
- \`grant_id\` (optional): Specific grant ID to monitor (omit for all grants)

**Response:**
- Created webhook object

### Update Webhook

\`PUT /v3/applications/{application_id}/webhooks/{webhook_id}\`

Updates an existing webhook.

**Parameters:**
- \`application_id\` (path): The ID of the application
- \`webhook_id\` (path): The ID of the webhook

**Request Body:**
- \`webhook_url\` (optional): Updated URL to send webhook events to
- \`description\` (optional): Updated description of the webhook
- \`trigger_types\` (optional): Updated array of event types to trigger the webhook
- \`webhook_secret\` (optional): Updated secret for securing webhook payloads
- \`status\` (optional): Updated status ("active" or "disabled")

**Response:**
- Updated webhook object

### Delete Webhook

\`DELETE /v3/applications/{application_id}/webhooks/{webhook_id}\`

Deletes a webhook.

**Parameters:**
- \`application_id\` (path): The ID of the application
- \`webhook_id\` (path): The ID of the webhook

**Response:**
- \`status\`: Success status

### Rotate Webhook Secret

\`POST /v3/applications/{application_id}/webhooks/{webhook_id}/rotate-secret\`

Generates a new secret for a webhook.

**Parameters:**
- \`application_id\` (path): The ID of the application
- \`webhook_id\` (path): The ID of the webhook

**Response:**
- \`webhook_secret\`: The new webhook secret`,
        
        "auth": `# Authentication Endpoints

## Overview

The Authentication endpoints allow you to initiate the OAuth flow and manage authentication tokens.

## Endpoints

### Generate Authentication URL

\`GET /v3/connect/oauth/authorize\`

Generates a URL to redirect users to for authentication.

**Parameters:**
- \`client_id\` (query): Your application's client ID
- \`redirect_uri\` (query): URL to redirect to after authentication
- \`response_type\` (query): Authentication response type (default: "code")
- \`scopes\` (query): Comma-separated list of permission scopes
- \`state\` (query): Optional state parameter for security
- \`provider\` (query, optional): Email provider ("google", "microsoft", etc.)
- \`login_hint\` (query, optional): User's email address for pre-filling

**Response:**
- Redirect to the authentication URL

### Exchange Code for Token

\`POST /v3/connect/oauth/token\`

Exchanges an authentication code for an access token.

**Request Body:**
- \`client_id\`: Your application's client ID
- \`client_secret\`: Your application's client secret
- \`grant_type\`: Type of grant (use "authorization_code")
- \`code\`: The authorization code received from the redirect
- \`redirect_uri\`: The same redirect URI used in the authorization request

**Response:**
- \`access_token\`: The access token for API requests
- \`token_type\`: Type of token (usually "bearer")
- \`expires_in\`: Time until token expiration (in seconds)
- \`refresh_token\`: Token for obtaining a new access token
- \`scope\`: Granted permission scopes
- \`grant_id\`: ID of the newly created grant

### Refresh Token

\`POST /v3/connect/oauth/token\`

Refreshes an expired access token.

**Request Body:**
- \`client_id\`: Your application's client ID
- \`client_secret\`: Your application's client secret
- \`grant_type\`: Type of grant (use "refresh_token")
- \`refresh_token\`: The refresh token received previously

**Response:**
- \`access_token\`: New access token for API requests
- \`token_type\`: Type of token (usually "bearer")
- \`expires_in\`: Time until token expiration (in seconds)
- \`refresh_token\`: New refresh token
- \`scope\`: Granted permission scopes`,

        "connected-accounts": `# Connected Accounts Endpoints

## Overview

The Connected Accounts endpoints allow you to manage user accounts connected to your application.

## Endpoints

### List Grants

\`GET /v3/applications/{application_id}/grants\`

Retrieves a list of grants (connected accounts) for your application.

**Parameters:**
- \`application_id\` (path): The ID of your application
- \`limit\` (query): Maximum number of grants to return (default: 10, max: 100)
- \`offset\` (query): Pagination offset
- \`provider\` (query, optional): Filter by provider
- \`email\` (query, optional): Filter by email address

**Response:**
- \`data\`: Array of grant objects
- \`next_cursor\`: Cursor for pagination
- \`has_more\`: Boolean indicating if more results exist

### Get Grant

\`GET /v3/applications/{application_id}/grants/{grant_id}\`

Retrieves a specific grant by ID.

**Parameters:**
- \`application_id\` (path): The ID of your application
- \`grant_id\` (path): The ID of the grant

**Response:**
- Grant object with full details

### Delete Grant

\`DELETE /v3/applications/{application_id}/grants/{grant_id}\`

Revokes a grant, disconnecting the user's account.

**Parameters:**
- \`application_id\` (path): The ID of your application
- \`grant_id\` (path): The ID of the grant

**Response:**
- \`status\`: Success status

### Update Grant

\`PUT /v3/applications/{application_id}/grants/{grant_id}\`

Updates properties of a grant.

**Parameters:**
- \`application_id\` (path): The ID of your application
- \`grant_id\` (path): The ID of the grant

**Request Body:**
- \`status\` (optional): New status ("active" or "disabled")
- \`ip_restrictions\` (optional): IP address restrictions
- \`scopes\` (optional): Updated permission scopes

**Response:**
- Updated grant object`
      };
      
      // Return the content for the requested category, or a not found message
      const content = categories[categoryStr] || `# Category Not Found\n\nThe requested endpoint category "${categoryStr}" is not available.`;
      
      return {
        contents: [{
          uri: uri.href,
          text: content,
          mimeType: "text/markdown"
        }]
      };
    }
  );
}