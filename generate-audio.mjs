// generate-audio.mjs
// Usage: node generate-audio.mjs
// Requires: ELEVENLABS_API_KEY in .env or as environment variable
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

// Model — utilise eleven_multilingual_v2 pour le japonais
const MODEL_ID = 'eleven_multilingual_v2';

// Dossier de sortie
const OUTPUT_DIR = path.join(__dirname, 'public', 'audio');

// Délai entre chaque requête (ms) pour éviter le rate limiting
const DELAY_MS = 500;

// ============================================================
// PHRASES — Toutes les phrases de Shabero
// ============================================================

const phrases = [
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
  { id: 'social-8', text: 'LINE交換しよ' },
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
  { id: 'insult-11', text: 'しね' },
  { id: 'insult-12', text: 'くそやろう' },
  { id: 'insult-13', text: 'ちくしょう' },
  { id: 'insult-14', text: 'なめんなよ' },

  // === HÔTEL (NOUVEAU) ===
  { id: 'hotel-1', text: 'チェックインお願いします' },
  { id: 'hotel-2', text: '荷物預かってもらえますか？' },
  { id: 'hotel-3', text: 'Wi-Fiのパスワードは何ですか？' },
  { id: 'hotel-4', text: 'エアコンの使い方がわからないんですけど' },
  { id: 'hotel-5', text: 'チェックアウトは何時ですか？' },
  { id: 'hotel-6', text: 'すみません、部屋のシャワーが壊れているんですけど' },
  { id: 'hotel-7', text: 'タオルもう一枚もらえますか？' },
  { id: 'hotel-8', text: 'もう一泊延長できますか？' },
  { id: 'hotel-9', text: 'パスポートを見せていただけますか？' },
  { id: 'hotel-10', text: 'お世話になりました' },

  // === SE REPÉRER (NOUVEAU) ===
  { id: 'navi-1', text: 'すみません、ここはどこですか？' },
  { id: 'navi-2', text: 'この辺にコンビニありますか？' },
  { id: 'navi-3', text: '歩いて行けますか？' },
  { id: 'navi-4', text: 'まっすぐ行って、右に曲がってください' },
  { id: 'navi-5', text: 'ごめんなさい、もう一回お願いします' },
  { id: 'navi-6', text: 'ここに行きたいんですけど' },
  { id: 'navi-7', text: 'トイレはどこですか？' },
  { id: 'navi-8', text: 'この住所までお願いします' },
  { id: 'navi-9', text: 'Googleマップが動かない' },
  { id: 'navi-10', text: 'どのくらいかかりますか？' },

  // === POLITESSE (NOUVEAU) ===
  { id: 'polite-1', text: 'ありがとうございます' },
  { id: 'polite-2', text: 'すみません' },
  { id: 'polite-3', text: '大丈夫です' },
  { id: 'polite-4', text: 'いただきます' },
  { id: 'polite-5', text: 'ごちそうさまでした' },
  { id: 'polite-6', text: '失礼します' },
  { id: 'polite-7', text: 'はい、お願いします' },
  { id: 'polite-8', text: 'ちょっと…大丈夫です' },
  { id: 'polite-9', text: 'お先に失礼します' },
  { id: 'polite-10', text: '初めまして、よろしくお願いします' },

  // === NOMBRES (NOUVEAU) ===
  { id: 'numbers-1', text: '一つください' },
  { id: 'numbers-2', text: '二つください' },
  { id: 'numbers-3', text: '一人です' },
  { id: 'numbers-4', text: '二人です' },
  { id: 'numbers-5', text: 'いくらですか？' },
  { id: 'numbers-6', text: 'いち、に、さん、よん、ご、ろく、なな、はち、きゅう、じゅう' },
  { id: 'numbers-7', text: '三つください' },
  { id: 'numbers-8', text: '何時から何時までですか？' },
  { id: 'numbers-9', text: '千三百円になります' },
  { id: 'numbers-10', text: 'カードで大丈夫ですか？' },
];

// ============================================================
// GÉNÉRATION
// ============================================================

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateAudio(phrase) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text: phrase.text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.6,        // Un peu de variation naturelle
          similarity_boost: 0.8,  // Fidèle à la voix choisie
          style: 0.3,            // Léger style conversationnel
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Erreur API pour ${phrase.id}: ${response.status} — ${error}`);
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

async function main() {
  // Créer le dossier de sortie
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`\n🎙️  Génération de ${phrases.length} fichiers audio\n`);
  console.log(`📁 Sortie : ${OUTPUT_DIR}`);
  console.log(`🔊 Voice ID : ${VOICE_ID}`);
  console.log(`⏱️  Délai entre requêtes : ${DELAY_MS}ms\n`);
  console.log('─'.repeat(50));

  let success = 0;
  let errors = 0;
  const startTime = Date.now();

  for (let i = 0; i < phrases.length; i++) {
    const phrase = phrases[i];
    const outputPath = path.join(OUTPUT_DIR, `${phrase.id}.mp3`);

    // Skip si le fichier existe déjà
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  [${i + 1}/${phrases.length}] ${phrase.id} — déjà généré, skip`);
      success++;
      continue;
    }

    try {
      process.stdout.write(`🎧 [${i + 1}/${phrases.length}] ${phrase.id} — "${phrase.text.substring(0, 25)}..." `);
      
      const audioBuffer = await generateAudio(phrase);
      fs.writeFileSync(outputPath, audioBuffer);
      
      const sizeKB = (audioBuffer.length / 1024).toFixed(1);
      console.log(`✅ (${sizeKB} KB)`);
      success++;
    } catch (err) {
      console.log(`❌ ${err.message}`);
      errors++;
    }

    // Attendre entre les requêtes
    if (i < phrases.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ Terminé en ${elapsed}s`);
  console.log(`   ✅ ${success} fichiers générés`);
  console.log(`   ❌ ${errors} erreurs`);
  console.log(`   📁 ${OUTPUT_DIR}\n`);

  if (errors > 0) {
    console.log('💡 Relance le script pour régénérer les fichiers manquants (les existants seront skippés).\n');
  }
}

main().catch(console.error);
