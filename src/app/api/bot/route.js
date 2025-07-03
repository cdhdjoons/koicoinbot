require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Playing 🕹", web_app: { url: "https://koicoingame.vercel.app" } }],  // 게임 링크 수정
      [{ text: "🔘 Follow X 🐦", url: "https://x.com/KoiCoinXYZ" }],
      [{ text: "🔘 Join the Pond 🐡", url: "https://t.me/KoiCoinXYZ_Chat" }],
      // [{ text: "🔘 Visit Website 🌐", url: "https://www.karateinu.xyz" }],
      // [{ text: "🔘 Read Master book 📖", url: "https://www.karateinu.xyz" }],
    ],
  };

  const message = `
🎮 Welcome to KoiCoin Mini-Game! 🐟  
You've just flopped into the splash zone — where memes rule, reflexes reign, and $KOI is the prize for every legendary tap.

🌊 Here's what you can do:
🐸 Smack frogs, dodge whales, and chase golden koi in wild meme missions  
🎯 Climb the leaderboard and show off your meme-fu skills  
💰 Earn $KOI tokens for top scores, streaks, and chaos combos  
🎁 Unlock surprise events, bonus rounds, and ridiculous rewards  
🏆 Become the ultimate Meme Master in the koi-mmunity arena

🤣 From chaos to coins, this is your meme destiny.

🚀 Ready to dive in?
Tap a button below to begin your koi crusade:
  `;

  const pngUrl = 'https://koicoinbot.vercel.app/koipic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

