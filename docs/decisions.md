# Architecture Decisions

This document records important architectural decisions.

## ADR Format

When introducing a significant architectural decision, document:

### Context

What problem are we solving?

### Decision

What approach did we choose?

### Reason

Why did we choose it?

### Consequences

What are the benefits, limitations, or trade-offs?

Example:

```md
## Repository Layer

### Context

Features need to communicate with external services.

### Decision

All external data access goes through repositories.

### Reason

This keeps infrastructure isolated and improves testability.

### Consequences

Features have a consistent data-access pattern, but small operations may require an additional abstraction.
```

Only significant architectural decisions belong here.

Do not document every small implementation choice.
