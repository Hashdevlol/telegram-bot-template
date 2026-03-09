import { Bot } from 'grammy';
import { config } from './config';
import { loggerMiddleware, log } from './middleware/logger';
import { startCommand, helpCommand } from './commands';

// Create bot instance
const bot = new Bot(config.botToken);

// Register middleware
bot.use(loggerMiddleware);

// Register commands
bot.command('start', startCommand);
bot.command('help', helpCommand);

// Handle unknown messages (optional - remove if not needed)
bot.on('message', async (ctx) => {
  await ctx.reply("I don't understand that. Try /help to see available commands.");
});

// Error handling
bot.catch((err) => {
  log('error', 'Bot error occurred', {
    error: err.message,
    stack: err.stack,
  });
});

// Graceful shutdown
function shutdown(signal: string): void {
  log('info', `Received ${signal}, shutting down gracefully...`);
  bot.stop();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Start the bot
async function main(): Promise<void> {
  log('info', 'Starting bot...');

  try {
    // Get bot info to verify token
    const botInfo = await bot.api.getMe();
    log('info', `Bot authenticated as @${botInfo.username}`);

    // Start polling
    await bot.start({
      onStart: (botInfo) => {
        log('info', `Bot @${botInfo.username} is now running!`);
      },
    });
  } catch (error) {
    log('error', 'Failed to start bot', {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

void main();
