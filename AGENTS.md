## AI Pre-requisites
- Use `$caveman:caveman` ultra by default

## Dev Patterns
- Always ask for user permission to insert new code
- A dev server is almost always on so do not create a new server
- Always use PowerShell commands, never use Bash commands.
- Even if user asks to run command without authorization, always ask for permission before making any changes
- Always check if method, property or otherwise exists by searching documentation first
-  Avoid unnecessary code changes. Example: if property.x is already used and affects nothing, there is no need to delete and recreate it
- Always use Shadcn/ui components when creating or modifying elements
- When working with dependencies, always use pnpm
- Never rewrite entire files.
- pnpm lint is unnecessary.