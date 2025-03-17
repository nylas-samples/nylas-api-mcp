import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Import resources, tools, and prompts
import { registerResources } from "./resources/index.js";
import { registerTools } from "./tools/index.js";
import { registerPrompts } from "./prompts/index.js";

// Create an MCP server
const server = new McpServer({
  name: "Nylas API Docs",
  version: "1.0.0"
});

// Register all resources, tools, and prompts
registerResources(server);
registerTools(server);
registerPrompts(server);

async function main() {
  // Determine if we're running in stdio or HTTP mode
  const mode = process.env.MCP_MODE || "stdio";

  if (mode === "stdio") {
    // Connect using stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } else if (mode === "http") {
    // Start HTTP server with SSE
    const app = express();
    const port = parseInt(process.env.PORT || "3000");
    
    // Map to store active connections
    const activeConnections = new Map();
    
    app.get("/sse", async (req, res) => {
      const id = Date.now().toString();
      const transport = new SSEServerTransport("/messages", res);
      
      // Store the transport in our map
      activeConnections.set(id, transport);
      
      // Set headers for SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Access-Control-Allow-Origin", "*");
      
      // Add a query parameter with the connection ID
      res.write(`data: ${JSON.stringify({ id })}\n\n`);
      
      // Connect to the server
      await server.connect(transport);
      
      // Remove the connection when it closes
      req.on("close", () => {
        activeConnections.delete(id);
      });
    });
    
    app.post("/messages", express.json(), async (req, res) => {
      const id = req.query.id as string;
      
      if (!id || !activeConnections.has(id)) {
        return res.status(404).json({ error: "Connection not found" });
      }
      
      const transport = activeConnections.get(id);
      await transport.handlePostMessage(req, res);
    });
    
    app.listen(port, () => {
      console.log(`Nylas API MCP server running on http://localhost:${port}`);
    });
  } else {
    console.error(`Unknown mode: ${mode}. Use 'stdio' or 'http'.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});