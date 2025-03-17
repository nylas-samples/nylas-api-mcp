# Nylas API MCP Server (Experimental)

> **Note**: This project is experimental and is intended as an exploration of using the Model Context Protocol (MCP) as a guide for Nylas API integrations. It is not official and should be used for learning and experimentation purposes only.

This project implements a Model Context Protocol (MCP) server for the Nylas API. It provides resources, tools, and prompts to help developers learn about and integrate with the Nylas API for email, calendar, and contacts functionality.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) is a standard for integrating data, tools, and prompts with AI applications. MCP servers can expose resources, tools, and prompts to AI applications like [Claude Desktop](https://claude.ai/download), [Cursor](https://cursor.sh), and other MCP-compatible applications.

## Features

This MCP server provides:

- **Documentation Resources**: Comprehensive documentation about Nylas API endpoints, authentication, and best practices
- **Code Samples**: Ready-to-use code samples for various Nylas API operations in multiple languages (Node.js, Python, Java, Ruby, curl)
- **Interactive Tools**: Tools to generate authentication code and endpoint-specific implementation code
- **Prompts**: Pre-built prompts for common Nylas integration scenarios

![Screenshot 2025-03-16 at 4 43 38 PM](https://github.com/user-attachments/assets/01436765-2eb8-4d8b-90ab-f0a8544355db)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone this repository
2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

### Running the MCP Server

#### Using stdio (for direct integration with MCP clients)

```bash
npm start
```

#### Using HTTP with SSE (for remote connections)

```bash
MCP_MODE=http npm start
```

By default, the HTTP server runs on port 3000. You can change this by setting the `PORT` environment variable:

```bash
MCP_MODE=http PORT=8080 npm start
```

## Using with MCP Clients

### Claude Desktop

1. Start the MCP server in stdio mode
2. In Claude Desktop, go to Settings > Servers
3. Click "Add Server"
4. Select "Run a local command" and enter the command to start this server:

```bash
node /path/to/nylas-api-mcp/dist/index.js
```

5. Give it a name (e.g., "Nylas API")
6. After adding, you can use all the Nylas API resources, tools, and prompts in your Claude conversations

### Cursor

1. Start the MCP server in stdio mode
2. In Cursor, add a new MCP server in the settings
3. Configure it to use the command:

```bash
node /path/to/nylas-api-mcp/dist/index.js
```

## Resources

This MCP server provides the following resources:

- **General Documentation**: Overview of Nylas API capabilities
- **Authentication Guide**: How to authenticate with Nylas API
- **API Endpoints**: Documentation for email, calendar, contacts, and webhook endpoints
- **Code Samples**: Usage examples in multiple programming languages

## Tools

Interactive tools for code generation:

- **generate-auth-code**: Generates authentication code in your preferred language
- **generate-endpoint-code**: Generates code for specific API endpoints
- **search-api-docs**: Search through the Nylas API documentation

## Prompts

Pre-built prompts for common scenarios:

- **Getting Started**: Basic intro to Nylas API
- **Authentication Guide**: Understanding OAuth flow
- **Email/Calendar/Contacts Integration**: Feature-specific guidance
- **Integration Scenarios**: Guidance for specific use cases (email client, calendar booking, etc.)
- **SDK Examples**: Example code in various languages
- **Debugging Guide**: Common issues and solutions

## Contributing

Contributions are welcome! You can:

1. Add more code samples to the `nylas-code-samples` directory
2. Improve documentation resources
3. Add support for additional programming languages
4. Create new tools and prompts

## Disclaimer

This is an experimental project and is not officially supported by Nylas. The information and code provided through this MCP server should be used as a learning resource only. Always refer to the [official Nylas documentation](https://developer.nylas.com/) for the most accurate and up-to-date information on the Nylas API.

The sample code provided is for educational purposes and may need additional error handling, security considerations, and testing before being used in production environments.

## License

MIT
