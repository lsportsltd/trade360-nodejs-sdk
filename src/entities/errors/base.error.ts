export type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string | symbol]: Jsonable }
  | { toJSON(): Jsonable };

/**
 * Base class for all custom errors.
 */
export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { error?: Error; context?: Jsonable; cause?: BaseError } = {},
  ) {
    // const { cause, context } = options;
    const { context } = options;

    // super(message, { cause });
    super(message);
    this.name = this.constructor.name;

    this.context = context;
  }
}
