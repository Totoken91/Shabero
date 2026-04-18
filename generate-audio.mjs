// generate-audio.mjs
// Usage:
//   node generate-audio.mjs              — génère tout (skip les existants)
//   node generate-audio.mjs --regen      — supprime tout et régénère
//   node generate-audio.mjs --regen react-1 react-3 night-1  — régénère seulement ceux-là
//
// Requires: ELEVENLABS_API_KEY in .env
// npm install dotenv

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================
// CONFIG
// ============================================================

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = '3JDquces8E8bkmvbh6Bc';
const MODEL_ID = 'eleven_v3';
const OUTPUT_DIR = path.join(__dirname, 'public', 'audio');
const DELAY_MS = 500;

// ============================================================
// CLI ARGS
// ============================================================

const args = process.argv.slice(2);
const regenMode = args[0] === '--regen';
const regenIds = regenMode ? args.slice(1) : []; // empty = regen ALL
const regenAll = regenMode && regenIds.length === 0;

// ============================================================
// PHRASES — 113 phrases de Shabero
// audioText overrides text for TTS when the displayed text
// contains placeholders, latin chars, or slashes
// ============================================================

const phrases = [
  // === POLITESSE ===
  { id: 'polite-1', text: 'ありがとうございます' },
  { id: 'polite-2', text: 'すみません' },
  { id: 'polite-3', text: '大丈夫です' },
  { id: 'polite-4', text: 'いただきます' },
  { id: 'polite-5', text: 'ごちそうさまでした' },
  { id: 'polite-6', text: '失礼します' },
  { id: 'polite-7', text: 'はい、お願いします' },
  { id: 'polite-8', text: 'ちょっと、大丈夫です' },
  { id: 'polite-9', text: 'お先に失礼します' },
  { id: 'polite-10', text: '初めまして、よろしくお願いします' },

  // === NOMBRES ===
  { id: 'numbers-1', text: '一つください' },
  { id: 'numbers-2', text: '二つください' },
  { id: 'numbers-3', text: '一人です' },
  { id: 'numbers-4', text: '二人です' },
  { id: 'numbers-5', text: 'いくらですか？' },
  { id: 'numbers-6', text: '一、二、三、四、五、六、七、八、九、十', audioText: 'いち、に、さん、よん、ご、ろく、なな、はち、きゅう、じゅう' },
  { id: 'numbers-7', text: '三つください' },
  { id: 'numbers-8', text: '何時から何時までですか？' },
  { id: 'numbers-9', text: '[X]円になります', audioText: '千三百円になります' },
  { id: 'numbers-10', text: 'カードで大丈夫ですか？' },

  // === PARLER DE SOI ===
  { id: 'soi-1', text: 'どこから来たの？' },
  { id: 'soi-2', text: 'フランスから来ました' },
  { id: 'soi-3', text: '日本は初めて？' },
  { id: 'soi-4', text: '初めてです。もう最高です。' },
  { id: 'soi-5', text: 'いつまでいるの？' },
  { id: 'soi-6', text: '二週間ぐらいです' },
  { id: 'soi-7', text: 'どこに泊まっているの？' },
  { id: 'soi-8', text: '新宿のホテルに泊まってます' },
  { id: 'soi-9', text: '仕事は何してるの？' },
  { id: 'soi-10', text: 'IT関係の仕事してます' },
  { id: 'soi-11', text: 'なんで日本に来たの？' },
  { id: 'soi-12', text: 'ずっと来てみたかった。日本の文化と食べ物が大好きで。' },
  { id: 'soi-13', text: '日本で一番よかったことは？' },
  { id: 'soi-14', text: '食べ物がやばい。昨日食べたラーメンが人生で一番うまかった。' },

  // === SE REPÉRER ===
  { id: 'navi-1', text: 'すみません、ここはどこですか？' },
  { id: 'navi-2', text: 'この辺にコンビニありますか？' },
  { id: 'navi-3', text: '歩いて行けますか？' },
  { id: 'navi-4', text: 'まっすぐ行って、右に曲がってください' },
  { id: 'navi-5', text: 'ごめんなさい、もう一回お願いします' },
  { id: 'navi-6', text: 'ここに行きたいんですけど' },
  { id: 'navi-7', text: 'トイレはどこですか？' },
  { id: 'navi-8', text: 'この住所までお願いします' },
  { id: 'navi-9', text: 'グーグルマップが動かない' },
  { id: 'navi-10', text: 'どのくらいかかりますか？' },

  // === KONBINI ===
  { id: 'konbini-1', text: 'ポイントカードはありますか？' },
  { id: 'konbini-2', text: 'あ、大丈夫っす' },
  { id: 'konbini-3', text: 'あたためますか？' },
  { id: 'konbini-4', text: 'お願いします' },
  { id: 'konbini-5', text: 'お箸はご利用ですか？' },
  { id: 'konbini-6', text: '袋いらないです' },
  { id: 'konbini-7', text: 'スイカで' },
  { id: 'konbini-8', text: 'レシートいらないです' },

  // === IZAKAYA ===
  { id: 'izakaya-1', text: 'すいません' },
  { id: 'izakaya-2', text: '何名様ですか？' },
  { id: 'izakaya-3', text: '二人です' },
  { id: 'izakaya-4', text: 'とりあえず生で' },
  { id: 'izakaya-5', text: 'おすすめなんですか' },
  { id: 'izakaya-6', text: 'これめっちゃうまい' },
  { id: 'izakaya-7', text: 'めっちゃうまくない？これ' },
  { id: 'izakaya-8', text: 'もう一杯いっとく？' },
  { id: 'izakaya-9', text: 'お会計お願いします' },
  { id: 'izakaya-10', text: 'ごちそうさまでした' },

  // === TRAINS ===
  { id: 'trains-1', text: '渋谷に行きたいんですけど' },
  { id: 'trains-2', text: 'この電車渋谷に止まりますか' },
  { id: 'trains-3', text: 'やばい、終電なくね' },
  { id: 'trains-4', text: '終電何時？' },
  { id: 'trains-5', text: '乗り換えどこだっけ' },
  { id: 'trains-6', text: 'すみません、ここ空いてますか' },
  { id: 'trains-7', text: '次の駅で降りる' },
  { id: 'trains-8', text: '間に合った' },

  // === SHOPPING ===
  { id: 'shopping-1', text: 'これ何？' },
  { id: 'shopping-2', text: 'これいくら？' },
  { id: 'shopping-3', text: 'まじかっこいい' },
  { id: 'shopping-4', text: 'ちょっと見せて' },
  { id: 'shopping-5', text: '試着していいですか' },
  { id: 'shopping-6', text: 'ちょっと高いな' },
  { id: 'shopping-7', text: 'これにする' },
  { id: 'shopping-8', text: '見てるだけです' },

  // === HÔTEL ===
  { id: 'hotel-1', text: 'チェックインお願いします' },
  { id: 'hotel-2', text: '荷物預かってもらえますか？' },
  { id: 'hotel-3', text: 'ワイファイのパスワードは何ですか？' },
  { id: 'hotel-4', text: 'エアコンの使い方がわからないんですけど' },
  { id: 'hotel-5', text: 'チェックアウトは何時ですか？' },
  { id: 'hotel-6', text: 'すみません、部屋のシャワーが壊れているんですけど' },
  { id: 'hotel-7', text: 'タオルもう一枚もらえますか？' },
  { id: 'hotel-8', text: 'もう一泊延長できますか？' },
  { id: 'hotel-9', text: 'パスポートを見せていただけますか？' },
  { id: 'hotel-10', text: 'お世話になりました' },

  // === URGENCES ===
  { id: 'urgences-1', text: '助けてください' },
  { id: 'urgences-2', text: '警察呼んでください' },
  { id: 'urgences-3', text: '病院どこですか' },
  { id: 'urgences-4', text: '気分が悪いです' },
  { id: 'urgences-5', text: '財布なくしました' },
  { id: 'urgences-6', text: '英語できる人いますか' },
  { id: 'urgences-7', text: 'スマホ忘れた' },

  // === SOCIALISER ===
  { id: 'social-1', text: 'フランスから来た' },
  { id: 'social-2', text: '名前なんていうの' },
  { id: 'social-3', text: '日本語まだまだだけど' },
  { id: 'social-4', text: '日本語上手だね' },
  { id: 'social-5', text: 'いやいや、全然だよ' },
  { id: 'social-6', text: '仕事何' },
  { id: 'social-7', text: '趣味とかある' },
  { id: 'social-8', text: 'ライン交換しよ' },
  { id: 'social-9', text: 'また遊ぼう' },
  { id: 'social-10', text: 'めっちゃ楽しかった。ありがとね' },

  // === RÉACTIONS ===
  { id: 'react-1', text: 'マジで' },
  { id: 'react-2', text: 'うそ' },
  { id: 'react-3', text: 'やばい' },
  { id: 'react-4', text: 'へー、そうなんだ' },
  { id: 'react-5', text: 'なるほどね' },
  { id: 'react-6', text: 'えーっと' },
  { id: 'react-7', text: 'そうそうそう' },
  { id: 'react-8', text: 'まじかー' },
  { id: 'react-9', text: 'いいね' },
  { id: 'react-10', text: 'ちょっと待って' },
  { id: 'react-11', text: '大丈夫大丈夫' },
  { id: 'react-12', text: 'めっちゃわかる' },

  // === NIGHTLIFE ===
  { id: 'night-1', text: '乾杯' },
  { id: 'night-2', text: '飲み放題にする' },
  { id: 'night-3', text: 'もう一軒行こう' },
  { id: 'night-4', text: 'ここ割り勘' },
  { id: 'night-5', text: 'おごるよ' },
  { id: 'night-6', text: 'ちょっと酔っちゃった' },
  { id: 'night-7', text: '明日仕事あるのにやばい' },
  { id: 'night-8', text: '終電やばくない' },
  { id: 'night-9', text: 'タクシーで帰る' },
  { id: 'night-10', text: '今日めっちゃ楽しかった' },

  // === CHECK-IN HÔTEL ===
  { id: 'checkin-1', text: 'いらっしゃいませ、チェックインでしょうか？' },
  { id: 'checkin-2', text: '予約してます' },
  { id: 'checkin-3', text: 'パスポートを拝見してもよろしいでしょうか？' },
  { id: 'checkin-4', text: 'はい、どうぞ' },
  { id: 'checkin-5', text: 'こちらにご記入お願いします' },
  { id: 'checkin-6', text: 'ここ、何を書けばいいですか？' },
  { id: 'checkin-7', text: '禁煙のお部屋でよろしいですか？' },
  { id: 'checkin-8', text: '朝食は一階で七時から十時までです' },
  { id: 'checkin-9', text: 'お部屋は五階の五〇三号室になります' },
  { id: 'checkin-10', text: '何かご質問はございますか？' },

  // === SLANG & GROS MOTS ===
  { id: 'insult-1', text: 'くそ' },
  { id: 'insult-2', text: 'うざい' },
  { id: 'insult-3', text: 'きもい' },
  { id: 'insult-4', text: 'ふざけんな' },
  { id: 'insult-5', text: 'まじうぜー' },
  { id: 'insult-6', text: 'ばか' },
  { id: 'insult-7', text: 'あほ' },
  { id: 'insult-8', text: 'だまれ' },
  { id: 'insult-9', text: 'やめろよ' },
  { id: 'insult-10', text: 'むかつく' },
  { id: 'insult-11', text: '死ね' },
  { id: 'insult-12', text: 'くそやろう' },
  { id: 'insult-13', text: 'ちくしょう' },
  { id: 'insult-14', text: 'なめんなよ' },
];

// ============================================================
// GÉNÉRATION
// ============================================================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateAudio(textToSend) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text: textToSend,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${response.status} — ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  if (!API_KEY) {
    console.error('❌ ELEVENLABS_API_KEY manquante. Crée un fichier .env avec ta clé.');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Filter phrases based on mode
  let toProcess = phrases;
  if (regenMode && !regenAll) {
    toProcess = phrases.filter(p => regenIds.includes(p.id));
    console.log(`\n🔄 Mode --regen : ${toProcess.length} phrase(s) à régénérer\n`);
  } else if (regenAll) {
    console.log(`\n🔄 Mode --regen ALL : suppression de tous les MP3...\n`);
    const existing = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.mp3'));
    existing.forEach(f => fs.unlinkSync(path.join(OUTPUT_DIR, f)));
  }

  console.log(`🎙️  ${toProcess.length} fichiers audio à traiter`);
  console.log(`📁 ${OUTPUT_DIR}`);
  console.log(`🔊 Voice: ${VOICE_ID} | Model: ${MODEL_ID}\n`);
  console.log('─'.repeat(50));

  let success = 0;
  let skipped = 0;
  let errors = 0;
  const startTime = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    const phrase = toProcess[i];
    const outputPath = path.join(OUTPUT_DIR, `${phrase.id}.mp3`);

    // In regen mode for specific IDs, delete existing first
    if (regenMode && fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    // Skip if exists (normal mode)
    if (!regenMode && fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    // Prepare text for TTS
    let textToSend = phrase.audioText || phrase.text;
    // Add Japanese period to short phrases to help language detection
    if (textToSend.length < 8) {
      textToSend = textToSend + '。';
    }

    try {
      process.stdout.write(`🎧 [${i + 1}/${toProcess.length}] ${phrase.id} — "${textToSend.substring(0, 30)}" `);

      const audioBuffer = await generateAudio(textToSend);
      fs.writeFileSync(outputPath, audioBuffer);

      const sizeKB = (audioBuffer.length / 1024).toFixed(1);
      console.log(`✅ (${sizeKB} KB)`);
      success++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      errors++;
    }

    if (i < toProcess.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ Terminé en ${elapsed}s`);
  console.log(`   ✅ ${success} générés`);
  if (skipped > 0) console.log(`   ⏭️  ${skipped} skippés (déjà existants)`);
  if (errors > 0) console.log(`   ❌ ${errors} erreurs`);
  console.log(`   📁 ${OUTPUT_DIR}\n`);

  if (errors > 0) {
    console.log('💡 Relance avec --regen [ids] pour régénérer les fichiers en erreur.\n');
  }
}

main().catch(console.error);
