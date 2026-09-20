# Coding Standards

## TypeScript

Use strict TypeScript.

- Avoid `any`.
- Prefer `unknown` for unknown values.
- Avoid unnecessary type assertions.
- Use meaningful domain types.
- Type public functions and APIs explicitly.

## Naming

Names should describe intent.

Prefer:

```ts
convertImage()
getUserProfile()
validateFile()
```

Avoid:

```ts
doThing()
processData()
handleStuff()
```

Use consistent file naming:

```text
image-converter.repository.ts
image-converter.schema.ts
image-converter.types.ts
use-image-converter.ts
```

## Functions

Prefer small functions with a single responsibility.

Avoid functions that:

- Fetch data
- Transform data
- Validate data
- Update UI
- Handle side effects

all at once.

## Utilities

Prefer pure utilities.

A utility should not perform hidden side effects unless that behavior is its explicit responsibility.

## Constants

Avoid magic numbers and strings.

Prefer:

```ts
const MAX_FILE_SIZE = 5 * 1024 * 1024
```

over:

```ts
if (file.size > 5242880)
```

## Comments

Comments should explain **why**, not what the code already clearly expresses.

## Reuse

Always check existing utilities, hooks, components, and repositories before creating new ones.

Avoid premature generalization.
