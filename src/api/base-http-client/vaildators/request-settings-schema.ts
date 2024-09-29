import { z } from 'zod';

/**
 * Schema for the HTTP request object. This schema is used to parse and validate the HTTP request object.
 * The HTTP request object is used to configure the connection to the HTTP server.
 */
export const HttpRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  packageId: z.number().int().positive(),
});

// Type inference
export type HttpRequest = z.infer<typeof HttpRequestSchema>;
