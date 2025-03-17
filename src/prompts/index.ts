import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

/**
 * Register all prompts with the MCP server
 */
export function registerPrompts(server: McpServer) {
  // Register general prompts
  registerGeneralPrompts(server);
  
  // Register feature-specific prompts
  registerFeaturePrompts(server);
  
  // Register integration prompts
  registerIntegrationPrompts(server);
}

/**
 * Register general prompts for Nylas API
 */
function registerGeneralPrompts(server: McpServer) {
  // Prompt for getting started with Nylas
  server.prompt(
    "nylas-getting-started",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I want to integrate with the Nylas API. Can you help me get started and explain the basic steps?`
          }
        }
      ]
    })
  );
  
  // Prompt for understanding authentication
  server.prompt(
    "nylas-auth-guide",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Explain how authentication works with the Nylas API. What are the steps to authenticate users and what OAuth flow should I implement?`
          }
        }
      ]
    })
  );
  
  // Prompt for API best practices
  server.prompt(
    "nylas-api-best-practices",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What are the best practices for working with the Nylas API? Please include information about rate limits, error handling, and efficient API usage.`
          }
        }
      ]
    })
  );
}

/**
 * Register prompts for specific Nylas API features
 */
function registerFeaturePrompts(server: McpServer) {
  // Prompt for email integration
  server.prompt(
    "nylas-email-integration",
    {
      feature: z.enum(["read", "send", "threads", "search", "attachments", "drafts"]).optional()
    },
    ({ feature }) => {
      let message = `I want to integrate email functionality using the Nylas API.`;
      
      if (feature) {
        switch (feature) {
          case "read":
            message += ` Specifically, I need to implement the ability to read and display emails from a user's inbox. How should I approach this?`;
            break;
          case "send":
            message += ` Specifically, I need to implement the ability to send emails through my application. How should I approach this?`;
            break;
          case "threads":
            message += ` Specifically, I need to implement conversation threading to group related emails. How should I approach this?`;
            break;
          case "search":
            message += ` Specifically, I need to implement email search functionality. How should I approach this?`;
            break;
          case "attachments":
            message += ` Specifically, I need to implement handling of email attachments (both uploading and downloading). How should I approach this?`;
            break;
          case "drafts":
            message += ` Specifically, I need to implement email draft functionality. How should I approach this?`;
            break;
        }
      } else {
        message += ` What are the key features I should know about and how should I implement them?`;
      }
      
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: message
            }
          }
        ]
      };
    }
  );
  
  // Prompt for calendar integration
  server.prompt(
    "nylas-calendar-integration",
    {
      feature: z.enum(["events", "availability", "recurring"]).optional()
    },
    ({ feature }) => {
      let message = `I want to integrate calendar functionality using the Nylas API.`;
      
      if (feature) {
        switch (feature) {
          case "events":
            message += ` Specifically, I need to implement the ability to create, read, update, and delete calendar events. How should I approach this?`;
            break;
          case "availability":
            message += ` Specifically, I need to implement availability checking and scheduling. How should I approach this?`;
            break;
          case "recurring":
            message += ` Specifically, I need to implement recurring events. How should I approach this?`;
            break;
        }
      } else {
        message += ` What are the key features I should know about and how should I implement them?`;
      }
      
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: message
            }
          }
        ]
      };
    }
  );
  
  // Prompt for contacts integration
  server.prompt(
    "nylas-contacts-integration",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I want to integrate contacts functionality using the Nylas API. What are the key features I should know about and how should I implement them?`
          }
        }
      ]
    })
  );
  
  // Prompt for webhooks
  server.prompt(
    "nylas-webhooks-guide",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I want to implement webhooks with the Nylas API to get real-time updates. How do I set up and handle webhooks properly?`
          }
        }
      ]
    })
  );
}

/**
 * Register prompts for integration scenarios
 */
function registerIntegrationPrompts(server: McpServer) {
  // Prompt for debugging common issues
  server.prompt(
    "nylas-debug-common-issues",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `What are the most common issues developers face when integrating with the Nylas API, and how can I debug and resolve them?`
          }
        }
      ]
    })
  );
  
  // Prompt for implementing specific integration scenario
  server.prompt(
    "nylas-integration-scenario",
    {
      scenario: z.enum([
        "email-client", 
        "calendar-booking", 
        "crm-integration", 
        "customer-support", 
        "automated-workflows"
      ])
    },
    ({ scenario }) => {
      let message = "";
      
      switch (scenario) {
        case "email-client":
          message = `I want to build an email client using the Nylas API that allows users to read, send, organize, and search emails. What are the key components I need to implement and what API endpoints should I use?`;
          break;
        case "calendar-booking":
          message = `I want to build a calendar booking system using the Nylas API that allows users to share their availability and let others book time slots. What are the key components I need to implement and what API endpoints should I use?`;
          break;
        case "crm-integration":
          message = `I want to integrate Nylas with my CRM system to sync emails, calendar events, and contacts. What are the key components I need to implement and what API endpoints should I use?`;
          break;
        case "customer-support":
          message = `I want to build a customer support system that uses Nylas to access and respond to customer emails. What are the key components I need to implement and what API endpoints should I use?`;
          break;
        case "automated-workflows":
          message = `I want to implement automated workflows using Nylas, such as scheduling follow-ups, sending reminder emails, and organizing incoming messages. What are the key components I need to implement and what API endpoints should I use?`;
          break;
      }
      
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: message
            }
          }
        ]
      };
    }
  );
  
  // Prompt for SDK usage examples
  server.prompt(
    "nylas-sdk-examples",
    {
      language: z.enum(["node", "python", "java", "ruby"])
    },
    ({ language }) => {
      const normalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
      
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Can you provide code examples for common Nylas API operations using the ${normalizedLanguage} SDK? Include examples for authentication, reading emails, sending emails, and working with calendar events.`
            }
          }
        ]
      };
    }
  );
  
  // Prompt for migrating from v2 to v3
  server.prompt(
    "nylas-v3-migration",
    {},
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `I'm migrating from Nylas API v2 to v3. What are the key differences and how should I update my code?`
          }
        }
      ]
    })
  );
}