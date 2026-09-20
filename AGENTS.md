# AGENTS.md

## Project Architecture

This project uses a **Feature-Based Architecture**.

Each feature must be isolated and own its related:

- Components
- Hooks
- Types
- Schemas
- Repository
- Business logic
- Tests
- Feature-specific utilities

Example:

```text
src/
├── features/
│   ├── image-converter/
│   ├── json-formatter/
│   └── ...
├── components/
├── hooks/
├── lib/
├── utils/
└── types/
```

Features must not depend on another feature's internal implementation.

Prefer:

```ts
import { something } from "@/features/foo"
```

instead of:

```ts
import { something } from "@/features/foo/utils/internal-helper"
```

Each feature should expose its public API through `index.ts`.

---

## Repository Layer

External data access must be isolated behind a **Repository Layer**.

Repositories are responsible for:

- API requests
- External services
- Storage
- File system access
- Data fetching/persistence

UI components and business logic should not directly communicate with external services when a repository is appropriate.

Preferred flow:

```text
Component
   ↓
Hook
   ↓
Business Logic
   ↓
Repository
   ↓
External Service
```

---

## Code Quality Principles

All code should prioritize:

- **Maintainability**
- **Reusability**
- **Type Safety**
- **Separation of Concerns**
- **Testability**
- **Clean Structure**
- **Low Coupling**

Avoid unnecessary abstractions and over-engineering.

Prefer simple, explicit solutions over complex patterns.

---

## TypeScript

Use strict typing.

- Avoid `any`.
- Prefer `unknown` when a value is genuinely unknown.
- Avoid unnecessary type assertions.
- Define meaningful domain types.
- Keep types close to the feature that owns them.

---

## Reusability

Before creating new code, check whether existing functionality can be reused.

Do not duplicate logic.

However, do not move feature-specific code into shared utilities prematurely.

> Share code when it is genuinely shared, not because it might be reusable someday.

---

## Components & Hooks

Components should focus primarily on presentation and user interaction.

Avoid putting:

- API calls
- Complex business logic
- Data transformation
- Validation rules

directly inside components.

Hooks should coordinate UI state and application logic without becoming large "god hooks".

---

## Changes

Before modifying code:

1. Understand the existing structure.
2. Identify the owning feature.
3. Reuse existing utilities and abstractions.
4. Keep the change focused.
5. Avoid unrelated refactoring.

Do not introduce a new library when the existing stack already solves the problem.

---

## Definition of Done

Every change should:

- Preserve feature boundaries.
- Maintain type safety.
- Avoid unnecessary duplication.
- Keep responsibilities separated.
- Remain testable.
- Follow existing project conventions.
- Avoid unnecessary complexity.

### Core Principle

> Write code that is easy to understand, easy to test, easy to change, and difficult to misuse.

## Documentation

Detailed project conventions and architectural decisions are documented in:

- `docs/architecture.md`
- `docs/feature-structure.md`
- `docs/repository-pattern.md`
- `docs/coding-standards.md`
- `docs/testing.md`
- `docs/decisions.md`

Read the relevant documentation before making architectural or structural changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
