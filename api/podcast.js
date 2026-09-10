const RSS_URL = 'https://feeds.ivoox.com/feed_fg_f11233631_filtro_1.xml';
const MAX_EPISODES = 3;

function decodeXml(text) {
  return text
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .trim();
}

function value(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  return match ? decodeXml(match[1]) : '';
}

function episodeNumber(title, link) {
  const match = `${title} ${link}`.match(/(?:aderiva|adfm)[^0-9]{0,8}(\d{1,4})/i)
    || link.match(/(?:^|[-_])(\d{2,4})(?:[-_]|\.|$)/);
  return match ? match[1] : '';
}

function ivooxId(link) {
  const match = link.match(/(?:rf_|ej_)(\d+)/i);
  return match ? match[1] : '';
}

export default async function handler(req, res) {
  try {
    const response = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'ADeriva-Podcast-API/1.0' },
    });
    if (!response.ok) throw new Error(`iVoox RSS request failed: ${response.status}`);
    const xml = await response.text();

    const episodes = [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)]
      .map(m => m[1])
      .map(block => {
        const title = value(block, 'title');
        const link = value(block, 'link') || value(block, 'guid');
        const pubDate = value(block, 'pubDate');
        const id = ivooxId(link) || ivooxId(value(block, 'guid'));
        const num = episodeNumber(title, link);
        if (!title || !link || !id || !num) return null;
        return {
          num,
          title,
          url: link,
          embed: `https://www.ivoox.com/player_ej_${id}_6_1.html?c1=a5241f`,
          pubDate: Date.parse(pubDate) || 0,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.pubDate - a.pubDate)
      .slice(0, MAX_EPISODES)
      .map(({ pubDate, ...episode }) => episode);

    if (!episodes.length) throw new Error('No valid iVoox episodes found in RSS feed.');

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ episodes });
  } catch (error) {
    console.error(error);
    res.status(502).json({ error: 'Unable to load the latest iVoox episodes.' });
  }
}
