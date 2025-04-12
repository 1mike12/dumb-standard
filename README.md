# Knex-Native-Enums

This package included helper functions for the [Knex.js](http://knexjs.org/) SQL query builder that adds support for native PostgreSQL enums.

## Installation

```bash
npm install knex-native-enums
```
We currently support postgres and mysql since they offer support for native enums. Make sure you have either `pg` or `mysql2` installed as well.

## Usage

### Postgres Example

Call `addOrUpdateEnum` in a migration file the first time you want to add a enum. Then use the specific type call to assign that enum to a column. 

```ts
import {Knex} from "knex"
import {addOrUpdateEnum, dropEnumIfExists} from "knex-native-enums";

const TABLE_NAME = "users"
const ENUM_NAME = "role_type"

enum Role {
   ADMIN,
   USER,
}

export async function up(knex: Knex) {
   await addOrUpdateEnum(knex, ENUM_NAME, Role)
   await knex.schema.createTable(TABLE_NAME, (table) => {
      table.increments('id').primary().index()
      table.specificType("role", ENUM_NAME).index()
   })
}

export async function down(knex: Knex) {
   await knex.schema.dropTableIfExists(TABLE_NAME)
   await dropEnumIfExists(knex, ENUM_NAME)
}
```

At a later point, when you've add more values to the enum, you can call `addOrUpdateEnum` again to keep the database enum in sync

```ts
import {Knex} from "knex"
import {addOrUpdateEnum} from "../src";

const ENUM_NAME = "role_type"

enum Role {
   ADMIN,
   USER,
   PREMIUM, //<-- New value
}

export async function up(knex: Knex) {
   await addOrUpdateEnum(knex, ENUM_NAME, Role)
}

export async function down(knex: Knex) {
}

```
<div style="border: 1px solid #f5c6cb; background-color: #f8d7da; padding: 10px; border-radius: 5px; color: #721c24;">
  <strong>Warning:</strong> You cannot remove values from an existing enum in postgres. Therefore if a call is made to `addOrUpdateEnum` with an enum with missing values, the function will throw an error.
</div>

### MySQL Example
```ts

```


# Testing

To run the mocha tests, start the docker-compose container with `docker-compose up -d` and then run `npm run test`.
