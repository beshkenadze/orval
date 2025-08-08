import { defineConfig } from 'orval';
import path from 'path';

export default defineConfig({
  petstoreSingle: {
    input: '../specifications/petstore.yaml',
    output: {
      target: '../generated/mcp/single/handlers.ts',
      schemas: '../generated/mcp/single/http-schemas',
      mode: 'single',
      client: 'mcp',
    },
  },
  petstoreSingleWithMutator: {
    input: '../specifications/petstore.yaml',
    output: {
      target: '../generated/mcp/single-with-mutator/handlers.ts',
      schemas: '../generated/mcp/single-with-mutator/http-schemas',
      mode: 'single',
      client: 'mcp',
      override: {
        mutator: {
          // use absolute path to avoid resolution issues
          path: path.resolve(__dirname, '../mutators/mcp-client.ts'),
          name: 'mcpInstance',
        },
      },
    },
  },
});
