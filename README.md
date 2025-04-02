# kysely-pglite-dialect

[![NPM Version](https://img.shields.io/npm/v/kysely-pglite-dialect)](https://www.npmjs.com/package/kysely-pglite-dialect)
[![CI](https://github.com/czeidler/kysely-pglite-dialect/actions/workflows/ci.yml/badge.svg)](https://github.com/czeidler/kysely-pglite-dialect/actions/workflows/ci.yml)

[Kysely](https://github.com/koskimas/kysely) dialect for [PGlite](https://pglite.dev/).

## Setup

```bash
npm i kysely-pglite-dialect kysely @electric-sql/pglite
```

## Usage

Init Kysely like:

```typescript
import { Kysely } from "kysely"
import { PGlite } from "@electric-sql/pglite"
import { PGliteDialect } from "kysely-pglite-dialect"

const db = new Kysely<{
  pglite_test_table: { id: Generated<number>; data: string }
}>({
  dialect: new PGliteDialect(new PGlite()),
})
```

# Credits

Thanks to [kysely-neon](https://github.com/seveibar/kysely-neon) which was used as a template for this repo.
