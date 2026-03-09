# Telegram Bot Template

Production-ready TypeScript Telegram bot template using [grammY](https://grammy.dev) framework.

## Features

- 🚀 **TypeScript** with strict mode enabled
- 📦 **grammY** - Modern, fast, and type-safe Telegram Bot API framework
- 🔧 **ESLint + Prettier** - Consistent code style
- ⚡ **Hot reload** - Fast development with tsx
- 🛡️ **PM2 ready** - Production process management
- 📝 **Structured logging** - Configurable log levels

## Project Structure

```
telegram-bot-template/
├── src/
│   ├── commands/           # Command handlers
│   │   ├── index.ts
│   │   ├── start.ts
│   │   └── help.ts
│   ├── middleware/         # Bot middleware
│   │   └── logger.ts
│   ├── config.ts           # Configuration
│   └── index.ts            # Entry point
├── dist/                   # Compiled output
├── .env.example            # Environment template
├── ecosystem.config.js     # PM2 configuration
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── package.json
```

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Telegram Bot Token (get one from [@BotFather](https://t.me/BotFather))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hashdevlol/telegram-bot-template.git
   cd telegram-bot-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your bot token:
   ```
   BOT_TOKEN=your_bot_token_here
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with hot reload (development) |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled bot (production) |
| `npm run lint` | Check code style |
| `npm run lint:fix` | Fix code style issues |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Type check without emitting |

## Production Deployment

### Using PM2

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

3. **Useful PM2 commands**
   ```bash
   pm2 logs telegram-bot     # View logs
   pm2 restart telegram-bot  # Restart bot
   pm2 stop telegram-bot     # Stop bot
   pm2 delete telegram-bot   # Remove from PM2
   ```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BOT_TOKEN` | Yes | Telegram bot token from BotFather |
| `ALLOWED_USERS` | No | Comma-separated user IDs (restrict access) |
| `LOG_LEVEL` | No | `debug`, `info`, `warn`, `error` (default: `info`) |

## Adding Commands

1. Create a new file in `src/commands/`:
   ```typescript
   // src/commands/mycommand.ts
   import type { Context } from 'grammy';

   export async function myCommand(ctx: Context): Promise<void> {
     await ctx.reply('Hello from my command!');
   }
   ```

2. Export from `src/commands/index.ts`:
   ```typescript
   export { myCommand } from './mycommand';
   ```

3. Register in `src/index.ts`:
   ```typescript
   import { myCommand } from './commands';
   bot.command('mycommand', myCommand);
   ```

## Adding Middleware

Create middleware in `src/middleware/` and register with `bot.use()`:

```typescript
import type { Context, NextFunction } from 'grammy';

export async function myMiddleware(ctx: Context, next: NextFunction): Promise<void> {
  // Before handling
  console.log('Request received');
  
  await next();
  
  // After handling
  console.log('Request processed');
}
```

## Resources

- [grammY Documentation](https://grammy.dev)
- [grammY Plugins](https://grammy.dev/plugins/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## License

MIT
