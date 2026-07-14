// CARIMBO geometry generator — DESIGN.md §6/§10: postmark geometry is
// computed, never eyeballed. Run `node tools/carimbo-geometry.mjs` and paste
// the printed snippets into the consuming SVG/component, noting this path.

const fmt = (n) => Number(n.toFixed(3));

// ---------------------------------------------------------------------------
// Postmark: double ring, circular text arcs, cancellation waves.
// Canvas: 0..120 for the circle; waves extend to the right.
// ---------------------------------------------------------------------------
const CX = 60;
const CY = 60;
const R_OUTER = 57;
const R_INNER = 40;
const FONT_SIZE = 11.5;
const CAP = 0.72 * FONT_SIZE; // approximate cap height
const R_TEXT_TOP = 44.5; // baseline of top arc text (caps extend outward)
const R_TEXT_BOT = R_TEXT_TOP + CAP; // baseline of bottom arc (caps extend inward)

// Top arc: left -> right over the top (sweep=1 in y-down coords).
const topArc = `M ${fmt(CX - R_TEXT_TOP)} ${CY} A ${R_TEXT_TOP} ${R_TEXT_TOP} 0 1 1 ${fmt(
  CX + R_TEXT_TOP,
)} ${CY}`;

// Bottom arc: left -> right under the bottom (sweep=0), so glyphs stay upright.
const botArc = `M ${fmt(CX - R_TEXT_BOT)} ${CY} A ${R_TEXT_BOT} ${R_TEXT_BOT} 0 1 0 ${fmt(
  CX + R_TEXT_BOT,
)} ${CY}`;

// ---------------------------------------------------------------------------
// Cancellation waves: y = A * sin(2πx / P), drawn as exact tangent-matching
// quadratic segments per quarter period (control point = intersection of the
// zero-crossing tangent and the horizontal peak tangent: dx = P / (2π)).
// ---------------------------------------------------------------------------
function wavePath(x0, y0, length, amplitude, period) {
  const q = period / 4;
  const dxc = period / (2 * Math.PI);
  let d = `M ${fmt(x0)} ${fmt(y0)}`;
  let x = x0;
  let sign = -1; // first quarter rises (upward = -y on screen)
  let atPeak = false;
  while (x + q <= x0 + length + 0.01) {
    const xn = x + q;
    if (!atPeak) {
      // zero-crossing -> peak
      d += ` Q ${fmt(x + dxc)} ${fmt(y0 + sign * amplitude)} ${fmt(xn)} ${fmt(
        y0 + sign * amplitude,
      )}`;
    } else {
      // peak -> zero-crossing
      d += ` Q ${fmt(xn - dxc)} ${fmt(y0 + sign * amplitude)} ${fmt(xn)} ${fmt(
        y0,
      )}`;
      sign = -sign;
    }
    atPeak = !atPeak;
    x = xn;
  }
  return d;
}

const WAVE_X0 = CX + R_OUTER + 14;
const WAVE_LEN = 132;
const WAVE_A = 4.6;
const WAVE_P = 33;
const WAVE_GAP = 11.5;
const waves = [-1, 0, 1].map((i) =>
  wavePath(WAVE_X0, CY + i * WAVE_GAP, WAVE_LEN, WAVE_A, WAVE_P),
);

// Favicon variant: ring + two waves crossing the circle itself.
const faviconWaves = [-0.5, 0.5].map((i) =>
  wavePath(CX - R_OUTER + 8, CY + i * 16, 2 * (R_OUTER - 8), 4.2, 30),
);

console.log("== postmark ==");
console.log("outer ring r:", R_OUTER, "inner ring r:", R_INNER);
console.log("topArc:", topArc);
console.log("botArc:", botArc);
waves.forEach((w, i) => console.log(`wave${i}:`, w));
console.log("== favicon ==");
faviconWaves.forEach((w, i) => console.log(`fwave${i}:`, w));
