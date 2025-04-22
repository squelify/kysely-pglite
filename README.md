# Kysely PGlite Dialect

[![NPM Version](https://img.shields.io/npm/v/@squelify/kysely-pglite)](https://www.npmjs.com/package/@squelify/kysely-pglite)
[![Test](https://github.com/squelify/kysely-pglite/actions/workflows/test.yml/badge.svg)](https://github.com/squelify/kysely-pglite/actions/workflows/test.yml)
[![Build](https://github.com/squelify/kysely-pglite/actions/workflows/build.yml/badge.svg)](https://github.com/squelify/kysely-pglite/actions/workflows/build.yml)

[Kysely](https://github.com/koskimas/kysely) dialect for [PGlite](https://pglite.dev/).
Forked from [czeidler/kysely-pglite-dialect](https://github.com/czeidler/kysely-pglite-dialect).

## Setup

### Using `pnpm`

```bash
pnpm add @squelify/kysely-pglite @electric-sql/pglite kysely
```

### Using `npm`

```bash
npm i @squelify/kysely-pglite @electric-sql/pglite kysely
```

### Using `yarn`

```bash
yarn add @squelify/kysely-pglite @electric-sql/pglite kysely
```

## Usage

Init Kysely like:

```typescript
import { Kysely } from "kysely"
import { PGlite } from "@electric-sql/pglite"
import { PGliteDialect } from "@squelify/kysely-pglite"

interface Database {
  users: { id: Generated<number>; data: string }
}

const db = new Kysely<Database>({
  dialect: new PGliteDialect(new PGlite()),
})
```

# Credits

Thanks to [czeidler/kysely-pglite-dialect](https://github.com/czeidler/kysely-pglite-dialect) 
for the original PGlite dialect for Kysely.
