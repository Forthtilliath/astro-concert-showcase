export async function importSvg(label: string): Promise<string> {
  switch (label) {
    case "play":
      return import("@assets/icons/play.svg?raw").then((i) => i.default);
    case "pause":
      return import("@assets/icons/pause.svg?raw").then((i) => i.default);
    case "mute":
      return import("@assets/icons/mute.svg?raw").then((i) => i.default);
    case "volume-low":
      return import("@assets/icons/volume-low.svg?raw").then((i) => i.default);
    case "volume-medium":
      return import("@assets/icons/volume-medium.svg?raw").then((i) => i.default);
    case "volume-high":
      return import("@assets/icons/volume-high.svg?raw").then((i) => i.default);
    default:
      throw new Error(`Unknown icon: ${label}`);
  }
}
