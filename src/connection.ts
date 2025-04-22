import { PGlite } from '@electric-sql/pglite'
import type { PGliteWorker } from '@electric-sql/pglite/worker'
import { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely'

export class PGliteConnection implements DatabaseConnection {
  private readonly client: PGlite | PGliteWorker

  constructor(client: PGlite | PGliteWorker) {
    this.client = client
  }

  async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    const result = await this.client.query(compiledQuery.sql, [...compiledQuery.parameters])

    if (result.affectedRows) {
      const numAffectedRows = BigInt(result.affectedRows)
      return {
        numUpdatedOrDeletedRows: numAffectedRows,
        numAffectedRows,
        rows: result.rows as O[],
      }
    }

    return {
      rows: result.rows as O[],
    }
  }

  async *streamQuery<O>(
    _compiledQuery: CompiledQuery,
    _chunkSize: number
  ): AsyncIterableIterator<QueryResult<O>> {
    yield {
      rows: [],
      numAffectedRows: BigInt(0),
      numUpdatedOrDeletedRows: BigInt(0),
    }
    throw new Error('PGlite Driver does not support streaming')
  }
}
