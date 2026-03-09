import type { Context } from 'grammy';

/**
 * Handler for /help command
 * Shows available commands and usage information
 */
export async function helpCommand(ctx: Context): Promise<void> {
  const helpText = `
<b>📚 Available Commands</b>

/start - Start the bot and see welcome message
/help - Show this help message

<b>ℹ️ About</b>
This is a template bot built with grammY framework.
Customize it to add your own commands and features!

<b>🔗 Links</b>
• <a href="https://grammy.dev">grammY Documentation</a>
• <a href="https://core.telegram.org/bots/api">Telegram Bot API</a>
  `.trim();

  await ctx.reply(helpText, {
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  });
}
