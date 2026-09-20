# Architecture

## Overview

The project follows a **Feature-Based Architecture** with clear separation of concerns.

The main architectural goals are:

- Low coupling
- High cohesion
- Maintainability
- Reusability
- Type safety
- Testability

## Dependency Flow

Dependencies should generally flow in this direction:

```text
UI
 ↓
Hooks
 ↓
Business Logic
 ↓
Repository
 ↓
External Services
```

Higher-level code should not depend directly on infrastructure when an abstraction is appropriate.

## Core Rules

- Features should be isolated.
- Business logic should not live inside UI components.
- External communication should be isolated.
- Shared code must be genuinely shared.
- Avoid circular dependencies.
- Avoid unnecessary abstractions.
- Prefer composition over inheritance.

The architecture should remain simple enough that a new developer can understand the project structure quickly.
