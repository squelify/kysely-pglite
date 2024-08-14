import {
  CompiledQuery,
  DatabaseConnection,
  DatabaseIntrospector,
  Dialect,
  Driver,
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  QueryCompiler,
  TransactionSettings,
} from "kysely"
import { PGlite } from "@electric-sql/pglite"
import { PGliteConnection } from "connection"

export class PGliteDialect implements Dialect {
  constructor(private readonly pgLite: PGlite) {}

  createAdapter() {
    return new PostgresAdapter()
  }

  createDriver(): Driver {
    return new PGliteDriver(this.pgLite)
  }

  createQueryCompiler(): QueryCompiler {
    return new PostgresQueryCompiler()
  }

  createIntrospector(db: Kysely<any>): DatabaseIntrospector {
    return new PostgresIntrospector(db)
  }
}

class PGliteDriver implements Driver {
  private client: PGlite | undefined

  constructor(pgLite: PGlite) {
    this.client = pgLite
  }

  async init(): Promise<void> {}

  async acquireConnection(): Promise<DatabaseConnection> {
    if (this.client === undefined) {
      throw new Error("PGLite not initialized")
    }
    return new PGliteConnection(this.client)
  }

  async beginTransaction(
    conn: PGliteConnection,
    settings: TransactionSettings
  ): Promise<void> {
    if (settings.isolationLevel) {
      await conn.executeQuery(
        CompiledQuery.raw(
          `start transaction isolation level ${settings.isolationLevel}`
        )
      )
    } else {
      await conn.executeQuery(CompiledQuery.raw("begin"))
    }
  }

  async commitTransaction(conn: PGliteConnection): Promise<void> {
    await conn.executeQuery(CompiledQuery.raw("commit"))
  }

  async rollbackTransaction(conn: PGliteConnection): Promise<void> {
    await conn.executeQuery(CompiledQuery.raw("rollback"))
  }

  async releaseConnection(_connection: PGliteConnection): Promise<void> {}

  async destroy(): Promise<void> {
    this.client = undefined
  }
}
