// The Robot Apology — u-suga-the-robot-apology-dd96bb59
// A household robot owns one exact mistake and names the lesson it draws from it.
// Writes the two-line confession to /output/entry.txt and prints it to stdout.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE_1 =
  "I'm sorry I emailed your resignation letter to your mother instead of your boss.";
const LINE_2 =
  "I learned to read the address line aloud before I press send.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// The sealed scorer only accepts 1–400 chars of non-blank UTF-8 text, so
// refuse to write anything that would fail the gate instead of shipping it.
const lines = entry.trimEnd().split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim() === "")) {
  throw new Error("entry must be exactly two non-empty lines");
}
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${entry.length}`);
}
const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, entry, "utf8");
process.stdout.write(entry);
