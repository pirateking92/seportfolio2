// Turns the free-form WordPress CV HTML into structured sections/rows so the CV
// page can lay credits out in columns (title | writer/adapter | venue).
//
// The WP content is a flat list of <p> paragraphs, e.g.
//   <p><strong><u>EXPERIENCE</u></strong></p>          -> section heading
//   <p>2024</p>                                        -> year subheading
//   <p><strong>Title.</strong> Written by X. Venue.</p> -> credit row
//   <p>Course &#8211; School &#8211; 2014</p>          -> dash-separated row
//   <p>Award for <em>Show</em>, 2025</p>               -> text + trailing year
// Anything that doesn't match is kept as a single full-width cell, so no content
// is ever dropped if the CMS formatting changes. Cells keep their inline HTML
// (e.g. <em>) and are rendered with dangerouslySetInnerHTML.

export type CVItem =
  | { type: "year"; text: string }
  | { type: "row"; cells: string[] };

export interface CVSection {
  heading: string | null;
  items: CVItem[];
}

const stripTags = (html: string) => html.replace(/<[^>]*>/g, "");

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—");

const textOf = (html: string) => decode(stripTags(html)).replace(/\s+/g, " ").trim();

// Remove styling wrappers WordPress adds (<span style>, <br>) but keep semantic tags.
const clean = (html: string) =>
  html
    .replace(/<\/?span[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    // Move trailing punctuation outside inline tags: "<em>Show, </em>2020" -> "<em>Show</em>, 2020"
    .replace(/([,.\s]+)(<\/(?:em|i|strong|b|u)>)/gi, "$2$1")
    .replace(/\s+/g, " ")
    .trim();

// Trim whitespace and stray separators from a cell's edges.
const tidy = (s: string) =>
  s
    .replace(/^[\s.,–—-]+|[\s.,–—-]+$/g, "")
    .replace(/^\(([^()]*)\)$/, "$1") // "(Co-Director)" -> "Co-Director"
    .trim();

// A sentence that describes who made it / the role, rather than where it was.
const CREDIT_RE =
  /\b(by|to)\b|^\(?\s*(self-|co-|various|associate|assistant|staff|director)/i;

function splitCredit(restHtml: string): string[] {
  // Split into sentences on ". " (keeps inline tags like <em> intact).
  const parts = restHtml
    .split(/\.\s+(?=[^\s])/)
    .map(tidy)
    .filter((p) => stripTags(p).trim().length > 0);

  if (parts.length === 0) return [];
  if (parts.length === 1) return [parts[0]];

  // Credit column = everything up to the last credit-like sentence; venue = the rest.
  let lastCredit = -1;
  parts.forEach((p, i) => {
    if (CREDIT_RE.test(textOf(p))) lastCredit = i;
  });
  if (lastCredit === -1 || lastCredit === parts.length - 1) {
    lastCredit = parts.length - 2;
  }
  return [
    // Multiple credits (e.g. "Assistant Director to X" + "Written by Y") stack on separate lines.
    parts.slice(0, lastCredit + 1).join("<br />"),
    parts.slice(lastCredit + 1).join(". "),
  ];
}

function parseRow(html: string): string[] {
  // <strong>Title.</strong> rest...
  const strong = html.match(/^<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>([\s\S]*)$/i);
  if (strong) {
    const title = tidy(strong[2]);
    const rest = strong[3].trim();
    return [title, ...splitCredit(rest)].filter(Boolean);
  }

  // Dash-separated: "Course – School – 2014"
  const decoded = decode(html);
  const dashParts = decoded.split(/\s+[–—]\s+/).map(tidy).filter(Boolean);
  if (dashParts.length > 1) {
    return dashParts.length > 3
      ? [dashParts[0], dashParts.slice(1, -1).join(" – "), dashParts.at(-1)!]
      : dashParts;
  }

  // Trailing year: "Award for <em>Show</em>, 2025"
  const year = decoded.match(/^([\s\S]*?)[,\s]+((?:19|20)\d{2})\s*$/);
  if (year && stripTags(year[1]).trim()) return [tidy(year[1]), year[2]];

  return [tidy(decoded)];
}

function isHeading(html: string, text: string) {
  return (
    /<(strong|b)\b/i.test(html) &&
    text.length > 0 &&
    text === text.toUpperCase() &&
    /[A-Z]/.test(text) &&
    textOf(html.replace(/<(strong|b)\b[^>]*>[\s\S]*?<\/\1>/gi, "")) === ""
  );
}

export function parseCV(html: string): CVSection[] {
  const paragraphs = Array.from(html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)).map(
    (m) => clean(m[1])
  );

  const sections: CVSection[] = [];
  let current: CVSection = { heading: null, items: [] };

  for (const p of paragraphs) {
    const text = textOf(p);
    if (!text) continue;

    if (isHeading(p, text)) {
      if (current.heading || current.items.length) sections.push(current);
      current = { heading: text, items: [] };
    } else if (/^(19|20)\d{2}$/.test(text)) {
      current.items.push({ type: "year", text });
    } else {
      current.items.push({ type: "row", cells: parseRow(p) });
    }
  }
  if (current.heading || current.items.length) sections.push(current);
  return sections;
}
