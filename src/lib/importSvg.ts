export async function importSvg(label: string): Promise<string> {
  switch (label) {
    case "play":
      return import("@icons/play.svg?raw").then((i) => i.default);
    case "pause":
      return import("@icons/pause.svg?raw").then((i) => i.default);
    case "mute":
      return import("@icons/mute.svg?raw").then((i) => i.default);
    case "volume-low":
      return import("@icons/volume-low.svg?raw").then((i) => i.default);
    case "volume-medium":
      return import("@icons/volume-medium.svg?raw").then((i) => i.default);
    case "volume-high":
      return import("@icons/volume-high.svg?raw").then((i) => i.default);
    default:
      throw new Error(`Unknown icon: ${label}`);
  }
}
