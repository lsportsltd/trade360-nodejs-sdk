import { Expose } from 'class-transformer';
import { z } from 'zod';

export class HttpRequestDto {
  @Expose()
  packageId!: number;

  @Expose()
  username!: string;

  @Expose()
  password!: string;
}

export const HttpRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  packageId: z.number().int().positive(),
});

// Type inference
export type HttpRequest = z.infer<typeof HttpRequestSchema>;
