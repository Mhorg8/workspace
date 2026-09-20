# Repository Pattern

The Repository Layer isolates external data access from the rest of the application.

Repositories may handle:

- HTTP/API requests
- Database access
- Browser storage
- File system operations
- Third-party services

## Responsibility

A repository should focus on **data access**, not UI concerns.

Example:

```ts
export interface ImageRepository {
  convert(file: File): Promise<ConversionResult>
}
```

Implementation details should remain inside the repository.

Consumers should depend on the repository API rather than the underlying HTTP client or external service.

## Rules

- Do not call external APIs directly from components.
- Do not put UI logic inside repositories.
- Do not put presentation concerns inside repositories.
- Keep repository methods predictable and typed.
- Define domain-specific request/response types.
- Handle infrastructure-specific details inside the repository.

Preferred:

```text
Component
    ↓
Hook
    ↓
Repository
    ↓
External API
```

The repository layer should make replacing an external service easier without requiring changes throughout the application.
