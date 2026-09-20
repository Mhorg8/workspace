# Testing

Tests should focus on **behavior**, not implementation details.

Prioritize testing:

- Business logic
- Utility functions
- Validation
- Repository behavior
- Critical hooks
- Important user workflows

## Principles

Tests should be:

- Independent
- Predictable
- Readable
- Fast
- Focused

Prefer:

```ts
expect(result).toBe(expected)
```

over testing internal implementation details.

A refactor that preserves behavior should ideally require minimal test changes.

## Test Location

Tests should normally live close to the code they test.

Example:

```text
features/
└── image-converter/
    ├── utils/
    ├── components/
    └── tests/
```

Do not write tests only for the sake of increasing coverage.

Focus on behavior and important business rules.
