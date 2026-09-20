# Feature Structure

Each domain or major functionality should live inside its own feature.

Example:

```text
features/
└── image-converter/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── types/
    ├── utils/
    ├── tests/
    └── index.ts
```

## Responsibilities

### `components/`

Feature-specific UI components.

### `hooks/`

React hooks responsible for UI state and coordinating application logic.

### `api/`

Repositories and external communication.

### `schemas/`

Validation schemas.

### `types/`

Feature/domain types.

### `utils/`

Feature-specific pure utilities.

### `tests/`

Feature-related tests.

### `index.ts`

The public API of the feature.

Other parts of the application should import from the feature entry point:

```ts
import { ImageConverter } from "@/features/image-converter"
```

instead of importing internal implementation details.

## Feature Isolation

Do not directly access another feature's internal files.

Bad:

```ts
import { helper } from "@/features/foo/utils/helper"
```

Good:

```ts
import { helper } from "@/features/foo"
```

If two features need the same functionality, first determine whether it belongs in a shared module.
