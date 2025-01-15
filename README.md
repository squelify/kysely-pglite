# kysely-pglite

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
import { PGliteDialect } from "kysely-pglite"

const db = new Kysely<{
  pglite_test_table: { id: Generated<number>; data: string }
}>({
  dialect: new PGliteDialect(new PGlite()),
})
```

# Credits

Thanks to [kysely-neon](https://github.com/seveibar/kysely-neon) which was used as a template for this repo.
