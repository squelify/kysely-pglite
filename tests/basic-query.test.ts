import test from "ava"
import { Generated, Kysely, sql } from "kysely"
import { PGliteDialect } from "../src"
import { PGlite } from "@electric-sql/pglite"

test.serial("should execute basic queries", async (t) => {
  const db = new Kysely<{
    pglite_test_table: { id: Generated<number>; data: string }
  }>({
    dialect: new PGliteDialect(new PGlite()),
  })

  await sql`CREATE TABLE pglite_test_table (
    id SERIAL PRIMARY KEY,
    data VARCHAR
  )`.execute(db)

  await db.insertInto("pglite_test_table").values({ data: "data1" }).execute()

  await db.transaction().execute(async (trx) => {
    await trx
      .insertInto("pglite_test_table")
      .values({ data: "data2" })
      .execute()

    await trx
      .insertInto("pglite_test_table")
      .values({ data: "data3" })
      .execute()
  })

  const result = await db.selectFrom("pglite_test_table").selectAll().execute()

  t.truthy(result)
  t.deepEqual(result[0].data, "data1")
  t.deepEqual(result[1].data, "data2")
  t.deepEqual(result[2].data, "data3")
})
