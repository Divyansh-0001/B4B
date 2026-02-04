# Shared

This directory contains shared code, types, and schemas used by both frontend and backend.

## Contents

- `types/` - TypeScript type definitions
- `schemas/` - JSON schemas and validation rules
- `constants/` - Shared constants and enums

## Usage

### Frontend

```typescript
import { UserRole } from '@/shared/types/user';
```

### Backend

The Python backend should maintain parity with these TypeScript types using Pydantic models.
