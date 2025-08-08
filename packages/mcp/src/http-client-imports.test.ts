import { describe, it, expect } from 'vitest';
import { generateExtraFiles } from './index';

describe('MCP http-client mutator imports', () => {
  it('includes custom mutator import when mutator is configured', async () => {
    const verbOptions = {
      getPet: {
        verb: 'get',
        route: '/pets',
        pathRoute: '/pets',
        summary: 'Get pet',
        doc: '',
        tags: [],
        operationId: 'getPet',
        operationName: 'getPet',
        response: {
          imports: [],
          definition: { success: 'any', errors: 'any' },
          isBlob: false,
          types: {
            success: [
              {
                value: 'any',
                key: '200',
                contentType: 'application/json',
                type: 'unknown',
                isEnum: false,
                hasReadonlyProps: false,
                imports: [],
                schemas: [],
              },
            ],
            errors: [],
          },
          contentTypes: ['application/json'],
          schemas: [],
        },
        body: {
          originalSchema: {} as any,
          imports: [],
          definition: '',
          implementation: '',
          schemas: [],
          contentType: '',
          isOptional: true,
        },
        headers: undefined,
        queryParams: undefined,
        params: [],
        props: [],
        mutator: {
          name: 'mcpInstance',
          path: '../mutators/mcp-client',
          default: false,
          hasErrorType: false,
          errorTypeName: 'ErrorType',
          hasSecondArg: true,
          hasThirdArg: false,
          isHook: false,
        },
        override: {
          header: false,
          title: undefined as any,
          formData: { disabled: true },
          zod: {
            generateEachHttpStatus: false,
            strict: {
              body: false,
              header: false,
              param: false,
              query: false,
              response: false,
            },
            generate: {
              body: false,
              header: false,
              param: false,
              query: false,
              response: false,
            },
            coerce: {
              body: false,
              header: false,
              param: false,
              query: false,
              response: false,
            },
            dateTimeOptions: { separator: 'T' } as any,
            timeOptions: { separator: ':' } as any,
            preprocess: {},
          },
          fetch: { explode: false },
          angular: { provideIn: false },
          swr: {},
          query: {},
          requestOptions: true,
        } as any,
        deprecated: false,
        originalOperation: {} as any,
      },
    } as any;

    const output = {
      target: '/tmp/handlers.ts',
      schemas: '/tmp/http-schemas',
      client: 'mcp',
      baseUrl: '',
      override: {
        header: false,
        angular: { provideIn: false },
        formData: { disabled: true },
        fetch: { explode: false },
      },
    } as any;

    const context = {
      specKey: 'test',
      target: '/tmp/handlers.ts',
      workspace: '/tmp',
      specs: {
        test: {
          openapi: '3.0.0',
          info: { title: 'Test', version: '1.0.0' },
          paths: { '/pets': { get: {} } },
        },
      },
      output,
    } as any;

    const files = await generateExtraFiles(verbOptions, output, context);
    const httpClient = files.find((f) => f.path.endsWith('http-client.ts'));
    expect(httpClient).toBeTruthy();
    expect(httpClient!.content).toContain(
      "import { mcpInstance } from '../mutators/mcp-client'",
    );
  });
});
