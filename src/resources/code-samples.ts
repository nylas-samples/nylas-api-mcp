import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from 'fs/promises';
import path from 'path';

/**
 * Register code sample resources for the Nylas API
 */
export async function registerCodeSamplesResources(server: McpServer) {
  // Path to the code samples directory
  const codeSamplesPath = path.join(process.cwd(), 'nylas-code-samples');
  
  // Register a resource for each code sample category
  await registerCategories(server, codeSamplesPath);
  
  // Register a resource for specific code samples by path
  server.resource(
    "code-sample-by-path",
    new ResourceTemplate("nylas://code-samples/{path*}", { list: undefined }),
    async (uri, { path: samplePath }) => {
      try {
        // Replace slashes in the path parameter with the correct path separator
        const normalizedPath = typeof samplePath === 'string' ? samplePath.replace(/\//g, path.sep) : samplePath.join(path.sep);
        
        // Determine if it's a directory or a file
        const fullPath = path.join(codeSamplesPath, normalizedPath);
        const stats = await fs.stat(fullPath);
        
        if (stats.isDirectory()) {
          // If it's a directory, list the contents
          const files = await fs.readdir(fullPath);
          const mdFiles = files.filter(file => file.endsWith('.md'));
          
          // If there's an index.md file, use that
          if (mdFiles.includes('index.md')) {
            const indexContent = await fs.readFile(path.join(fullPath, 'index.md'), 'utf-8');
            return {
              contents: [{
                uri: uri.href,
                text: indexContent,
                mimeType: "text/markdown"
              }]
            };
          }
          
          // Otherwise, create a directory listing
          const listing = `# ${path.basename(normalizedPath)} Code Samples\n\n` +
            `Available samples:\n\n` +
            mdFiles.map(file => `- [${file.replace('.md', '')}](nylas://code-samples/${samplePath}/${file})`).join('\n');
          
          return {
            contents: [{
              uri: uri.href,
              text: listing,
              mimeType: "text/markdown"
            }]
          };
        } else {
          // If it's a file, return its contents
          const content = await fs.readFile(fullPath, 'utf-8');
          return {
            contents: [{
              uri: uri.href,
              text: content,
              mimeType: "text/markdown"
            }]
          };
        }
      } catch (error) {
        // If the file doesn't exist, return a not found message
        return {
          contents: [{
            uri: uri.href,
            text: `# Not Found\n\nThe requested code sample "${samplePath}" was not found.`,
            mimeType: "text/markdown"
          }]
        };
      }
    }
  );
  
  // Register a resource to get code samples by language
  server.resource(
    "code-samples-by-language",
    new ResourceTemplate("nylas://code-samples/language/{language}/{category?}", { list: undefined }),
    async (uri, { language, category }) => {
      try {
        // Normalize language name
        const normalizedLanguage = normalizeLanguageName(typeof language === 'string' ? language : language[0]);
        
        // If a category is specified, search only in that category
        if (category) {
          const categoryPath = path.join(codeSamplesPath, typeof category === 'string' ? category : category[0]);
          const samples = await findCodeSamplesByLanguage(categoryPath, normalizedLanguage);
          
          return {
            contents: [{
              uri: uri.href,
              text: formatCodeSamplesForLanguage(normalizedLanguage, typeof category === 'string' ? category : category[0], samples),
              mimeType: "text/markdown"
            }]
          };
        } else {
          // Search in all categories
          const categories = await fs.readdir(codeSamplesPath);
          
          // Store all found code samples
          const allSamples: Record<string, string[]> = {};
          
          // Find code samples in each category
          for (const cat of categories) {
            const categoryPath = path.join(codeSamplesPath, cat);
            
            // Skip if not a directory
            const stats = await fs.stat(categoryPath);
            if (!stats.isDirectory()) continue;
            
            const samples = await findCodeSamplesByLanguage(categoryPath, normalizedLanguage);
            if (samples.length > 0) {
              allSamples[cat] = samples;
            }
          }
          
          return {
            contents: [{
              uri: uri.href,
              text: formatAllCodeSamplesForLanguage(normalizedLanguage, allSamples),
              mimeType: "text/markdown"
            }]
          };
        }
      } catch (error) {
        // If there's an error, return an error message
        return {
          contents: [{
            uri: uri.href,
            text: `# Error\n\nAn error occurred while searching for ${language} code samples${category ? ` in ${category}` : ''}.`,
            mimeType: "text/markdown"
          }]
        };
      }
    }
  );
}

/**
 * Register resources for all categories of code samples
 */
async function registerCategories(server: McpServer, codeSamplesPath: string) {
  // Register a resource listing all categories
  server.resource(
    "code-samples-categories",
    "nylas://code-samples",
    async (uri) => {
      try {
        const categories = await fs.readdir(codeSamplesPath);
        const dirCategories = await Promise.all(
          categories.map(async (category) => {
            const categoryPath = path.join(codeSamplesPath, category);
            const stats = await fs.stat(categoryPath);
            return stats.isDirectory() ? category : null;
          })
        );
        
        const validCategories = dirCategories.filter(Boolean) as string[];
        
        const content = `# Nylas API Code Samples

This resource provides code samples for integrating with the Nylas API in various programming languages.

## Available Categories

${validCategories.map(category => `- [${category}](nylas://code-samples/${category})`).join('\n')}

## Samples by Language

You can also view samples filtered by programming language:

- [Node.js](nylas://code-samples/language/node)
- [Python](nylas://code-samples/language/python)
- [Java](nylas://code-samples/language/java)
- [Ruby](nylas://code-samples/language/ruby)
- [API (curl)](nylas://code-samples/language/api)`;
        
        return {
          contents: [{
            uri: uri.href,
            text: content,
            mimeType: "text/markdown"
          }]
        };
      } catch (error) {
        return {
          contents: [{
            uri: uri.href,
            text: "# Error\n\nFailed to load code sample categories.",
            mimeType: "text/markdown"
          }]
        };
      }
    }
  );
}

/**
 * Recursively find code samples for a specific language in a directory
 */
async function findCodeSamplesByLanguage(dirPath: string, language: string): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively search in subdirectories
        const subResults = await findCodeSamplesByLanguage(fullPath, language);
        results.push(...subResults);
      } else if (entry.name.endsWith('.md')) {
        // Check if the file contains code samples for the specified language
        const content = await fs.readFile(fullPath, 'utf-8');
        
        if (content.includes(`\`\`\`${language}`) || 
            (language === 'Node' && content.includes('```Node')) ||
            (language === 'API' && content.includes('```API'))) {
          // Store the relative path instead of the absolute path
          const relativePath = fullPath.replace(process.cwd() + path.sep + 'nylas-code-samples' + path.sep, '');
          results.push(relativePath);
        }
      }
    }
  } catch (error) {
    // Ignore errors and return what we found so far
  }
  
  return results;
}

/**
 * Normalize language names to match code block markers in markdown files
 */
function normalizeLanguageName(language: string): string {
  const langMap: Record<string, string> = {
    'node': 'Node',
    'nodejs': 'Node',
    'javascript': 'Node',
    'js': 'Node',
    'python': 'Python',
    'py': 'Python',
    'java': 'Java',
    'ruby': 'Ruby',
    'rb': 'Ruby',
    'curl': 'API',
    'api': 'API',
    'rest': 'API'
  };
  
  return langMap[language.toLowerCase()] || language;
}

/**
 * Format code samples for a specific language in a category
 */
function formatCodeSamplesForLanguage(language: string, category: string, samples: string[]): string {
  if (samples.length === 0) {
    return `# No ${language} Code Samples Found\n\nNo code samples for ${language} were found in the ${category} category.`;
  }
  
  return `# ${language} Code Samples for ${category}\n\n` +
    `Found ${samples.length} code sample(s) for ${language} in the ${category} category:\n\n` +
    samples.map(sample => `- [${path.basename(sample, '.md')}](nylas://code-samples/${sample.replace(/\\/g, '/')})`).join('\n');
}

/**
 * Format all code samples for a specific language across all categories
 */
function formatAllCodeSamplesForLanguage(language: string, samples: Record<string, string[]>): string {
  const categories = Object.keys(samples);
  
  if (categories.length === 0) {
    return `# No ${language} Code Samples Found\n\nNo code samples for ${language} were found.`;
  }
  
  let content = `# ${language} Code Samples\n\n`;
  
  for (const category of categories) {
    content += `## ${category}\n\n`;
    
    content += samples[category]
      .map(sample => `- [${path.basename(sample, '.md')}](nylas://code-samples/${sample.replace(/\\/g, '/')})`).join('\n');
    
    content += '\n\n';
  }
  
  return content;
}