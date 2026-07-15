import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getContactFormSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate request body using a neutral schema (validation messages don't matter server-side)
    const neutralValidation = {
      nameMin: 'Name too short',
      nameMax: 'Name too long',
      phoneFormat: 'Invalid phone',
      phoneMin: 'Phone too short',
      phoneLong: 'Phone too long',
      messageMax: 'Message too long',
    };
    const validationResult = getContactFormSchema(neutralValidation).safeParse(message);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { name, phone, message: userMessage } = validationResult.data;

    // Check environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const userIdsString = process.env.TELEGRAM_USER_IDS;

    if (!botToken || !userIdsString) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_USER_IDS');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Format message for Telegram
    const formattedMessage = `
🎉 Новая заявка с сайта Domovenok.md

👤 Имя: ${name}
📞 Телефон: ${phone}
${userMessage ? `💬 Сообщение: ${userMessage}` : ''}

📅 Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}
`;

    // Parse user IDs
    const userIds = userIdsString.split(',').map((id) => id.trim());

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid user IDs configuration' },
        { status: 500 }
      );
    }

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send to all configured Telegram users
    try {
      const promises = userIds.map((userId) =>
        axios.post(telegramApiUrl, {
          chat_id: userId,
          text: formattedMessage,
          parse_mode: 'HTML',
        })
      );

      await Promise.all(promises);
    } catch (error: any) {
      console.error(
        'Error sending Telegram messages:',
        error.response?.data || error.message
      );
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Форма успешно отправлена',
    });
  } catch (error: any) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
