
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Formulario
 * 
 */
export type Formulario = $Result.DefaultSelection<Prisma.$FormularioPayload>
/**
 * Model Oferta
 * 
 */
export type Oferta = $Result.DefaultSelection<Prisma.$OfertaPayload>
/**
 * Model Proyecto
 * 
 */
export type Proyecto = $Result.DefaultSelection<Prisma.$ProyectoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Usuarios
 * const usuarios = await prisma.usuario.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Usuarios
   * const usuarios = await prisma.usuario.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formulario`: Exposes CRUD operations for the **Formulario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formularios
    * const formularios = await prisma.formulario.findMany()
    * ```
    */
  get formulario(): Prisma.FormularioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oferta`: Exposes CRUD operations for the **Oferta** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ofertas
    * const ofertas = await prisma.oferta.findMany()
    * ```
    */
  get oferta(): Prisma.OfertaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proyecto`: Exposes CRUD operations for the **Proyecto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proyectos
    * const proyectos = await prisma.proyecto.findMany()
    * ```
    */
  get proyecto(): Prisma.ProyectoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Usuario: 'Usuario',
    Formulario: 'Formulario',
    Oferta: 'Oferta',
    Proyecto: 'Proyecto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "usuario" | "formulario" | "oferta" | "proyecto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Formulario: {
        payload: Prisma.$FormularioPayload<ExtArgs>
        fields: Prisma.FormularioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormularioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormularioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          findFirst: {
            args: Prisma.FormularioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormularioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          findMany: {
            args: Prisma.FormularioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>[]
          }
          create: {
            args: Prisma.FormularioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          createMany: {
            args: Prisma.FormularioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormularioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>[]
          }
          delete: {
            args: Prisma.FormularioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          update: {
            args: Prisma.FormularioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          deleteMany: {
            args: Prisma.FormularioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormularioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormularioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>[]
          }
          upsert: {
            args: Prisma.FormularioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormularioPayload>
          }
          aggregate: {
            args: Prisma.FormularioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormulario>
          }
          groupBy: {
            args: Prisma.FormularioGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormularioGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormularioCountArgs<ExtArgs>
            result: $Utils.Optional<FormularioCountAggregateOutputType> | number
          }
        }
      }
      Oferta: {
        payload: Prisma.$OfertaPayload<ExtArgs>
        fields: Prisma.OfertaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfertaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfertaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          findFirst: {
            args: Prisma.OfertaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfertaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          findMany: {
            args: Prisma.OfertaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>[]
          }
          create: {
            args: Prisma.OfertaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          createMany: {
            args: Prisma.OfertaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfertaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>[]
          }
          delete: {
            args: Prisma.OfertaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          update: {
            args: Prisma.OfertaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          deleteMany: {
            args: Prisma.OfertaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfertaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfertaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>[]
          }
          upsert: {
            args: Prisma.OfertaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfertaPayload>
          }
          aggregate: {
            args: Prisma.OfertaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOferta>
          }
          groupBy: {
            args: Prisma.OfertaGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfertaGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfertaCountArgs<ExtArgs>
            result: $Utils.Optional<OfertaCountAggregateOutputType> | number
          }
        }
      }
      Proyecto: {
        payload: Prisma.$ProyectoPayload<ExtArgs>
        fields: Prisma.ProyectoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProyectoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProyectoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          findFirst: {
            args: Prisma.ProyectoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProyectoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          findMany: {
            args: Prisma.ProyectoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>[]
          }
          create: {
            args: Prisma.ProyectoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          createMany: {
            args: Prisma.ProyectoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProyectoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>[]
          }
          delete: {
            args: Prisma.ProyectoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          update: {
            args: Prisma.ProyectoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          deleteMany: {
            args: Prisma.ProyectoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProyectoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProyectoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>[]
          }
          upsert: {
            args: Prisma.ProyectoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProyectoPayload>
          }
          aggregate: {
            args: Prisma.ProyectoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProyecto>
          }
          groupBy: {
            args: Prisma.ProyectoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProyectoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProyectoCountArgs<ExtArgs>
            result: $Utils.Optional<ProyectoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    usuario?: UsuarioOmit
    formulario?: FormularioOmit
    oferta?: OfertaOmit
    proyecto?: ProyectoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    formulario: number
    ofertasCreadas: number
    proyectosCreados: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formulario?: boolean | UsuarioCountOutputTypeCountFormularioArgs
    ofertasCreadas?: boolean | UsuarioCountOutputTypeCountOfertasCreadasArgs
    proyectosCreados?: boolean | UsuarioCountOutputTypeCountProyectosCreadosArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountFormularioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormularioWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountOfertasCreadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfertaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountProyectosCreadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProyectoWhereInput
  }


  /**
   * Count Type OfertaCountOutputType
   */

  export type OfertaCountOutputType = {
    formulario: number
  }

  export type OfertaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formulario?: boolean | OfertaCountOutputTypeCountFormularioArgs
  }

  // Custom InputTypes
  /**
   * OfertaCountOutputType without action
   */
  export type OfertaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfertaCountOutputType
     */
    select?: OfertaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OfertaCountOutputType without action
   */
  export type OfertaCountOutputTypeCountFormularioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormularioWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    id: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    id: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    contraseña: string | null
    mail: string | null
    rolPostulante: boolean | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    contraseña: string | null
    mail: string | null
    rolPostulante: boolean | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nombre: number
    contraseña: number
    mail: number
    rolPostulante: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    id?: true
  }

  export type UsuarioSumAggregateInputType = {
    id?: true
  }

  export type UsuarioMinAggregateInputType = {
    id?: true
    nombre?: true
    contraseña?: true
    mail?: true
    rolPostulante?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nombre?: true
    contraseña?: true
    mail?: true
    rolPostulante?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nombre?: true
    contraseña?: true
    mail?: true
    rolPostulante?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    contraseña?: boolean
    mail?: boolean
    rolPostulante?: boolean
    formulario?: boolean | Usuario$formularioArgs<ExtArgs>
    ofertasCreadas?: boolean | Usuario$ofertasCreadasArgs<ExtArgs>
    proyectosCreados?: boolean | Usuario$proyectosCreadosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    contraseña?: boolean
    mail?: boolean
    rolPostulante?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    contraseña?: boolean
    mail?: boolean
    rolPostulante?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    id?: boolean
    nombre?: boolean
    contraseña?: boolean
    mail?: boolean
    rolPostulante?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "contraseña" | "mail" | "rolPostulante", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formulario?: boolean | Usuario$formularioArgs<ExtArgs>
    ofertasCreadas?: boolean | Usuario$ofertasCreadasArgs<ExtArgs>
    proyectosCreados?: boolean | Usuario$proyectosCreadosArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      formulario: Prisma.$FormularioPayload<ExtArgs>[]
      ofertasCreadas: Prisma.$OfertaPayload<ExtArgs>[]
      proyectosCreados: Prisma.$ProyectoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      contraseña: string
      mail: string
      rolPostulante: boolean
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formulario<T extends Usuario$formularioArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$formularioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ofertasCreadas<T extends Usuario$ofertasCreadasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$ofertasCreadasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    proyectosCreados<T extends Usuario$proyectosCreadosArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$proyectosCreadosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly id: FieldRef<"Usuario", 'Int'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly contraseña: FieldRef<"Usuario", 'String'>
    readonly mail: FieldRef<"Usuario", 'String'>
    readonly rolPostulante: FieldRef<"Usuario", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.formulario
   */
  export type Usuario$formularioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    where?: FormularioWhereInput
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    cursor?: FormularioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormularioScalarFieldEnum | FormularioScalarFieldEnum[]
  }

  /**
   * Usuario.ofertasCreadas
   */
  export type Usuario$ofertasCreadasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    where?: OfertaWhereInput
    orderBy?: OfertaOrderByWithRelationInput | OfertaOrderByWithRelationInput[]
    cursor?: OfertaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfertaScalarFieldEnum | OfertaScalarFieldEnum[]
  }

  /**
   * Usuario.proyectosCreados
   */
  export type Usuario$proyectosCreadosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    where?: ProyectoWhereInput
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    cursor?: ProyectoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Formulario
   */

  export type AggregateFormulario = {
    _count: FormularioCountAggregateOutputType | null
    _avg: FormularioAvgAggregateOutputType | null
    _sum: FormularioSumAggregateOutputType | null
    _min: FormularioMinAggregateOutputType | null
    _max: FormularioMaxAggregateOutputType | null
  }

  export type FormularioAvgAggregateOutputType = {
    postuladoId: number | null
    ofertaId: number | null
  }

  export type FormularioSumAggregateOutputType = {
    postuladoId: number | null
    ofertaId: number | null
  }

  export type FormularioMinAggregateOutputType = {
    postuladoId: number | null
    ofertaId: number | null
    nombre: string | null
    apellido: string | null
    localidad: string | null
    pais: string | null
    genero: string | null
    descripcion: string | null
    curriculum: string | null
  }

  export type FormularioMaxAggregateOutputType = {
    postuladoId: number | null
    ofertaId: number | null
    nombre: string | null
    apellido: string | null
    localidad: string | null
    pais: string | null
    genero: string | null
    descripcion: string | null
    curriculum: string | null
  }

  export type FormularioCountAggregateOutputType = {
    postuladoId: number
    ofertaId: number
    nombre: number
    apellido: number
    localidad: number
    pais: number
    genero: number
    descripcion: number
    curriculum: number
    _all: number
  }


  export type FormularioAvgAggregateInputType = {
    postuladoId?: true
    ofertaId?: true
  }

  export type FormularioSumAggregateInputType = {
    postuladoId?: true
    ofertaId?: true
  }

  export type FormularioMinAggregateInputType = {
    postuladoId?: true
    ofertaId?: true
    nombre?: true
    apellido?: true
    localidad?: true
    pais?: true
    genero?: true
    descripcion?: true
    curriculum?: true
  }

  export type FormularioMaxAggregateInputType = {
    postuladoId?: true
    ofertaId?: true
    nombre?: true
    apellido?: true
    localidad?: true
    pais?: true
    genero?: true
    descripcion?: true
    curriculum?: true
  }

  export type FormularioCountAggregateInputType = {
    postuladoId?: true
    ofertaId?: true
    nombre?: true
    apellido?: true
    localidad?: true
    pais?: true
    genero?: true
    descripcion?: true
    curriculum?: true
    _all?: true
  }

  export type FormularioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formulario to aggregate.
     */
    where?: FormularioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formularios to fetch.
     */
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormularioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formularios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formularios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Formularios
    **/
    _count?: true | FormularioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormularioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormularioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormularioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormularioMaxAggregateInputType
  }

  export type GetFormularioAggregateType<T extends FormularioAggregateArgs> = {
        [P in keyof T & keyof AggregateFormulario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormulario[P]>
      : GetScalarType<T[P], AggregateFormulario[P]>
  }




  export type FormularioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormularioWhereInput
    orderBy?: FormularioOrderByWithAggregationInput | FormularioOrderByWithAggregationInput[]
    by: FormularioScalarFieldEnum[] | FormularioScalarFieldEnum
    having?: FormularioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormularioCountAggregateInputType | true
    _avg?: FormularioAvgAggregateInputType
    _sum?: FormularioSumAggregateInputType
    _min?: FormularioMinAggregateInputType
    _max?: FormularioMaxAggregateInputType
  }

  export type FormularioGroupByOutputType = {
    postuladoId: number
    ofertaId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
    _count: FormularioCountAggregateOutputType | null
    _avg: FormularioAvgAggregateOutputType | null
    _sum: FormularioSumAggregateOutputType | null
    _min: FormularioMinAggregateOutputType | null
    _max: FormularioMaxAggregateOutputType | null
  }

  type GetFormularioGroupByPayload<T extends FormularioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormularioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormularioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormularioGroupByOutputType[P]>
            : GetScalarType<T[P], FormularioGroupByOutputType[P]>
        }
      >
    >


  export type FormularioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postuladoId?: boolean
    ofertaId?: boolean
    nombre?: boolean
    apellido?: boolean
    localidad?: boolean
    pais?: boolean
    genero?: boolean
    descripcion?: boolean
    curriculum?: boolean
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulario"]>

  export type FormularioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postuladoId?: boolean
    ofertaId?: boolean
    nombre?: boolean
    apellido?: boolean
    localidad?: boolean
    pais?: boolean
    genero?: boolean
    descripcion?: boolean
    curriculum?: boolean
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulario"]>

  export type FormularioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postuladoId?: boolean
    ofertaId?: boolean
    nombre?: boolean
    apellido?: boolean
    localidad?: boolean
    pais?: boolean
    genero?: boolean
    descripcion?: boolean
    curriculum?: boolean
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulario"]>

  export type FormularioSelectScalar = {
    postuladoId?: boolean
    ofertaId?: boolean
    nombre?: boolean
    apellido?: boolean
    localidad?: boolean
    pais?: boolean
    genero?: boolean
    descripcion?: boolean
    curriculum?: boolean
  }

  export type FormularioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"postuladoId" | "ofertaId" | "nombre" | "apellido" | "localidad" | "pais" | "genero" | "descripcion" | "curriculum", ExtArgs["result"]["formulario"]>
  export type FormularioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type FormularioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type FormularioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oferta?: boolean | OfertaDefaultArgs<ExtArgs>
    postulado?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $FormularioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Formulario"
    objects: {
      oferta: Prisma.$OfertaPayload<ExtArgs>
      postulado: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      postuladoId: number
      ofertaId: number
      nombre: string
      apellido: string
      localidad: string
      pais: string
      genero: string
      descripcion: string
      curriculum: string
    }, ExtArgs["result"]["formulario"]>
    composites: {}
  }

  type FormularioGetPayload<S extends boolean | null | undefined | FormularioDefaultArgs> = $Result.GetResult<Prisma.$FormularioPayload, S>

  type FormularioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormularioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormularioCountAggregateInputType | true
    }

  export interface FormularioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Formulario'], meta: { name: 'Formulario' } }
    /**
     * Find zero or one Formulario that matches the filter.
     * @param {FormularioFindUniqueArgs} args - Arguments to find a Formulario
     * @example
     * // Get one Formulario
     * const formulario = await prisma.formulario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormularioFindUniqueArgs>(args: SelectSubset<T, FormularioFindUniqueArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formulario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormularioFindUniqueOrThrowArgs} args - Arguments to find a Formulario
     * @example
     * // Get one Formulario
     * const formulario = await prisma.formulario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormularioFindUniqueOrThrowArgs>(args: SelectSubset<T, FormularioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formulario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioFindFirstArgs} args - Arguments to find a Formulario
     * @example
     * // Get one Formulario
     * const formulario = await prisma.formulario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormularioFindFirstArgs>(args?: SelectSubset<T, FormularioFindFirstArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formulario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioFindFirstOrThrowArgs} args - Arguments to find a Formulario
     * @example
     * // Get one Formulario
     * const formulario = await prisma.formulario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormularioFindFirstOrThrowArgs>(args?: SelectSubset<T, FormularioFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formularios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formularios
     * const formularios = await prisma.formulario.findMany()
     * 
     * // Get first 10 Formularios
     * const formularios = await prisma.formulario.findMany({ take: 10 })
     * 
     * // Only select the `postuladoId`
     * const formularioWithPostuladoIdOnly = await prisma.formulario.findMany({ select: { postuladoId: true } })
     * 
     */
    findMany<T extends FormularioFindManyArgs>(args?: SelectSubset<T, FormularioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formulario.
     * @param {FormularioCreateArgs} args - Arguments to create a Formulario.
     * @example
     * // Create one Formulario
     * const Formulario = await prisma.formulario.create({
     *   data: {
     *     // ... data to create a Formulario
     *   }
     * })
     * 
     */
    create<T extends FormularioCreateArgs>(args: SelectSubset<T, FormularioCreateArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formularios.
     * @param {FormularioCreateManyArgs} args - Arguments to create many Formularios.
     * @example
     * // Create many Formularios
     * const formulario = await prisma.formulario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormularioCreateManyArgs>(args?: SelectSubset<T, FormularioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formularios and returns the data saved in the database.
     * @param {FormularioCreateManyAndReturnArgs} args - Arguments to create many Formularios.
     * @example
     * // Create many Formularios
     * const formulario = await prisma.formulario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formularios and only return the `postuladoId`
     * const formularioWithPostuladoIdOnly = await prisma.formulario.createManyAndReturn({
     *   select: { postuladoId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormularioCreateManyAndReturnArgs>(args?: SelectSubset<T, FormularioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formulario.
     * @param {FormularioDeleteArgs} args - Arguments to delete one Formulario.
     * @example
     * // Delete one Formulario
     * const Formulario = await prisma.formulario.delete({
     *   where: {
     *     // ... filter to delete one Formulario
     *   }
     * })
     * 
     */
    delete<T extends FormularioDeleteArgs>(args: SelectSubset<T, FormularioDeleteArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formulario.
     * @param {FormularioUpdateArgs} args - Arguments to update one Formulario.
     * @example
     * // Update one Formulario
     * const formulario = await prisma.formulario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormularioUpdateArgs>(args: SelectSubset<T, FormularioUpdateArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formularios.
     * @param {FormularioDeleteManyArgs} args - Arguments to filter Formularios to delete.
     * @example
     * // Delete a few Formularios
     * const { count } = await prisma.formulario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormularioDeleteManyArgs>(args?: SelectSubset<T, FormularioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formularios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formularios
     * const formulario = await prisma.formulario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormularioUpdateManyArgs>(args: SelectSubset<T, FormularioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formularios and returns the data updated in the database.
     * @param {FormularioUpdateManyAndReturnArgs} args - Arguments to update many Formularios.
     * @example
     * // Update many Formularios
     * const formulario = await prisma.formulario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formularios and only return the `postuladoId`
     * const formularioWithPostuladoIdOnly = await prisma.formulario.updateManyAndReturn({
     *   select: { postuladoId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormularioUpdateManyAndReturnArgs>(args: SelectSubset<T, FormularioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formulario.
     * @param {FormularioUpsertArgs} args - Arguments to update or create a Formulario.
     * @example
     * // Update or create a Formulario
     * const formulario = await prisma.formulario.upsert({
     *   create: {
     *     // ... data to create a Formulario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formulario we want to update
     *   }
     * })
     */
    upsert<T extends FormularioUpsertArgs>(args: SelectSubset<T, FormularioUpsertArgs<ExtArgs>>): Prisma__FormularioClient<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formularios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioCountArgs} args - Arguments to filter Formularios to count.
     * @example
     * // Count the number of Formularios
     * const count = await prisma.formulario.count({
     *   where: {
     *     // ... the filter for the Formularios we want to count
     *   }
     * })
    **/
    count<T extends FormularioCountArgs>(
      args?: Subset<T, FormularioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormularioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formulario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormularioAggregateArgs>(args: Subset<T, FormularioAggregateArgs>): Prisma.PrismaPromise<GetFormularioAggregateType<T>>

    /**
     * Group by Formulario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormularioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormularioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormularioGroupByArgs['orderBy'] }
        : { orderBy?: FormularioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormularioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormularioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Formulario model
   */
  readonly fields: FormularioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Formulario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormularioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oferta<T extends OfertaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OfertaDefaultArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    postulado<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Formulario model
   */
  interface FormularioFieldRefs {
    readonly postuladoId: FieldRef<"Formulario", 'Int'>
    readonly ofertaId: FieldRef<"Formulario", 'Int'>
    readonly nombre: FieldRef<"Formulario", 'String'>
    readonly apellido: FieldRef<"Formulario", 'String'>
    readonly localidad: FieldRef<"Formulario", 'String'>
    readonly pais: FieldRef<"Formulario", 'String'>
    readonly genero: FieldRef<"Formulario", 'String'>
    readonly descripcion: FieldRef<"Formulario", 'String'>
    readonly curriculum: FieldRef<"Formulario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Formulario findUnique
   */
  export type FormularioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter, which Formulario to fetch.
     */
    where: FormularioWhereUniqueInput
  }

  /**
   * Formulario findUniqueOrThrow
   */
  export type FormularioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter, which Formulario to fetch.
     */
    where: FormularioWhereUniqueInput
  }

  /**
   * Formulario findFirst
   */
  export type FormularioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter, which Formulario to fetch.
     */
    where?: FormularioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formularios to fetch.
     */
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formularios.
     */
    cursor?: FormularioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formularios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formularios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formularios.
     */
    distinct?: FormularioScalarFieldEnum | FormularioScalarFieldEnum[]
  }

  /**
   * Formulario findFirstOrThrow
   */
  export type FormularioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter, which Formulario to fetch.
     */
    where?: FormularioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formularios to fetch.
     */
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formularios.
     */
    cursor?: FormularioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formularios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formularios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formularios.
     */
    distinct?: FormularioScalarFieldEnum | FormularioScalarFieldEnum[]
  }

  /**
   * Formulario findMany
   */
  export type FormularioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter, which Formularios to fetch.
     */
    where?: FormularioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formularios to fetch.
     */
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Formularios.
     */
    cursor?: FormularioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formularios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formularios.
     */
    skip?: number
    distinct?: FormularioScalarFieldEnum | FormularioScalarFieldEnum[]
  }

  /**
   * Formulario create
   */
  export type FormularioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * The data needed to create a Formulario.
     */
    data: XOR<FormularioCreateInput, FormularioUncheckedCreateInput>
  }

  /**
   * Formulario createMany
   */
  export type FormularioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Formularios.
     */
    data: FormularioCreateManyInput | FormularioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Formulario createManyAndReturn
   */
  export type FormularioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * The data used to create many Formularios.
     */
    data: FormularioCreateManyInput | FormularioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Formulario update
   */
  export type FormularioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * The data needed to update a Formulario.
     */
    data: XOR<FormularioUpdateInput, FormularioUncheckedUpdateInput>
    /**
     * Choose, which Formulario to update.
     */
    where: FormularioWhereUniqueInput
  }

  /**
   * Formulario updateMany
   */
  export type FormularioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Formularios.
     */
    data: XOR<FormularioUpdateManyMutationInput, FormularioUncheckedUpdateManyInput>
    /**
     * Filter which Formularios to update
     */
    where?: FormularioWhereInput
    /**
     * Limit how many Formularios to update.
     */
    limit?: number
  }

  /**
   * Formulario updateManyAndReturn
   */
  export type FormularioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * The data used to update Formularios.
     */
    data: XOR<FormularioUpdateManyMutationInput, FormularioUncheckedUpdateManyInput>
    /**
     * Filter which Formularios to update
     */
    where?: FormularioWhereInput
    /**
     * Limit how many Formularios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Formulario upsert
   */
  export type FormularioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * The filter to search for the Formulario to update in case it exists.
     */
    where: FormularioWhereUniqueInput
    /**
     * In case the Formulario found by the `where` argument doesn't exist, create a new Formulario with this data.
     */
    create: XOR<FormularioCreateInput, FormularioUncheckedCreateInput>
    /**
     * In case the Formulario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormularioUpdateInput, FormularioUncheckedUpdateInput>
  }

  /**
   * Formulario delete
   */
  export type FormularioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    /**
     * Filter which Formulario to delete.
     */
    where: FormularioWhereUniqueInput
  }

  /**
   * Formulario deleteMany
   */
  export type FormularioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formularios to delete
     */
    where?: FormularioWhereInput
    /**
     * Limit how many Formularios to delete.
     */
    limit?: number
  }

  /**
   * Formulario without action
   */
  export type FormularioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
  }


  /**
   * Model Oferta
   */

  export type AggregateOferta = {
    _count: OfertaCountAggregateOutputType | null
    _avg: OfertaAvgAggregateOutputType | null
    _sum: OfertaSumAggregateOutputType | null
    _min: OfertaMinAggregateOutputType | null
    _max: OfertaMaxAggregateOutputType | null
  }

  export type OfertaAvgAggregateOutputType = {
    id: number | null
    sueldo: number | null
    creadorId: number | null
  }

  export type OfertaSumAggregateOutputType = {
    id: number | null
    sueldo: number | null
    creadorId: number | null
  }

  export type OfertaMinAggregateOutputType = {
    id: number | null
    categoria: string | null
    ubicacion: string | null
    sueldo: number | null
    modalidad: string | null
    creadorId: number | null
  }

  export type OfertaMaxAggregateOutputType = {
    id: number | null
    categoria: string | null
    ubicacion: string | null
    sueldo: number | null
    modalidad: string | null
    creadorId: number | null
  }

  export type OfertaCountAggregateOutputType = {
    id: number
    categoria: number
    ubicacion: number
    sueldo: number
    modalidad: number
    horario: number
    creadorId: number
    _all: number
  }


  export type OfertaAvgAggregateInputType = {
    id?: true
    sueldo?: true
    creadorId?: true
  }

  export type OfertaSumAggregateInputType = {
    id?: true
    sueldo?: true
    creadorId?: true
  }

  export type OfertaMinAggregateInputType = {
    id?: true
    categoria?: true
    ubicacion?: true
    sueldo?: true
    modalidad?: true
    creadorId?: true
  }

  export type OfertaMaxAggregateInputType = {
    id?: true
    categoria?: true
    ubicacion?: true
    sueldo?: true
    modalidad?: true
    creadorId?: true
  }

  export type OfertaCountAggregateInputType = {
    id?: true
    categoria?: true
    ubicacion?: true
    sueldo?: true
    modalidad?: true
    horario?: true
    creadorId?: true
    _all?: true
  }

  export type OfertaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Oferta to aggregate.
     */
    where?: OfertaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ofertas to fetch.
     */
    orderBy?: OfertaOrderByWithRelationInput | OfertaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfertaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ofertas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ofertas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ofertas
    **/
    _count?: true | OfertaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfertaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfertaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfertaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfertaMaxAggregateInputType
  }

  export type GetOfertaAggregateType<T extends OfertaAggregateArgs> = {
        [P in keyof T & keyof AggregateOferta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOferta[P]>
      : GetScalarType<T[P], AggregateOferta[P]>
  }




  export type OfertaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfertaWhereInput
    orderBy?: OfertaOrderByWithAggregationInput | OfertaOrderByWithAggregationInput[]
    by: OfertaScalarFieldEnum[] | OfertaScalarFieldEnum
    having?: OfertaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfertaCountAggregateInputType | true
    _avg?: OfertaAvgAggregateInputType
    _sum?: OfertaSumAggregateInputType
    _min?: OfertaMinAggregateInputType
    _max?: OfertaMaxAggregateInputType
  }

  export type OfertaGroupByOutputType = {
    id: number
    categoria: string
    ubicacion: string
    sueldo: number | null
    modalidad: string
    horario: Date[]
    creadorId: number
    _count: OfertaCountAggregateOutputType | null
    _avg: OfertaAvgAggregateOutputType | null
    _sum: OfertaSumAggregateOutputType | null
    _min: OfertaMinAggregateOutputType | null
    _max: OfertaMaxAggregateOutputType | null
  }

  type GetOfertaGroupByPayload<T extends OfertaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfertaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfertaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfertaGroupByOutputType[P]>
            : GetScalarType<T[P], OfertaGroupByOutputType[P]>
        }
      >
    >


  export type OfertaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoria?: boolean
    ubicacion?: boolean
    sueldo?: boolean
    modalidad?: boolean
    horario?: boolean
    creadorId?: boolean
    formulario?: boolean | Oferta$formularioArgs<ExtArgs>
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
    _count?: boolean | OfertaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oferta"]>

  export type OfertaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoria?: boolean
    ubicacion?: boolean
    sueldo?: boolean
    modalidad?: boolean
    horario?: boolean
    creadorId?: boolean
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oferta"]>

  export type OfertaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoria?: boolean
    ubicacion?: boolean
    sueldo?: boolean
    modalidad?: boolean
    horario?: boolean
    creadorId?: boolean
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oferta"]>

  export type OfertaSelectScalar = {
    id?: boolean
    categoria?: boolean
    ubicacion?: boolean
    sueldo?: boolean
    modalidad?: boolean
    horario?: boolean
    creadorId?: boolean
  }

  export type OfertaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "categoria" | "ubicacion" | "sueldo" | "modalidad" | "horario" | "creadorId", ExtArgs["result"]["oferta"]>
  export type OfertaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formulario?: boolean | Oferta$formularioArgs<ExtArgs>
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
    _count?: boolean | OfertaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OfertaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type OfertaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $OfertaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Oferta"
    objects: {
      formulario: Prisma.$FormularioPayload<ExtArgs>[]
      creador: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoria: string
      ubicacion: string
      sueldo: number | null
      modalidad: string
      horario: Date[]
      creadorId: number
    }, ExtArgs["result"]["oferta"]>
    composites: {}
  }

  type OfertaGetPayload<S extends boolean | null | undefined | OfertaDefaultArgs> = $Result.GetResult<Prisma.$OfertaPayload, S>

  type OfertaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfertaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfertaCountAggregateInputType | true
    }

  export interface OfertaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Oferta'], meta: { name: 'Oferta' } }
    /**
     * Find zero or one Oferta that matches the filter.
     * @param {OfertaFindUniqueArgs} args - Arguments to find a Oferta
     * @example
     * // Get one Oferta
     * const oferta = await prisma.oferta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfertaFindUniqueArgs>(args: SelectSubset<T, OfertaFindUniqueArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Oferta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfertaFindUniqueOrThrowArgs} args - Arguments to find a Oferta
     * @example
     * // Get one Oferta
     * const oferta = await prisma.oferta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfertaFindUniqueOrThrowArgs>(args: SelectSubset<T, OfertaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oferta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaFindFirstArgs} args - Arguments to find a Oferta
     * @example
     * // Get one Oferta
     * const oferta = await prisma.oferta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfertaFindFirstArgs>(args?: SelectSubset<T, OfertaFindFirstArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oferta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaFindFirstOrThrowArgs} args - Arguments to find a Oferta
     * @example
     * // Get one Oferta
     * const oferta = await prisma.oferta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfertaFindFirstOrThrowArgs>(args?: SelectSubset<T, OfertaFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ofertas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ofertas
     * const ofertas = await prisma.oferta.findMany()
     * 
     * // Get first 10 Ofertas
     * const ofertas = await prisma.oferta.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ofertaWithIdOnly = await prisma.oferta.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfertaFindManyArgs>(args?: SelectSubset<T, OfertaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Oferta.
     * @param {OfertaCreateArgs} args - Arguments to create a Oferta.
     * @example
     * // Create one Oferta
     * const Oferta = await prisma.oferta.create({
     *   data: {
     *     // ... data to create a Oferta
     *   }
     * })
     * 
     */
    create<T extends OfertaCreateArgs>(args: SelectSubset<T, OfertaCreateArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ofertas.
     * @param {OfertaCreateManyArgs} args - Arguments to create many Ofertas.
     * @example
     * // Create many Ofertas
     * const oferta = await prisma.oferta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfertaCreateManyArgs>(args?: SelectSubset<T, OfertaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ofertas and returns the data saved in the database.
     * @param {OfertaCreateManyAndReturnArgs} args - Arguments to create many Ofertas.
     * @example
     * // Create many Ofertas
     * const oferta = await prisma.oferta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ofertas and only return the `id`
     * const ofertaWithIdOnly = await prisma.oferta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfertaCreateManyAndReturnArgs>(args?: SelectSubset<T, OfertaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Oferta.
     * @param {OfertaDeleteArgs} args - Arguments to delete one Oferta.
     * @example
     * // Delete one Oferta
     * const Oferta = await prisma.oferta.delete({
     *   where: {
     *     // ... filter to delete one Oferta
     *   }
     * })
     * 
     */
    delete<T extends OfertaDeleteArgs>(args: SelectSubset<T, OfertaDeleteArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Oferta.
     * @param {OfertaUpdateArgs} args - Arguments to update one Oferta.
     * @example
     * // Update one Oferta
     * const oferta = await prisma.oferta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfertaUpdateArgs>(args: SelectSubset<T, OfertaUpdateArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ofertas.
     * @param {OfertaDeleteManyArgs} args - Arguments to filter Ofertas to delete.
     * @example
     * // Delete a few Ofertas
     * const { count } = await prisma.oferta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfertaDeleteManyArgs>(args?: SelectSubset<T, OfertaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ofertas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ofertas
     * const oferta = await prisma.oferta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfertaUpdateManyArgs>(args: SelectSubset<T, OfertaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ofertas and returns the data updated in the database.
     * @param {OfertaUpdateManyAndReturnArgs} args - Arguments to update many Ofertas.
     * @example
     * // Update many Ofertas
     * const oferta = await prisma.oferta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ofertas and only return the `id`
     * const ofertaWithIdOnly = await prisma.oferta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfertaUpdateManyAndReturnArgs>(args: SelectSubset<T, OfertaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Oferta.
     * @param {OfertaUpsertArgs} args - Arguments to update or create a Oferta.
     * @example
     * // Update or create a Oferta
     * const oferta = await prisma.oferta.upsert({
     *   create: {
     *     // ... data to create a Oferta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Oferta we want to update
     *   }
     * })
     */
    upsert<T extends OfertaUpsertArgs>(args: SelectSubset<T, OfertaUpsertArgs<ExtArgs>>): Prisma__OfertaClient<$Result.GetResult<Prisma.$OfertaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ofertas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaCountArgs} args - Arguments to filter Ofertas to count.
     * @example
     * // Count the number of Ofertas
     * const count = await prisma.oferta.count({
     *   where: {
     *     // ... the filter for the Ofertas we want to count
     *   }
     * })
    **/
    count<T extends OfertaCountArgs>(
      args?: Subset<T, OfertaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfertaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Oferta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfertaAggregateArgs>(args: Subset<T, OfertaAggregateArgs>): Prisma.PrismaPromise<GetOfertaAggregateType<T>>

    /**
     * Group by Oferta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfertaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfertaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfertaGroupByArgs['orderBy'] }
        : { orderBy?: OfertaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfertaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfertaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Oferta model
   */
  readonly fields: OfertaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Oferta.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfertaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formulario<T extends Oferta$formularioArgs<ExtArgs> = {}>(args?: Subset<T, Oferta$formularioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormularioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creador<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Oferta model
   */
  interface OfertaFieldRefs {
    readonly id: FieldRef<"Oferta", 'Int'>
    readonly categoria: FieldRef<"Oferta", 'String'>
    readonly ubicacion: FieldRef<"Oferta", 'String'>
    readonly sueldo: FieldRef<"Oferta", 'Int'>
    readonly modalidad: FieldRef<"Oferta", 'String'>
    readonly horario: FieldRef<"Oferta", 'DateTime[]'>
    readonly creadorId: FieldRef<"Oferta", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Oferta findUnique
   */
  export type OfertaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter, which Oferta to fetch.
     */
    where: OfertaWhereUniqueInput
  }

  /**
   * Oferta findUniqueOrThrow
   */
  export type OfertaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter, which Oferta to fetch.
     */
    where: OfertaWhereUniqueInput
  }

  /**
   * Oferta findFirst
   */
  export type OfertaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter, which Oferta to fetch.
     */
    where?: OfertaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ofertas to fetch.
     */
    orderBy?: OfertaOrderByWithRelationInput | OfertaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ofertas.
     */
    cursor?: OfertaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ofertas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ofertas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ofertas.
     */
    distinct?: OfertaScalarFieldEnum | OfertaScalarFieldEnum[]
  }

  /**
   * Oferta findFirstOrThrow
   */
  export type OfertaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter, which Oferta to fetch.
     */
    where?: OfertaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ofertas to fetch.
     */
    orderBy?: OfertaOrderByWithRelationInput | OfertaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ofertas.
     */
    cursor?: OfertaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ofertas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ofertas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ofertas.
     */
    distinct?: OfertaScalarFieldEnum | OfertaScalarFieldEnum[]
  }

  /**
   * Oferta findMany
   */
  export type OfertaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter, which Ofertas to fetch.
     */
    where?: OfertaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ofertas to fetch.
     */
    orderBy?: OfertaOrderByWithRelationInput | OfertaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ofertas.
     */
    cursor?: OfertaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ofertas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ofertas.
     */
    skip?: number
    distinct?: OfertaScalarFieldEnum | OfertaScalarFieldEnum[]
  }

  /**
   * Oferta create
   */
  export type OfertaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * The data needed to create a Oferta.
     */
    data: XOR<OfertaCreateInput, OfertaUncheckedCreateInput>
  }

  /**
   * Oferta createMany
   */
  export type OfertaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ofertas.
     */
    data: OfertaCreateManyInput | OfertaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Oferta createManyAndReturn
   */
  export type OfertaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * The data used to create many Ofertas.
     */
    data: OfertaCreateManyInput | OfertaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Oferta update
   */
  export type OfertaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * The data needed to update a Oferta.
     */
    data: XOR<OfertaUpdateInput, OfertaUncheckedUpdateInput>
    /**
     * Choose, which Oferta to update.
     */
    where: OfertaWhereUniqueInput
  }

  /**
   * Oferta updateMany
   */
  export type OfertaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ofertas.
     */
    data: XOR<OfertaUpdateManyMutationInput, OfertaUncheckedUpdateManyInput>
    /**
     * Filter which Ofertas to update
     */
    where?: OfertaWhereInput
    /**
     * Limit how many Ofertas to update.
     */
    limit?: number
  }

  /**
   * Oferta updateManyAndReturn
   */
  export type OfertaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * The data used to update Ofertas.
     */
    data: XOR<OfertaUpdateManyMutationInput, OfertaUncheckedUpdateManyInput>
    /**
     * Filter which Ofertas to update
     */
    where?: OfertaWhereInput
    /**
     * Limit how many Ofertas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Oferta upsert
   */
  export type OfertaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * The filter to search for the Oferta to update in case it exists.
     */
    where: OfertaWhereUniqueInput
    /**
     * In case the Oferta found by the `where` argument doesn't exist, create a new Oferta with this data.
     */
    create: XOR<OfertaCreateInput, OfertaUncheckedCreateInput>
    /**
     * In case the Oferta was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfertaUpdateInput, OfertaUncheckedUpdateInput>
  }

  /**
   * Oferta delete
   */
  export type OfertaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
    /**
     * Filter which Oferta to delete.
     */
    where: OfertaWhereUniqueInput
  }

  /**
   * Oferta deleteMany
   */
  export type OfertaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ofertas to delete
     */
    where?: OfertaWhereInput
    /**
     * Limit how many Ofertas to delete.
     */
    limit?: number
  }

  /**
   * Oferta.formulario
   */
  export type Oferta$formularioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formulario
     */
    select?: FormularioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formulario
     */
    omit?: FormularioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormularioInclude<ExtArgs> | null
    where?: FormularioWhereInput
    orderBy?: FormularioOrderByWithRelationInput | FormularioOrderByWithRelationInput[]
    cursor?: FormularioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormularioScalarFieldEnum | FormularioScalarFieldEnum[]
  }

  /**
   * Oferta without action
   */
  export type OfertaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oferta
     */
    select?: OfertaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Oferta
     */
    omit?: OfertaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfertaInclude<ExtArgs> | null
  }


  /**
   * Model Proyecto
   */

  export type AggregateProyecto = {
    _count: ProyectoCountAggregateOutputType | null
    _avg: ProyectoAvgAggregateOutputType | null
    _sum: ProyectoSumAggregateOutputType | null
    _min: ProyectoMinAggregateOutputType | null
    _max: ProyectoMaxAggregateOutputType | null
  }

  export type ProyectoAvgAggregateOutputType = {
    id: number | null
    creadorId: number | null
  }

  export type ProyectoSumAggregateOutputType = {
    id: number | null
    creadorId: number | null
  }

  export type ProyectoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    tecnologiasUsadas: string | null
    createdAt: Date | null
    creadorId: number | null
  }

  export type ProyectoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    tecnologiasUsadas: string | null
    createdAt: Date | null
    creadorId: number | null
  }

  export type ProyectoCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    tecnologiasUsadas: number
    createdAt: number
    creadorId: number
    _all: number
  }


  export type ProyectoAvgAggregateInputType = {
    id?: true
    creadorId?: true
  }

  export type ProyectoSumAggregateInputType = {
    id?: true
    creadorId?: true
  }

  export type ProyectoMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    tecnologiasUsadas?: true
    createdAt?: true
    creadorId?: true
  }

  export type ProyectoMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    tecnologiasUsadas?: true
    createdAt?: true
    creadorId?: true
  }

  export type ProyectoCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    tecnologiasUsadas?: true
    createdAt?: true
    creadorId?: true
    _all?: true
  }

  export type ProyectoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyecto to aggregate.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proyectos
    **/
    _count?: true | ProyectoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProyectoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProyectoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProyectoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProyectoMaxAggregateInputType
  }

  export type GetProyectoAggregateType<T extends ProyectoAggregateArgs> = {
        [P in keyof T & keyof AggregateProyecto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProyecto[P]>
      : GetScalarType<T[P], AggregateProyecto[P]>
  }




  export type ProyectoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProyectoWhereInput
    orderBy?: ProyectoOrderByWithAggregationInput | ProyectoOrderByWithAggregationInput[]
    by: ProyectoScalarFieldEnum[] | ProyectoScalarFieldEnum
    having?: ProyectoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProyectoCountAggregateInputType | true
    _avg?: ProyectoAvgAggregateInputType
    _sum?: ProyectoSumAggregateInputType
    _min?: ProyectoMinAggregateInputType
    _max?: ProyectoMaxAggregateInputType
  }

  export type ProyectoGroupByOutputType = {
    id: number
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt: Date
    creadorId: number
    _count: ProyectoCountAggregateOutputType | null
    _avg: ProyectoAvgAggregateOutputType | null
    _sum: ProyectoSumAggregateOutputType | null
    _min: ProyectoMinAggregateOutputType | null
    _max: ProyectoMaxAggregateOutputType | null
  }

  type GetProyectoGroupByPayload<T extends ProyectoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProyectoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProyectoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProyectoGroupByOutputType[P]>
            : GetScalarType<T[P], ProyectoGroupByOutputType[P]>
        }
      >
    >


  export type ProyectoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    tecnologiasUsadas?: boolean
    createdAt?: boolean
    creadorId?: boolean
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyecto"]>

  export type ProyectoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    tecnologiasUsadas?: boolean
    createdAt?: boolean
    creadorId?: boolean
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyecto"]>

  export type ProyectoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    tecnologiasUsadas?: boolean
    createdAt?: boolean
    creadorId?: boolean
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proyecto"]>

  export type ProyectoSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    tecnologiasUsadas?: boolean
    createdAt?: boolean
    creadorId?: boolean
  }

  export type ProyectoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "descripcion" | "tecnologiasUsadas" | "createdAt" | "creadorId", ExtArgs["result"]["proyecto"]>
  export type ProyectoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProyectoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type ProyectoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creador?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $ProyectoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proyecto"
    objects: {
      creador: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      descripcion: string
      tecnologiasUsadas: string
      createdAt: Date
      creadorId: number
    }, ExtArgs["result"]["proyecto"]>
    composites: {}
  }

  type ProyectoGetPayload<S extends boolean | null | undefined | ProyectoDefaultArgs> = $Result.GetResult<Prisma.$ProyectoPayload, S>

  type ProyectoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProyectoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProyectoCountAggregateInputType | true
    }

  export interface ProyectoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proyecto'], meta: { name: 'Proyecto' } }
    /**
     * Find zero or one Proyecto that matches the filter.
     * @param {ProyectoFindUniqueArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProyectoFindUniqueArgs>(args: SelectSubset<T, ProyectoFindUniqueArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proyecto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProyectoFindUniqueOrThrowArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProyectoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProyectoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyecto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindFirstArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProyectoFindFirstArgs>(args?: SelectSubset<T, ProyectoFindFirstArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proyecto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindFirstOrThrowArgs} args - Arguments to find a Proyecto
     * @example
     * // Get one Proyecto
     * const proyecto = await prisma.proyecto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProyectoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProyectoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proyectos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proyectos
     * const proyectos = await prisma.proyecto.findMany()
     * 
     * // Get first 10 Proyectos
     * const proyectos = await prisma.proyecto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proyectoWithIdOnly = await prisma.proyecto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProyectoFindManyArgs>(args?: SelectSubset<T, ProyectoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proyecto.
     * @param {ProyectoCreateArgs} args - Arguments to create a Proyecto.
     * @example
     * // Create one Proyecto
     * const Proyecto = await prisma.proyecto.create({
     *   data: {
     *     // ... data to create a Proyecto
     *   }
     * })
     * 
     */
    create<T extends ProyectoCreateArgs>(args: SelectSubset<T, ProyectoCreateArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proyectos.
     * @param {ProyectoCreateManyArgs} args - Arguments to create many Proyectos.
     * @example
     * // Create many Proyectos
     * const proyecto = await prisma.proyecto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProyectoCreateManyArgs>(args?: SelectSubset<T, ProyectoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proyectos and returns the data saved in the database.
     * @param {ProyectoCreateManyAndReturnArgs} args - Arguments to create many Proyectos.
     * @example
     * // Create many Proyectos
     * const proyecto = await prisma.proyecto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proyectos and only return the `id`
     * const proyectoWithIdOnly = await prisma.proyecto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProyectoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProyectoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proyecto.
     * @param {ProyectoDeleteArgs} args - Arguments to delete one Proyecto.
     * @example
     * // Delete one Proyecto
     * const Proyecto = await prisma.proyecto.delete({
     *   where: {
     *     // ... filter to delete one Proyecto
     *   }
     * })
     * 
     */
    delete<T extends ProyectoDeleteArgs>(args: SelectSubset<T, ProyectoDeleteArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proyecto.
     * @param {ProyectoUpdateArgs} args - Arguments to update one Proyecto.
     * @example
     * // Update one Proyecto
     * const proyecto = await prisma.proyecto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProyectoUpdateArgs>(args: SelectSubset<T, ProyectoUpdateArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proyectos.
     * @param {ProyectoDeleteManyArgs} args - Arguments to filter Proyectos to delete.
     * @example
     * // Delete a few Proyectos
     * const { count } = await prisma.proyecto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProyectoDeleteManyArgs>(args?: SelectSubset<T, ProyectoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proyectos
     * const proyecto = await prisma.proyecto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProyectoUpdateManyArgs>(args: SelectSubset<T, ProyectoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proyectos and returns the data updated in the database.
     * @param {ProyectoUpdateManyAndReturnArgs} args - Arguments to update many Proyectos.
     * @example
     * // Update many Proyectos
     * const proyecto = await prisma.proyecto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proyectos and only return the `id`
     * const proyectoWithIdOnly = await prisma.proyecto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProyectoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProyectoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proyecto.
     * @param {ProyectoUpsertArgs} args - Arguments to update or create a Proyecto.
     * @example
     * // Update or create a Proyecto
     * const proyecto = await prisma.proyecto.upsert({
     *   create: {
     *     // ... data to create a Proyecto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proyecto we want to update
     *   }
     * })
     */
    upsert<T extends ProyectoUpsertArgs>(args: SelectSubset<T, ProyectoUpsertArgs<ExtArgs>>): Prisma__ProyectoClient<$Result.GetResult<Prisma.$ProyectoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proyectos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoCountArgs} args - Arguments to filter Proyectos to count.
     * @example
     * // Count the number of Proyectos
     * const count = await prisma.proyecto.count({
     *   where: {
     *     // ... the filter for the Proyectos we want to count
     *   }
     * })
    **/
    count<T extends ProyectoCountArgs>(
      args?: Subset<T, ProyectoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProyectoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proyecto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProyectoAggregateArgs>(args: Subset<T, ProyectoAggregateArgs>): Prisma.PrismaPromise<GetProyectoAggregateType<T>>

    /**
     * Group by Proyecto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProyectoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProyectoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProyectoGroupByArgs['orderBy'] }
        : { orderBy?: ProyectoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProyectoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProyectoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proyecto model
   */
  readonly fields: ProyectoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proyecto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProyectoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creador<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proyecto model
   */
  interface ProyectoFieldRefs {
    readonly id: FieldRef<"Proyecto", 'Int'>
    readonly nombre: FieldRef<"Proyecto", 'String'>
    readonly descripcion: FieldRef<"Proyecto", 'String'>
    readonly tecnologiasUsadas: FieldRef<"Proyecto", 'String'>
    readonly createdAt: FieldRef<"Proyecto", 'DateTime'>
    readonly creadorId: FieldRef<"Proyecto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Proyecto findUnique
   */
  export type ProyectoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto findUniqueOrThrow
   */
  export type ProyectoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto findFirst
   */
  export type ProyectoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto findFirstOrThrow
   */
  export type ProyectoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyecto to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proyectos.
     */
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto findMany
   */
  export type ProyectoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter, which Proyectos to fetch.
     */
    where?: ProyectoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proyectos to fetch.
     */
    orderBy?: ProyectoOrderByWithRelationInput | ProyectoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proyectos.
     */
    cursor?: ProyectoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proyectos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proyectos.
     */
    skip?: number
    distinct?: ProyectoScalarFieldEnum | ProyectoScalarFieldEnum[]
  }

  /**
   * Proyecto create
   */
  export type ProyectoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The data needed to create a Proyecto.
     */
    data: XOR<ProyectoCreateInput, ProyectoUncheckedCreateInput>
  }

  /**
   * Proyecto createMany
   */
  export type ProyectoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proyectos.
     */
    data: ProyectoCreateManyInput | ProyectoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proyecto createManyAndReturn
   */
  export type ProyectoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * The data used to create many Proyectos.
     */
    data: ProyectoCreateManyInput | ProyectoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proyecto update
   */
  export type ProyectoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The data needed to update a Proyecto.
     */
    data: XOR<ProyectoUpdateInput, ProyectoUncheckedUpdateInput>
    /**
     * Choose, which Proyecto to update.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto updateMany
   */
  export type ProyectoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proyectos.
     */
    data: XOR<ProyectoUpdateManyMutationInput, ProyectoUncheckedUpdateManyInput>
    /**
     * Filter which Proyectos to update
     */
    where?: ProyectoWhereInput
    /**
     * Limit how many Proyectos to update.
     */
    limit?: number
  }

  /**
   * Proyecto updateManyAndReturn
   */
  export type ProyectoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * The data used to update Proyectos.
     */
    data: XOR<ProyectoUpdateManyMutationInput, ProyectoUncheckedUpdateManyInput>
    /**
     * Filter which Proyectos to update
     */
    where?: ProyectoWhereInput
    /**
     * Limit how many Proyectos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proyecto upsert
   */
  export type ProyectoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * The filter to search for the Proyecto to update in case it exists.
     */
    where: ProyectoWhereUniqueInput
    /**
     * In case the Proyecto found by the `where` argument doesn't exist, create a new Proyecto with this data.
     */
    create: XOR<ProyectoCreateInput, ProyectoUncheckedCreateInput>
    /**
     * In case the Proyecto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProyectoUpdateInput, ProyectoUncheckedUpdateInput>
  }

  /**
   * Proyecto delete
   */
  export type ProyectoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
    /**
     * Filter which Proyecto to delete.
     */
    where: ProyectoWhereUniqueInput
  }

  /**
   * Proyecto deleteMany
   */
  export type ProyectoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proyectos to delete
     */
    where?: ProyectoWhereInput
    /**
     * Limit how many Proyectos to delete.
     */
    limit?: number
  }

  /**
   * Proyecto without action
   */
  export type ProyectoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proyecto
     */
    select?: ProyectoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Proyecto
     */
    omit?: ProyectoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProyectoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    contraseña: 'contraseña',
    mail: 'mail',
    rolPostulante: 'rolPostulante'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const FormularioScalarFieldEnum: {
    postuladoId: 'postuladoId',
    ofertaId: 'ofertaId',
    nombre: 'nombre',
    apellido: 'apellido',
    localidad: 'localidad',
    pais: 'pais',
    genero: 'genero',
    descripcion: 'descripcion',
    curriculum: 'curriculum'
  };

  export type FormularioScalarFieldEnum = (typeof FormularioScalarFieldEnum)[keyof typeof FormularioScalarFieldEnum]


  export const OfertaScalarFieldEnum: {
    id: 'id',
    categoria: 'categoria',
    ubicacion: 'ubicacion',
    sueldo: 'sueldo',
    modalidad: 'modalidad',
    horario: 'horario',
    creadorId: 'creadorId'
  };

  export type OfertaScalarFieldEnum = (typeof OfertaScalarFieldEnum)[keyof typeof OfertaScalarFieldEnum]


  export const ProyectoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    tecnologiasUsadas: 'tecnologiasUsadas',
    createdAt: 'createdAt',
    creadorId: 'creadorId'
  };

  export type ProyectoScalarFieldEnum = (typeof ProyectoScalarFieldEnum)[keyof typeof ProyectoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    id?: IntFilter<"Usuario"> | number
    nombre?: StringFilter<"Usuario"> | string
    contraseña?: StringFilter<"Usuario"> | string
    mail?: StringFilter<"Usuario"> | string
    rolPostulante?: BoolFilter<"Usuario"> | boolean
    formulario?: FormularioListRelationFilter
    ofertasCreadas?: OfertaListRelationFilter
    proyectosCreados?: ProyectoListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    contraseña?: SortOrder
    mail?: SortOrder
    rolPostulante?: SortOrder
    formulario?: FormularioOrderByRelationAggregateInput
    ofertasCreadas?: OfertaOrderByRelationAggregateInput
    proyectosCreados?: ProyectoOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    mail?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    nombre?: StringFilter<"Usuario"> | string
    contraseña?: StringFilter<"Usuario"> | string
    rolPostulante?: BoolFilter<"Usuario"> | boolean
    formulario?: FormularioListRelationFilter
    ofertasCreadas?: OfertaListRelationFilter
    proyectosCreados?: ProyectoListRelationFilter
  }, "id" | "mail">

  export type UsuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    contraseña?: SortOrder
    mail?: SortOrder
    rolPostulante?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Usuario"> | number
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    contraseña?: StringWithAggregatesFilter<"Usuario"> | string
    mail?: StringWithAggregatesFilter<"Usuario"> | string
    rolPostulante?: BoolWithAggregatesFilter<"Usuario"> | boolean
  }

  export type FormularioWhereInput = {
    AND?: FormularioWhereInput | FormularioWhereInput[]
    OR?: FormularioWhereInput[]
    NOT?: FormularioWhereInput | FormularioWhereInput[]
    postuladoId?: IntFilter<"Formulario"> | number
    ofertaId?: IntFilter<"Formulario"> | number
    nombre?: StringFilter<"Formulario"> | string
    apellido?: StringFilter<"Formulario"> | string
    localidad?: StringFilter<"Formulario"> | string
    pais?: StringFilter<"Formulario"> | string
    genero?: StringFilter<"Formulario"> | string
    descripcion?: StringFilter<"Formulario"> | string
    curriculum?: StringFilter<"Formulario"> | string
    oferta?: XOR<OfertaScalarRelationFilter, OfertaWhereInput>
    postulado?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type FormularioOrderByWithRelationInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    localidad?: SortOrder
    pais?: SortOrder
    genero?: SortOrder
    descripcion?: SortOrder
    curriculum?: SortOrder
    oferta?: OfertaOrderByWithRelationInput
    postulado?: UsuarioOrderByWithRelationInput
  }

  export type FormularioWhereUniqueInput = Prisma.AtLeast<{
    postuladoId_ofertaId?: FormularioPostuladoIdOfertaIdCompoundUniqueInput
    AND?: FormularioWhereInput | FormularioWhereInput[]
    OR?: FormularioWhereInput[]
    NOT?: FormularioWhereInput | FormularioWhereInput[]
    postuladoId?: IntFilter<"Formulario"> | number
    ofertaId?: IntFilter<"Formulario"> | number
    nombre?: StringFilter<"Formulario"> | string
    apellido?: StringFilter<"Formulario"> | string
    localidad?: StringFilter<"Formulario"> | string
    pais?: StringFilter<"Formulario"> | string
    genero?: StringFilter<"Formulario"> | string
    descripcion?: StringFilter<"Formulario"> | string
    curriculum?: StringFilter<"Formulario"> | string
    oferta?: XOR<OfertaScalarRelationFilter, OfertaWhereInput>
    postulado?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "postuladoId_ofertaId">

  export type FormularioOrderByWithAggregationInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    localidad?: SortOrder
    pais?: SortOrder
    genero?: SortOrder
    descripcion?: SortOrder
    curriculum?: SortOrder
    _count?: FormularioCountOrderByAggregateInput
    _avg?: FormularioAvgOrderByAggregateInput
    _max?: FormularioMaxOrderByAggregateInput
    _min?: FormularioMinOrderByAggregateInput
    _sum?: FormularioSumOrderByAggregateInput
  }

  export type FormularioScalarWhereWithAggregatesInput = {
    AND?: FormularioScalarWhereWithAggregatesInput | FormularioScalarWhereWithAggregatesInput[]
    OR?: FormularioScalarWhereWithAggregatesInput[]
    NOT?: FormularioScalarWhereWithAggregatesInput | FormularioScalarWhereWithAggregatesInput[]
    postuladoId?: IntWithAggregatesFilter<"Formulario"> | number
    ofertaId?: IntWithAggregatesFilter<"Formulario"> | number
    nombre?: StringWithAggregatesFilter<"Formulario"> | string
    apellido?: StringWithAggregatesFilter<"Formulario"> | string
    localidad?: StringWithAggregatesFilter<"Formulario"> | string
    pais?: StringWithAggregatesFilter<"Formulario"> | string
    genero?: StringWithAggregatesFilter<"Formulario"> | string
    descripcion?: StringWithAggregatesFilter<"Formulario"> | string
    curriculum?: StringWithAggregatesFilter<"Formulario"> | string
  }

  export type OfertaWhereInput = {
    AND?: OfertaWhereInput | OfertaWhereInput[]
    OR?: OfertaWhereInput[]
    NOT?: OfertaWhereInput | OfertaWhereInput[]
    id?: IntFilter<"Oferta"> | number
    categoria?: StringFilter<"Oferta"> | string
    ubicacion?: StringFilter<"Oferta"> | string
    sueldo?: IntNullableFilter<"Oferta"> | number | null
    modalidad?: StringFilter<"Oferta"> | string
    horario?: DateTimeNullableListFilter<"Oferta">
    creadorId?: IntFilter<"Oferta"> | number
    formulario?: FormularioListRelationFilter
    creador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type OfertaOrderByWithRelationInput = {
    id?: SortOrder
    categoria?: SortOrder
    ubicacion?: SortOrder
    sueldo?: SortOrderInput | SortOrder
    modalidad?: SortOrder
    horario?: SortOrder
    creadorId?: SortOrder
    formulario?: FormularioOrderByRelationAggregateInput
    creador?: UsuarioOrderByWithRelationInput
  }

  export type OfertaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OfertaWhereInput | OfertaWhereInput[]
    OR?: OfertaWhereInput[]
    NOT?: OfertaWhereInput | OfertaWhereInput[]
    categoria?: StringFilter<"Oferta"> | string
    ubicacion?: StringFilter<"Oferta"> | string
    sueldo?: IntNullableFilter<"Oferta"> | number | null
    modalidad?: StringFilter<"Oferta"> | string
    horario?: DateTimeNullableListFilter<"Oferta">
    creadorId?: IntFilter<"Oferta"> | number
    formulario?: FormularioListRelationFilter
    creador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type OfertaOrderByWithAggregationInput = {
    id?: SortOrder
    categoria?: SortOrder
    ubicacion?: SortOrder
    sueldo?: SortOrderInput | SortOrder
    modalidad?: SortOrder
    horario?: SortOrder
    creadorId?: SortOrder
    _count?: OfertaCountOrderByAggregateInput
    _avg?: OfertaAvgOrderByAggregateInput
    _max?: OfertaMaxOrderByAggregateInput
    _min?: OfertaMinOrderByAggregateInput
    _sum?: OfertaSumOrderByAggregateInput
  }

  export type OfertaScalarWhereWithAggregatesInput = {
    AND?: OfertaScalarWhereWithAggregatesInput | OfertaScalarWhereWithAggregatesInput[]
    OR?: OfertaScalarWhereWithAggregatesInput[]
    NOT?: OfertaScalarWhereWithAggregatesInput | OfertaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Oferta"> | number
    categoria?: StringWithAggregatesFilter<"Oferta"> | string
    ubicacion?: StringWithAggregatesFilter<"Oferta"> | string
    sueldo?: IntNullableWithAggregatesFilter<"Oferta"> | number | null
    modalidad?: StringWithAggregatesFilter<"Oferta"> | string
    horario?: DateTimeNullableListFilter<"Oferta">
    creadorId?: IntWithAggregatesFilter<"Oferta"> | number
  }

  export type ProyectoWhereInput = {
    AND?: ProyectoWhereInput | ProyectoWhereInput[]
    OR?: ProyectoWhereInput[]
    NOT?: ProyectoWhereInput | ProyectoWhereInput[]
    id?: IntFilter<"Proyecto"> | number
    nombre?: StringFilter<"Proyecto"> | string
    descripcion?: StringFilter<"Proyecto"> | string
    tecnologiasUsadas?: StringFilter<"Proyecto"> | string
    createdAt?: DateTimeFilter<"Proyecto"> | Date | string
    creadorId?: IntFilter<"Proyecto"> | number
    creador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type ProyectoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    tecnologiasUsadas?: SortOrder
    createdAt?: SortOrder
    creadorId?: SortOrder
    creador?: UsuarioOrderByWithRelationInput
  }

  export type ProyectoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProyectoWhereInput | ProyectoWhereInput[]
    OR?: ProyectoWhereInput[]
    NOT?: ProyectoWhereInput | ProyectoWhereInput[]
    nombre?: StringFilter<"Proyecto"> | string
    descripcion?: StringFilter<"Proyecto"> | string
    tecnologiasUsadas?: StringFilter<"Proyecto"> | string
    createdAt?: DateTimeFilter<"Proyecto"> | Date | string
    creadorId?: IntFilter<"Proyecto"> | number
    creador?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "id">

  export type ProyectoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    tecnologiasUsadas?: SortOrder
    createdAt?: SortOrder
    creadorId?: SortOrder
    _count?: ProyectoCountOrderByAggregateInput
    _avg?: ProyectoAvgOrderByAggregateInput
    _max?: ProyectoMaxOrderByAggregateInput
    _min?: ProyectoMinOrderByAggregateInput
    _sum?: ProyectoSumOrderByAggregateInput
  }

  export type ProyectoScalarWhereWithAggregatesInput = {
    AND?: ProyectoScalarWhereWithAggregatesInput | ProyectoScalarWhereWithAggregatesInput[]
    OR?: ProyectoScalarWhereWithAggregatesInput[]
    NOT?: ProyectoScalarWhereWithAggregatesInput | ProyectoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Proyecto"> | number
    nombre?: StringWithAggregatesFilter<"Proyecto"> | string
    descripcion?: StringWithAggregatesFilter<"Proyecto"> | string
    tecnologiasUsadas?: StringWithAggregatesFilter<"Proyecto"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Proyecto"> | Date | string
    creadorId?: IntWithAggregatesFilter<"Proyecto"> | number
  }

  export type UsuarioCreateInput = {
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioCreateNestedManyWithoutPostuladoInput
    ofertasCreadas?: OfertaCreateNestedManyWithoutCreadorInput
    proyectosCreados?: ProyectoCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioUncheckedCreateInput = {
    id?: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioUncheckedCreateNestedManyWithoutPostuladoInput
    ofertasCreadas?: OfertaUncheckedCreateNestedManyWithoutCreadorInput
    proyectosCreados?: ProyectoUncheckedCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUpdateManyWithoutPostuladoNestedInput
    ofertasCreadas?: OfertaUpdateManyWithoutCreadorNestedInput
    proyectosCreados?: ProyectoUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUncheckedUpdateManyWithoutPostuladoNestedInput
    ofertasCreadas?: OfertaUncheckedUpdateManyWithoutCreadorNestedInput
    proyectosCreados?: ProyectoUncheckedUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioCreateManyInput = {
    id?: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
  }

  export type UsuarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UsuarioUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FormularioCreateInput = {
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
    oferta: OfertaCreateNestedOneWithoutFormularioInput
    postulado: UsuarioCreateNestedOneWithoutFormularioInput
  }

  export type FormularioUncheckedCreateInput = {
    postuladoId: number
    ofertaId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type FormularioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
    oferta?: OfertaUpdateOneRequiredWithoutFormularioNestedInput
    postulado?: UsuarioUpdateOneRequiredWithoutFormularioNestedInput
  }

  export type FormularioUncheckedUpdateInput = {
    postuladoId?: IntFieldUpdateOperationsInput | number
    ofertaId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type FormularioCreateManyInput = {
    postuladoId: number
    ofertaId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type FormularioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type FormularioUncheckedUpdateManyInput = {
    postuladoId?: IntFieldUpdateOperationsInput | number
    ofertaId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type OfertaCreateInput = {
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    formulario?: FormularioCreateNestedManyWithoutOfertaInput
    creador: UsuarioCreateNestedOneWithoutOfertasCreadasInput
  }

  export type OfertaUncheckedCreateInput = {
    id?: number
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    creadorId: number
    formulario?: FormularioUncheckedCreateNestedManyWithoutOfertaInput
  }

  export type OfertaUpdateInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    formulario?: FormularioUpdateManyWithoutOfertaNestedInput
    creador?: UsuarioUpdateOneRequiredWithoutOfertasCreadasNestedInput
  }

  export type OfertaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    creadorId?: IntFieldUpdateOperationsInput | number
    formulario?: FormularioUncheckedUpdateManyWithoutOfertaNestedInput
  }

  export type OfertaCreateManyInput = {
    id?: number
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    creadorId: number
  }

  export type OfertaUpdateManyMutationInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
  }

  export type OfertaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    creadorId?: IntFieldUpdateOperationsInput | number
  }

  export type ProyectoCreateInput = {
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
    creador: UsuarioCreateNestedOneWithoutProyectosCreadosInput
  }

  export type ProyectoUncheckedCreateInput = {
    id?: number
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
    creadorId: number
  }

  export type ProyectoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creador?: UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput
  }

  export type ProyectoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadorId?: IntFieldUpdateOperationsInput | number
  }

  export type ProyectoCreateManyInput = {
    id?: number
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
    creadorId: number
  }

  export type ProyectoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creadorId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FormularioListRelationFilter = {
    every?: FormularioWhereInput
    some?: FormularioWhereInput
    none?: FormularioWhereInput
  }

  export type OfertaListRelationFilter = {
    every?: OfertaWhereInput
    some?: OfertaWhereInput
    none?: OfertaWhereInput
  }

  export type ProyectoListRelationFilter = {
    every?: ProyectoWhereInput
    some?: ProyectoWhereInput
    none?: ProyectoWhereInput
  }

  export type FormularioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfertaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProyectoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    contraseña?: SortOrder
    mail?: SortOrder
    rolPostulante?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    contraseña?: SortOrder
    mail?: SortOrder
    rolPostulante?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    contraseña?: SortOrder
    mail?: SortOrder
    rolPostulante?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OfertaScalarRelationFilter = {
    is?: OfertaWhereInput
    isNot?: OfertaWhereInput
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type FormularioPostuladoIdOfertaIdCompoundUniqueInput = {
    postuladoId: number
    ofertaId: number
  }

  export type FormularioCountOrderByAggregateInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    localidad?: SortOrder
    pais?: SortOrder
    genero?: SortOrder
    descripcion?: SortOrder
    curriculum?: SortOrder
  }

  export type FormularioAvgOrderByAggregateInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
  }

  export type FormularioMaxOrderByAggregateInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    localidad?: SortOrder
    pais?: SortOrder
    genero?: SortOrder
    descripcion?: SortOrder
    curriculum?: SortOrder
  }

  export type FormularioMinOrderByAggregateInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    localidad?: SortOrder
    pais?: SortOrder
    genero?: SortOrder
    descripcion?: SortOrder
    curriculum?: SortOrder
  }

  export type FormularioSumOrderByAggregateInput = {
    postuladoId?: SortOrder
    ofertaId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableListFilter<$PrismaModel = never> = {
    equals?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    has?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    hasEvery?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    hasSome?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OfertaCountOrderByAggregateInput = {
    id?: SortOrder
    categoria?: SortOrder
    ubicacion?: SortOrder
    sueldo?: SortOrder
    modalidad?: SortOrder
    horario?: SortOrder
    creadorId?: SortOrder
  }

  export type OfertaAvgOrderByAggregateInput = {
    id?: SortOrder
    sueldo?: SortOrder
    creadorId?: SortOrder
  }

  export type OfertaMaxOrderByAggregateInput = {
    id?: SortOrder
    categoria?: SortOrder
    ubicacion?: SortOrder
    sueldo?: SortOrder
    modalidad?: SortOrder
    creadorId?: SortOrder
  }

  export type OfertaMinOrderByAggregateInput = {
    id?: SortOrder
    categoria?: SortOrder
    ubicacion?: SortOrder
    sueldo?: SortOrder
    modalidad?: SortOrder
    creadorId?: SortOrder
  }

  export type OfertaSumOrderByAggregateInput = {
    id?: SortOrder
    sueldo?: SortOrder
    creadorId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProyectoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    tecnologiasUsadas?: SortOrder
    createdAt?: SortOrder
    creadorId?: SortOrder
  }

  export type ProyectoAvgOrderByAggregateInput = {
    id?: SortOrder
    creadorId?: SortOrder
  }

  export type ProyectoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    tecnologiasUsadas?: SortOrder
    createdAt?: SortOrder
    creadorId?: SortOrder
  }

  export type ProyectoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    tecnologiasUsadas?: SortOrder
    createdAt?: SortOrder
    creadorId?: SortOrder
  }

  export type ProyectoSumOrderByAggregateInput = {
    id?: SortOrder
    creadorId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FormularioCreateNestedManyWithoutPostuladoInput = {
    create?: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput> | FormularioCreateWithoutPostuladoInput[] | FormularioUncheckedCreateWithoutPostuladoInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutPostuladoInput | FormularioCreateOrConnectWithoutPostuladoInput[]
    createMany?: FormularioCreateManyPostuladoInputEnvelope
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
  }

  export type OfertaCreateNestedManyWithoutCreadorInput = {
    create?: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput> | OfertaCreateWithoutCreadorInput[] | OfertaUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: OfertaCreateOrConnectWithoutCreadorInput | OfertaCreateOrConnectWithoutCreadorInput[]
    createMany?: OfertaCreateManyCreadorInputEnvelope
    connect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
  }

  export type ProyectoCreateNestedManyWithoutCreadorInput = {
    create?: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput> | ProyectoCreateWithoutCreadorInput[] | ProyectoUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: ProyectoCreateOrConnectWithoutCreadorInput | ProyectoCreateOrConnectWithoutCreadorInput[]
    createMany?: ProyectoCreateManyCreadorInputEnvelope
    connect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
  }

  export type FormularioUncheckedCreateNestedManyWithoutPostuladoInput = {
    create?: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput> | FormularioCreateWithoutPostuladoInput[] | FormularioUncheckedCreateWithoutPostuladoInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutPostuladoInput | FormularioCreateOrConnectWithoutPostuladoInput[]
    createMany?: FormularioCreateManyPostuladoInputEnvelope
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
  }

  export type OfertaUncheckedCreateNestedManyWithoutCreadorInput = {
    create?: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput> | OfertaCreateWithoutCreadorInput[] | OfertaUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: OfertaCreateOrConnectWithoutCreadorInput | OfertaCreateOrConnectWithoutCreadorInput[]
    createMany?: OfertaCreateManyCreadorInputEnvelope
    connect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
  }

  export type ProyectoUncheckedCreateNestedManyWithoutCreadorInput = {
    create?: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput> | ProyectoCreateWithoutCreadorInput[] | ProyectoUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: ProyectoCreateOrConnectWithoutCreadorInput | ProyectoCreateOrConnectWithoutCreadorInput[]
    createMany?: ProyectoCreateManyCreadorInputEnvelope
    connect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FormularioUpdateManyWithoutPostuladoNestedInput = {
    create?: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput> | FormularioCreateWithoutPostuladoInput[] | FormularioUncheckedCreateWithoutPostuladoInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutPostuladoInput | FormularioCreateOrConnectWithoutPostuladoInput[]
    upsert?: FormularioUpsertWithWhereUniqueWithoutPostuladoInput | FormularioUpsertWithWhereUniqueWithoutPostuladoInput[]
    createMany?: FormularioCreateManyPostuladoInputEnvelope
    set?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    disconnect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    delete?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    update?: FormularioUpdateWithWhereUniqueWithoutPostuladoInput | FormularioUpdateWithWhereUniqueWithoutPostuladoInput[]
    updateMany?: FormularioUpdateManyWithWhereWithoutPostuladoInput | FormularioUpdateManyWithWhereWithoutPostuladoInput[]
    deleteMany?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
  }

  export type OfertaUpdateManyWithoutCreadorNestedInput = {
    create?: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput> | OfertaCreateWithoutCreadorInput[] | OfertaUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: OfertaCreateOrConnectWithoutCreadorInput | OfertaCreateOrConnectWithoutCreadorInput[]
    upsert?: OfertaUpsertWithWhereUniqueWithoutCreadorInput | OfertaUpsertWithWhereUniqueWithoutCreadorInput[]
    createMany?: OfertaCreateManyCreadorInputEnvelope
    set?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    disconnect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    delete?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    connect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    update?: OfertaUpdateWithWhereUniqueWithoutCreadorInput | OfertaUpdateWithWhereUniqueWithoutCreadorInput[]
    updateMany?: OfertaUpdateManyWithWhereWithoutCreadorInput | OfertaUpdateManyWithWhereWithoutCreadorInput[]
    deleteMany?: OfertaScalarWhereInput | OfertaScalarWhereInput[]
  }

  export type ProyectoUpdateManyWithoutCreadorNestedInput = {
    create?: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput> | ProyectoCreateWithoutCreadorInput[] | ProyectoUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: ProyectoCreateOrConnectWithoutCreadorInput | ProyectoCreateOrConnectWithoutCreadorInput[]
    upsert?: ProyectoUpsertWithWhereUniqueWithoutCreadorInput | ProyectoUpsertWithWhereUniqueWithoutCreadorInput[]
    createMany?: ProyectoCreateManyCreadorInputEnvelope
    set?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    disconnect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    delete?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    connect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    update?: ProyectoUpdateWithWhereUniqueWithoutCreadorInput | ProyectoUpdateWithWhereUniqueWithoutCreadorInput[]
    updateMany?: ProyectoUpdateManyWithWhereWithoutCreadorInput | ProyectoUpdateManyWithWhereWithoutCreadorInput[]
    deleteMany?: ProyectoScalarWhereInput | ProyectoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FormularioUncheckedUpdateManyWithoutPostuladoNestedInput = {
    create?: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput> | FormularioCreateWithoutPostuladoInput[] | FormularioUncheckedCreateWithoutPostuladoInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutPostuladoInput | FormularioCreateOrConnectWithoutPostuladoInput[]
    upsert?: FormularioUpsertWithWhereUniqueWithoutPostuladoInput | FormularioUpsertWithWhereUniqueWithoutPostuladoInput[]
    createMany?: FormularioCreateManyPostuladoInputEnvelope
    set?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    disconnect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    delete?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    update?: FormularioUpdateWithWhereUniqueWithoutPostuladoInput | FormularioUpdateWithWhereUniqueWithoutPostuladoInput[]
    updateMany?: FormularioUpdateManyWithWhereWithoutPostuladoInput | FormularioUpdateManyWithWhereWithoutPostuladoInput[]
    deleteMany?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
  }

  export type OfertaUncheckedUpdateManyWithoutCreadorNestedInput = {
    create?: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput> | OfertaCreateWithoutCreadorInput[] | OfertaUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: OfertaCreateOrConnectWithoutCreadorInput | OfertaCreateOrConnectWithoutCreadorInput[]
    upsert?: OfertaUpsertWithWhereUniqueWithoutCreadorInput | OfertaUpsertWithWhereUniqueWithoutCreadorInput[]
    createMany?: OfertaCreateManyCreadorInputEnvelope
    set?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    disconnect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    delete?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    connect?: OfertaWhereUniqueInput | OfertaWhereUniqueInput[]
    update?: OfertaUpdateWithWhereUniqueWithoutCreadorInput | OfertaUpdateWithWhereUniqueWithoutCreadorInput[]
    updateMany?: OfertaUpdateManyWithWhereWithoutCreadorInput | OfertaUpdateManyWithWhereWithoutCreadorInput[]
    deleteMany?: OfertaScalarWhereInput | OfertaScalarWhereInput[]
  }

  export type ProyectoUncheckedUpdateManyWithoutCreadorNestedInput = {
    create?: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput> | ProyectoCreateWithoutCreadorInput[] | ProyectoUncheckedCreateWithoutCreadorInput[]
    connectOrCreate?: ProyectoCreateOrConnectWithoutCreadorInput | ProyectoCreateOrConnectWithoutCreadorInput[]
    upsert?: ProyectoUpsertWithWhereUniqueWithoutCreadorInput | ProyectoUpsertWithWhereUniqueWithoutCreadorInput[]
    createMany?: ProyectoCreateManyCreadorInputEnvelope
    set?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    disconnect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    delete?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    connect?: ProyectoWhereUniqueInput | ProyectoWhereUniqueInput[]
    update?: ProyectoUpdateWithWhereUniqueWithoutCreadorInput | ProyectoUpdateWithWhereUniqueWithoutCreadorInput[]
    updateMany?: ProyectoUpdateManyWithWhereWithoutCreadorInput | ProyectoUpdateManyWithWhereWithoutCreadorInput[]
    deleteMany?: ProyectoScalarWhereInput | ProyectoScalarWhereInput[]
  }

  export type OfertaCreateNestedOneWithoutFormularioInput = {
    create?: XOR<OfertaCreateWithoutFormularioInput, OfertaUncheckedCreateWithoutFormularioInput>
    connectOrCreate?: OfertaCreateOrConnectWithoutFormularioInput
    connect?: OfertaWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutFormularioInput = {
    create?: XOR<UsuarioCreateWithoutFormularioInput, UsuarioUncheckedCreateWithoutFormularioInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFormularioInput
    connect?: UsuarioWhereUniqueInput
  }

  export type OfertaUpdateOneRequiredWithoutFormularioNestedInput = {
    create?: XOR<OfertaCreateWithoutFormularioInput, OfertaUncheckedCreateWithoutFormularioInput>
    connectOrCreate?: OfertaCreateOrConnectWithoutFormularioInput
    upsert?: OfertaUpsertWithoutFormularioInput
    connect?: OfertaWhereUniqueInput
    update?: XOR<XOR<OfertaUpdateToOneWithWhereWithoutFormularioInput, OfertaUpdateWithoutFormularioInput>, OfertaUncheckedUpdateWithoutFormularioInput>
  }

  export type UsuarioUpdateOneRequiredWithoutFormularioNestedInput = {
    create?: XOR<UsuarioCreateWithoutFormularioInput, UsuarioUncheckedCreateWithoutFormularioInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutFormularioInput
    upsert?: UsuarioUpsertWithoutFormularioInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutFormularioInput, UsuarioUpdateWithoutFormularioInput>, UsuarioUncheckedUpdateWithoutFormularioInput>
  }

  export type OfertaCreatehorarioInput = {
    set: Date[] | string[]
  }

  export type FormularioCreateNestedManyWithoutOfertaInput = {
    create?: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput> | FormularioCreateWithoutOfertaInput[] | FormularioUncheckedCreateWithoutOfertaInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutOfertaInput | FormularioCreateOrConnectWithoutOfertaInput[]
    createMany?: FormularioCreateManyOfertaInputEnvelope
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
  }

  export type UsuarioCreateNestedOneWithoutOfertasCreadasInput = {
    create?: XOR<UsuarioCreateWithoutOfertasCreadasInput, UsuarioUncheckedCreateWithoutOfertasCreadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOfertasCreadasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type FormularioUncheckedCreateNestedManyWithoutOfertaInput = {
    create?: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput> | FormularioCreateWithoutOfertaInput[] | FormularioUncheckedCreateWithoutOfertaInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutOfertaInput | FormularioCreateOrConnectWithoutOfertaInput[]
    createMany?: FormularioCreateManyOfertaInputEnvelope
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OfertaUpdatehorarioInput = {
    set?: Date[] | string[]
    push?: Date | string | Date[] | string[]
  }

  export type FormularioUpdateManyWithoutOfertaNestedInput = {
    create?: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput> | FormularioCreateWithoutOfertaInput[] | FormularioUncheckedCreateWithoutOfertaInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutOfertaInput | FormularioCreateOrConnectWithoutOfertaInput[]
    upsert?: FormularioUpsertWithWhereUniqueWithoutOfertaInput | FormularioUpsertWithWhereUniqueWithoutOfertaInput[]
    createMany?: FormularioCreateManyOfertaInputEnvelope
    set?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    disconnect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    delete?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    update?: FormularioUpdateWithWhereUniqueWithoutOfertaInput | FormularioUpdateWithWhereUniqueWithoutOfertaInput[]
    updateMany?: FormularioUpdateManyWithWhereWithoutOfertaInput | FormularioUpdateManyWithWhereWithoutOfertaInput[]
    deleteMany?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
  }

  export type UsuarioUpdateOneRequiredWithoutOfertasCreadasNestedInput = {
    create?: XOR<UsuarioCreateWithoutOfertasCreadasInput, UsuarioUncheckedCreateWithoutOfertasCreadasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutOfertasCreadasInput
    upsert?: UsuarioUpsertWithoutOfertasCreadasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutOfertasCreadasInput, UsuarioUpdateWithoutOfertasCreadasInput>, UsuarioUncheckedUpdateWithoutOfertasCreadasInput>
  }

  export type FormularioUncheckedUpdateManyWithoutOfertaNestedInput = {
    create?: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput> | FormularioCreateWithoutOfertaInput[] | FormularioUncheckedCreateWithoutOfertaInput[]
    connectOrCreate?: FormularioCreateOrConnectWithoutOfertaInput | FormularioCreateOrConnectWithoutOfertaInput[]
    upsert?: FormularioUpsertWithWhereUniqueWithoutOfertaInput | FormularioUpsertWithWhereUniqueWithoutOfertaInput[]
    createMany?: FormularioCreateManyOfertaInputEnvelope
    set?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    disconnect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    delete?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    connect?: FormularioWhereUniqueInput | FormularioWhereUniqueInput[]
    update?: FormularioUpdateWithWhereUniqueWithoutOfertaInput | FormularioUpdateWithWhereUniqueWithoutOfertaInput[]
    updateMany?: FormularioUpdateManyWithWhereWithoutOfertaInput | FormularioUpdateManyWithWhereWithoutOfertaInput[]
    deleteMany?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
  }

  export type UsuarioCreateNestedOneWithoutProyectosCreadosInput = {
    create?: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProyectosCreadosInput
    connect?: UsuarioWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsuarioUpdateOneRequiredWithoutProyectosCreadosNestedInput = {
    create?: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutProyectosCreadosInput
    upsert?: UsuarioUpsertWithoutProyectosCreadosInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutProyectosCreadosInput, UsuarioUpdateWithoutProyectosCreadosInput>, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FormularioCreateWithoutPostuladoInput = {
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
    oferta: OfertaCreateNestedOneWithoutFormularioInput
  }

  export type FormularioUncheckedCreateWithoutPostuladoInput = {
    ofertaId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type FormularioCreateOrConnectWithoutPostuladoInput = {
    where: FormularioWhereUniqueInput
    create: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput>
  }

  export type FormularioCreateManyPostuladoInputEnvelope = {
    data: FormularioCreateManyPostuladoInput | FormularioCreateManyPostuladoInput[]
    skipDuplicates?: boolean
  }

  export type OfertaCreateWithoutCreadorInput = {
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    formulario?: FormularioCreateNestedManyWithoutOfertaInput
  }

  export type OfertaUncheckedCreateWithoutCreadorInput = {
    id?: number
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    formulario?: FormularioUncheckedCreateNestedManyWithoutOfertaInput
  }

  export type OfertaCreateOrConnectWithoutCreadorInput = {
    where: OfertaWhereUniqueInput
    create: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput>
  }

  export type OfertaCreateManyCreadorInputEnvelope = {
    data: OfertaCreateManyCreadorInput | OfertaCreateManyCreadorInput[]
    skipDuplicates?: boolean
  }

  export type ProyectoCreateWithoutCreadorInput = {
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
  }

  export type ProyectoUncheckedCreateWithoutCreadorInput = {
    id?: number
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
  }

  export type ProyectoCreateOrConnectWithoutCreadorInput = {
    where: ProyectoWhereUniqueInput
    create: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput>
  }

  export type ProyectoCreateManyCreadorInputEnvelope = {
    data: ProyectoCreateManyCreadorInput | ProyectoCreateManyCreadorInput[]
    skipDuplicates?: boolean
  }

  export type FormularioUpsertWithWhereUniqueWithoutPostuladoInput = {
    where: FormularioWhereUniqueInput
    update: XOR<FormularioUpdateWithoutPostuladoInput, FormularioUncheckedUpdateWithoutPostuladoInput>
    create: XOR<FormularioCreateWithoutPostuladoInput, FormularioUncheckedCreateWithoutPostuladoInput>
  }

  export type FormularioUpdateWithWhereUniqueWithoutPostuladoInput = {
    where: FormularioWhereUniqueInput
    data: XOR<FormularioUpdateWithoutPostuladoInput, FormularioUncheckedUpdateWithoutPostuladoInput>
  }

  export type FormularioUpdateManyWithWhereWithoutPostuladoInput = {
    where: FormularioScalarWhereInput
    data: XOR<FormularioUpdateManyMutationInput, FormularioUncheckedUpdateManyWithoutPostuladoInput>
  }

  export type FormularioScalarWhereInput = {
    AND?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
    OR?: FormularioScalarWhereInput[]
    NOT?: FormularioScalarWhereInput | FormularioScalarWhereInput[]
    postuladoId?: IntFilter<"Formulario"> | number
    ofertaId?: IntFilter<"Formulario"> | number
    nombre?: StringFilter<"Formulario"> | string
    apellido?: StringFilter<"Formulario"> | string
    localidad?: StringFilter<"Formulario"> | string
    pais?: StringFilter<"Formulario"> | string
    genero?: StringFilter<"Formulario"> | string
    descripcion?: StringFilter<"Formulario"> | string
    curriculum?: StringFilter<"Formulario"> | string
  }

  export type OfertaUpsertWithWhereUniqueWithoutCreadorInput = {
    where: OfertaWhereUniqueInput
    update: XOR<OfertaUpdateWithoutCreadorInput, OfertaUncheckedUpdateWithoutCreadorInput>
    create: XOR<OfertaCreateWithoutCreadorInput, OfertaUncheckedCreateWithoutCreadorInput>
  }

  export type OfertaUpdateWithWhereUniqueWithoutCreadorInput = {
    where: OfertaWhereUniqueInput
    data: XOR<OfertaUpdateWithoutCreadorInput, OfertaUncheckedUpdateWithoutCreadorInput>
  }

  export type OfertaUpdateManyWithWhereWithoutCreadorInput = {
    where: OfertaScalarWhereInput
    data: XOR<OfertaUpdateManyMutationInput, OfertaUncheckedUpdateManyWithoutCreadorInput>
  }

  export type OfertaScalarWhereInput = {
    AND?: OfertaScalarWhereInput | OfertaScalarWhereInput[]
    OR?: OfertaScalarWhereInput[]
    NOT?: OfertaScalarWhereInput | OfertaScalarWhereInput[]
    id?: IntFilter<"Oferta"> | number
    categoria?: StringFilter<"Oferta"> | string
    ubicacion?: StringFilter<"Oferta"> | string
    sueldo?: IntNullableFilter<"Oferta"> | number | null
    modalidad?: StringFilter<"Oferta"> | string
    horario?: DateTimeNullableListFilter<"Oferta">
    creadorId?: IntFilter<"Oferta"> | number
  }

  export type ProyectoUpsertWithWhereUniqueWithoutCreadorInput = {
    where: ProyectoWhereUniqueInput
    update: XOR<ProyectoUpdateWithoutCreadorInput, ProyectoUncheckedUpdateWithoutCreadorInput>
    create: XOR<ProyectoCreateWithoutCreadorInput, ProyectoUncheckedCreateWithoutCreadorInput>
  }

  export type ProyectoUpdateWithWhereUniqueWithoutCreadorInput = {
    where: ProyectoWhereUniqueInput
    data: XOR<ProyectoUpdateWithoutCreadorInput, ProyectoUncheckedUpdateWithoutCreadorInput>
  }

  export type ProyectoUpdateManyWithWhereWithoutCreadorInput = {
    where: ProyectoScalarWhereInput
    data: XOR<ProyectoUpdateManyMutationInput, ProyectoUncheckedUpdateManyWithoutCreadorInput>
  }

  export type ProyectoScalarWhereInput = {
    AND?: ProyectoScalarWhereInput | ProyectoScalarWhereInput[]
    OR?: ProyectoScalarWhereInput[]
    NOT?: ProyectoScalarWhereInput | ProyectoScalarWhereInput[]
    id?: IntFilter<"Proyecto"> | number
    nombre?: StringFilter<"Proyecto"> | string
    descripcion?: StringFilter<"Proyecto"> | string
    tecnologiasUsadas?: StringFilter<"Proyecto"> | string
    createdAt?: DateTimeFilter<"Proyecto"> | Date | string
    creadorId?: IntFilter<"Proyecto"> | number
  }

  export type OfertaCreateWithoutFormularioInput = {
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    creador: UsuarioCreateNestedOneWithoutOfertasCreadasInput
  }

  export type OfertaUncheckedCreateWithoutFormularioInput = {
    id?: number
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
    creadorId: number
  }

  export type OfertaCreateOrConnectWithoutFormularioInput = {
    where: OfertaWhereUniqueInput
    create: XOR<OfertaCreateWithoutFormularioInput, OfertaUncheckedCreateWithoutFormularioInput>
  }

  export type UsuarioCreateWithoutFormularioInput = {
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    ofertasCreadas?: OfertaCreateNestedManyWithoutCreadorInput
    proyectosCreados?: ProyectoCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioUncheckedCreateWithoutFormularioInput = {
    id?: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    ofertasCreadas?: OfertaUncheckedCreateNestedManyWithoutCreadorInput
    proyectosCreados?: ProyectoUncheckedCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioCreateOrConnectWithoutFormularioInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutFormularioInput, UsuarioUncheckedCreateWithoutFormularioInput>
  }

  export type OfertaUpsertWithoutFormularioInput = {
    update: XOR<OfertaUpdateWithoutFormularioInput, OfertaUncheckedUpdateWithoutFormularioInput>
    create: XOR<OfertaCreateWithoutFormularioInput, OfertaUncheckedCreateWithoutFormularioInput>
    where?: OfertaWhereInput
  }

  export type OfertaUpdateToOneWithWhereWithoutFormularioInput = {
    where?: OfertaWhereInput
    data: XOR<OfertaUpdateWithoutFormularioInput, OfertaUncheckedUpdateWithoutFormularioInput>
  }

  export type OfertaUpdateWithoutFormularioInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    creador?: UsuarioUpdateOneRequiredWithoutOfertasCreadasNestedInput
  }

  export type OfertaUncheckedUpdateWithoutFormularioInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    creadorId?: IntFieldUpdateOperationsInput | number
  }

  export type UsuarioUpsertWithoutFormularioInput = {
    update: XOR<UsuarioUpdateWithoutFormularioInput, UsuarioUncheckedUpdateWithoutFormularioInput>
    create: XOR<UsuarioCreateWithoutFormularioInput, UsuarioUncheckedCreateWithoutFormularioInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutFormularioInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutFormularioInput, UsuarioUncheckedUpdateWithoutFormularioInput>
  }

  export type UsuarioUpdateWithoutFormularioInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    ofertasCreadas?: OfertaUpdateManyWithoutCreadorNestedInput
    proyectosCreados?: ProyectoUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutFormularioInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    ofertasCreadas?: OfertaUncheckedUpdateManyWithoutCreadorNestedInput
    proyectosCreados?: ProyectoUncheckedUpdateManyWithoutCreadorNestedInput
  }

  export type FormularioCreateWithoutOfertaInput = {
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
    postulado: UsuarioCreateNestedOneWithoutFormularioInput
  }

  export type FormularioUncheckedCreateWithoutOfertaInput = {
    postuladoId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type FormularioCreateOrConnectWithoutOfertaInput = {
    where: FormularioWhereUniqueInput
    create: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput>
  }

  export type FormularioCreateManyOfertaInputEnvelope = {
    data: FormularioCreateManyOfertaInput | FormularioCreateManyOfertaInput[]
    skipDuplicates?: boolean
  }

  export type UsuarioCreateWithoutOfertasCreadasInput = {
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioCreateNestedManyWithoutPostuladoInput
    proyectosCreados?: ProyectoCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioUncheckedCreateWithoutOfertasCreadasInput = {
    id?: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioUncheckedCreateNestedManyWithoutPostuladoInput
    proyectosCreados?: ProyectoUncheckedCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioCreateOrConnectWithoutOfertasCreadasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutOfertasCreadasInput, UsuarioUncheckedCreateWithoutOfertasCreadasInput>
  }

  export type FormularioUpsertWithWhereUniqueWithoutOfertaInput = {
    where: FormularioWhereUniqueInput
    update: XOR<FormularioUpdateWithoutOfertaInput, FormularioUncheckedUpdateWithoutOfertaInput>
    create: XOR<FormularioCreateWithoutOfertaInput, FormularioUncheckedCreateWithoutOfertaInput>
  }

  export type FormularioUpdateWithWhereUniqueWithoutOfertaInput = {
    where: FormularioWhereUniqueInput
    data: XOR<FormularioUpdateWithoutOfertaInput, FormularioUncheckedUpdateWithoutOfertaInput>
  }

  export type FormularioUpdateManyWithWhereWithoutOfertaInput = {
    where: FormularioScalarWhereInput
    data: XOR<FormularioUpdateManyMutationInput, FormularioUncheckedUpdateManyWithoutOfertaInput>
  }

  export type UsuarioUpsertWithoutOfertasCreadasInput = {
    update: XOR<UsuarioUpdateWithoutOfertasCreadasInput, UsuarioUncheckedUpdateWithoutOfertasCreadasInput>
    create: XOR<UsuarioCreateWithoutOfertasCreadasInput, UsuarioUncheckedCreateWithoutOfertasCreadasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutOfertasCreadasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutOfertasCreadasInput, UsuarioUncheckedUpdateWithoutOfertasCreadasInput>
  }

  export type UsuarioUpdateWithoutOfertasCreadasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUpdateManyWithoutPostuladoNestedInput
    proyectosCreados?: ProyectoUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutOfertasCreadasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUncheckedUpdateManyWithoutPostuladoNestedInput
    proyectosCreados?: ProyectoUncheckedUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioCreateWithoutProyectosCreadosInput = {
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioCreateNestedManyWithoutPostuladoInput
    ofertasCreadas?: OfertaCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioUncheckedCreateWithoutProyectosCreadosInput = {
    id?: number
    nombre: string
    contraseña: string
    mail: string
    rolPostulante: boolean
    formulario?: FormularioUncheckedCreateNestedManyWithoutPostuladoInput
    ofertasCreadas?: OfertaUncheckedCreateNestedManyWithoutCreadorInput
  }

  export type UsuarioCreateOrConnectWithoutProyectosCreadosInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
  }

  export type UsuarioUpsertWithoutProyectosCreadosInput = {
    update: XOR<UsuarioUpdateWithoutProyectosCreadosInput, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
    create: XOR<UsuarioCreateWithoutProyectosCreadosInput, UsuarioUncheckedCreateWithoutProyectosCreadosInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutProyectosCreadosInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutProyectosCreadosInput, UsuarioUncheckedUpdateWithoutProyectosCreadosInput>
  }

  export type UsuarioUpdateWithoutProyectosCreadosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUpdateManyWithoutPostuladoNestedInput
    ofertasCreadas?: OfertaUpdateManyWithoutCreadorNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutProyectosCreadosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    contraseña?: StringFieldUpdateOperationsInput | string
    mail?: StringFieldUpdateOperationsInput | string
    rolPostulante?: BoolFieldUpdateOperationsInput | boolean
    formulario?: FormularioUncheckedUpdateManyWithoutPostuladoNestedInput
    ofertasCreadas?: OfertaUncheckedUpdateManyWithoutCreadorNestedInput
  }

  export type FormularioCreateManyPostuladoInput = {
    ofertaId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type OfertaCreateManyCreadorInput = {
    id?: number
    categoria: string
    ubicacion: string
    sueldo?: number | null
    modalidad: string
    horario?: OfertaCreatehorarioInput | Date[] | string[]
  }

  export type ProyectoCreateManyCreadorInput = {
    id?: number
    nombre: string
    descripcion: string
    tecnologiasUsadas: string
    createdAt?: Date | string
  }

  export type FormularioUpdateWithoutPostuladoInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
    oferta?: OfertaUpdateOneRequiredWithoutFormularioNestedInput
  }

  export type FormularioUncheckedUpdateWithoutPostuladoInput = {
    ofertaId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type FormularioUncheckedUpdateManyWithoutPostuladoInput = {
    ofertaId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type OfertaUpdateWithoutCreadorInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    formulario?: FormularioUpdateManyWithoutOfertaNestedInput
  }

  export type OfertaUncheckedUpdateWithoutCreadorInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
    formulario?: FormularioUncheckedUpdateManyWithoutOfertaNestedInput
  }

  export type OfertaUncheckedUpdateManyWithoutCreadorInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    ubicacion?: StringFieldUpdateOperationsInput | string
    sueldo?: NullableIntFieldUpdateOperationsInput | number | null
    modalidad?: StringFieldUpdateOperationsInput | string
    horario?: OfertaUpdatehorarioInput | Date[] | string[]
  }

  export type ProyectoUpdateWithoutCreadorInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectoUncheckedUpdateWithoutCreadorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProyectoUncheckedUpdateManyWithoutCreadorInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    tecnologiasUsadas?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormularioCreateManyOfertaInput = {
    postuladoId: number
    nombre: string
    apellido: string
    localidad: string
    pais: string
    genero: string
    descripcion: string
    curriculum: string
  }

  export type FormularioUpdateWithoutOfertaInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
    postulado?: UsuarioUpdateOneRequiredWithoutFormularioNestedInput
  }

  export type FormularioUncheckedUpdateWithoutOfertaInput = {
    postuladoId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }

  export type FormularioUncheckedUpdateManyWithoutOfertaInput = {
    postuladoId?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    localidad?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    genero?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    curriculum?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}