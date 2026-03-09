import type { Context } from 'grammy';

/**
 * Handler for /start command
 * Sends a welcome message to the user
 */
export async function startCommand(ctx: Context): Promise<void> {
  const username = ctx.from?.first_name ?? 'there';

  await ctx.reply(
    `👋 Hello, ${username}!\n\n` +
      `Welcome to this bot. I'm ready to help you.\n\n` +
      `Use /help to see available commands.`,
    {
      parse_mode: 'HTML',
    }
  );
}
