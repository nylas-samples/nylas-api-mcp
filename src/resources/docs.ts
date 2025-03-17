import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Register documentation resources for the Nylas API
 */
export function registerDocsResources(server: McpServer) {
  // Register resource for Email API documentation
  server.resource(
    "email-api-docs",
    "nylas://docs/email",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `# Nylas Email API

The Nylas Email API allows you to read, send, and organize emails across multiple providers.

## Key Features

- **Read Emails**: Fetch emails from the user's inbox, sent folder, or custom folders/labels
- **Send Emails**: Compose and send emails with attachments and rich formatting
- **Search**: Search emails by various criteria
- **Thread Management**: Group related emails into threads
- **Labels/Folders**: Organize emails with labels or folders
- **Attachments**: Upload and download email attachments
- **Drafts**: Create, update, and manage email drafts

## Core Endpoints

- GET /messages - List messages
- GET /messages/{id} - Get a specific message
- POST /messages - Send a new message
- PUT /messages/{id} - Update a message
- DELETE /messages/{id} - Delete a message
- GET /threads - List threads
- GET /threads/{id} - Get a specific thread

## Primary Resources

- **Message**: An individual email message
- **Thread**: A collection of related messages
- **Attachment**: A file attached to a message
- **Draft**: An unsent message

## Webhooks and Events

Nylas can notify your application in real-time when emails are received, updated, or deleted through webhooks.`,
        mimeType: "text/markdown"
      }]
    })
  );

  // Register resource for Calendar API documentation
  server.resource(
    "calendar-api-docs",
    "nylas://docs/calendar",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `# Nylas Calendar API

The Nylas Calendar API allows you to read, create, update, and delete calendar events across multiple providers.

## Key Features

- **Events Management**: Create, read, update, and delete calendar events
- **Calendars**: Manage multiple calendars
- **Attendees**: Invite and manage event participants
- **Availability**: Check for free/busy times
- **Recurring Events**: Create and manage recurring event patterns
- **Reminders**: Set up notifications for upcoming events
- **Time Zone Support**: Handle events across different time zones

## Core Endpoints

- GET /events - List events
- GET /events/{id} - Get a specific event
- POST /events - Create a new event
- PUT /events/{id} - Update an event
- DELETE /events/{id} - Delete an event
- GET /calendars - List calendars
- GET /calendars/{id} - Get a specific calendar

## Primary Resources

- **Event**: A calendar event with time, location, and participants
- **Calendar**: A collection of events
- **Participant**: An attendee of an event
- **Free/Busy**: Availability information

## Webhooks and Events

Nylas can notify your application in real-time when calendar events are created, updated, or deleted through webhooks.`,
        mimeType: "text/markdown"
      }]
    })
  );

  // Register resource for Contacts API documentation
  server.resource(
    "contacts-api-docs",
    "nylas://docs/contacts",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `# Nylas Contacts API

The Nylas Contacts API allows you to read, create, update, and delete contacts across multiple providers.

## Key Features

- **Contacts Management**: Create, read, update, and delete contacts
- **Groups/Lists**: Organize contacts into groups or lists
- **Search**: Find contacts by name, email, or other attributes
- **Sync**: Keep contacts in sync across different platforms
- **Rich Data**: Store detailed contact information including email, phone, address, etc.

## Core Endpoints

- GET /contacts - List contacts
- GET /contacts/{id} - Get a specific contact
- POST /contacts - Create a new contact
- PUT /contacts/{id} - Update a contact
- DELETE /contacts/{id} - Delete a contact

## Primary Resources

- **Contact**: A person with contact information
- **Group**: A collection of contacts (supported by some providers)

## Webhooks and Events

Nylas can notify your application in real-time when contacts are created, updated, or deleted through webhooks.`,
        mimeType: "text/markdown"
      }]
    })
  );

  // Register resource for Webhook documentation
  server.resource(
    "webhooks-docs",
    "nylas://docs/webhooks",
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: `# Nylas Webhooks

Nylas Webhooks allow your application to receive real-time notifications when data changes in a user's account.

## Key Features

- **Real-time Updates**: Get notified immediately when data changes
- **Filtered Notifications**: Subscribe to specific types of events
- **Reduced API Calls**: Eliminate polling for changes
- **Secure Delivery**: Verify webhook authenticity with signatures

## Setting Up Webhooks

1. **Create Webhook**: Register a webhook URL with Nylas
2. **Configure Triggers**: Specify which events should trigger notifications
3. **Handle Notifications**: Process incoming webhook payloads
4. **Verify Signatures**: Ensure webhooks are authentic using the provided signature

## Event Types

- **message.created**: A new email message was received
- **message.updated**: An email message was updated
- **message.deleted**: An email message was deleted
- **thread.replied**: A reply was added to a thread
- **calendar.created**: A calendar was created
- **event.created**: A calendar event was created
- **event.updated**: A calendar event was updated
- **event.deleted**: A calendar event was deleted
- **contact.created**: A contact was created
- **contact.updated**: A contact was updated
- **contact.deleted**: A contact was deleted

## Webhook Management

Webhooks can be created, updated, and deleted through the Nylas Dashboard or API.`,
        mimeType: "text/markdown"
      }]
    })
  );

  // Register documentation for a specific resource by name
  server.resource(
    "docs-by-topic",
    new ResourceTemplate("nylas://docs/{topic}", { list: undefined }),
    async (uri, { topic }) => {
      // Convert topic to string if it's an array
      const topicStr = typeof topic === 'string' ? topic : topic[0];
      
      // Map of topics to their content
      const topics: Record<string, string> = {
        "authentication": `# Nylas Authentication

Nylas uses OAuth 2.0 for authentication. This secure protocol allows users to grant your application access to their email, calendar, and contacts data without sharing their passwords.

## Authentication Flow

1. **Redirect to Nylas**: Your application redirects the user to the Nylas authorization page
2. **User Authorization**: The user logs in to their email provider and authorizes your application
3. **Redirect Back**: Nylas redirects back to your application with an authorization code
4. **Token Exchange**: Your server exchanges the code for an access token
5. **API Access**: Use the access token to make API requests on behalf of the user

## Security Best Practices

- Store tokens securely, treat them like passwords
- Implement token refresh logic for long-lived access
- Use HTTPS for all API requests
- Never expose your client secret in client-side code
- Implement proper token revocation when users disconnect

## Native Authentication

For some providers, Nylas also offers a native authentication option that allows users to enter their credentials directly in your application.`,

        "pagination": `# Pagination in Nylas API

Most Nylas API endpoints that return collections of resources support pagination to efficiently handle large result sets.

## How Pagination Works

Nylas uses cursor-based pagination for consistent results when data is changing:

1. **Initial Request**: Make a request without pagination parameters
2. **Response**: The API returns a batch of results and pagination metadata
3. **Next Page**: Use the \`offset\` parameter from the response to fetch the next page
4. **Continue**: Repeat until all desired results are retrieved or no more results are available

## Pagination Parameters

- **limit**: Number of items to return (default and max values vary by endpoint)
- **offset**: Cursor for the next page of results

## Example Response with Pagination

\`\`\`json
{
  "data": [
    // Resource objects
  ],
  "next_cursor": "ZGF0ZT0xNjQ2NjE0ODAwMDAwJnJvd0lkPTEwMDA=",
  "has_more": true
}
\`\`\`

## Efficient Pagination

- Use appropriate limit values for your use case
- Only fetch as many pages as needed
- Consider implementing virtual scrolling for large datasets
- Cache results when appropriate`,

        "rate-limits": `# Nylas API Rate Limits

Nylas implements rate limits to ensure fair usage of the platform and maintain service stability.

## Rate Limit Structure

Nylas uses a token bucket system for rate limiting:

- Each endpoint has a specific rate limit
- Rate limits are applied per user account
- Some endpoints have higher limits than others based on their usage patterns

## Rate Limit Headers

When you make API requests, Nylas includes rate limit information in the response headers:

- **X-RateLimit-Limit**: Total number of requests allowed in the current time window
- **X-RateLimit-Remaining**: Number of requests remaining in the current time window
- **X-RateLimit-Reset**: Time (in seconds) until the rate limit resets

## Handling Rate Limits

When you exceed a rate limit, Nylas returns a 429 Too Many Requests status code. Best practices for handling rate limits:

1. Check the rate limit headers in each response
2. Implement exponential backoff when you receive a 429 response
3. Spread requests evenly over time when possible
4. For bulk operations, use batch endpoints where available
5. Cache data when appropriate to reduce API calls

## Rate Limit Increases

If your application requires higher rate limits, you can contact Nylas support to discuss your needs and possible solutions.`,

        "errors": `# Nylas API Error Handling

Understanding and properly handling Nylas API errors will help create a robust integration.

## Error Format

Nylas API errors follow a consistent format:

\`\`\`json
{
  "error": {
    "type": "invalid_request_error",
    "message": "A human-readable description of the error",
    "param": "Optional parameter that caused the error"
  }
}
\`\`\`

## Common Error Types

- **invalid_request_error**: The request was malformed or contained invalid parameters
- **authentication_error**: Authentication failed (invalid token, expired token, etc.)
- **resource_not_found_error**: The requested resource does not exist
- **rate_limit_error**: You have exceeded the rate limit for the endpoint
- **provider_error**: The email provider returned an error
- **internal_error**: An unexpected error occurred on the Nylas servers

## HTTP Status Codes

- **400** Bad Request: Invalid request parameters
- **401** Unauthorized: Authentication failed
- **403** Forbidden: Insufficient permissions
- **404** Not Found: Resource not found
- **429** Too Many Requests: Rate limit exceeded
- **500** Internal Server Error: Unexpected server error
- **503** Service Unavailable: Temporary server unavailability

## Error Handling Best Practices

1. Parse the error type and message to determine the appropriate action
2. Implement retries with exponential backoff for transient errors (429, 500, 503)
3. Log errors for troubleshooting
4. Handle authentication errors by refreshing tokens or prompting for re-authentication
5. Provide clear feedback to users when errors occur`
      };
      
      // Return the content for the requested topic, or a not found message
      const content = topics[topicStr] || `# Topic Not Found\n\nThe requested topic "${topicStr}" is not available.`;
      
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