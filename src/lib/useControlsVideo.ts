type Selectors = {
  video: HTMLVideoElement | string;
  // TODO: Make optional
  btnState: HTMLButtonElement | string;
  // TODO: Make optional
  btnMute: HTMLButtonElement | string;
};

type Options = {
  /** If true, initialize to muted, otherwise unmuted. By default, ``true``. */
  muted: boolean;
  /** Initial volume. By default, ``0.5`` */
  volume: number;
  /** Callback when video is played. */
  onPlay?: () => void;
  /** Callback when video is paused. */
  onPause?: () => void;
  /** Callback when video is muted. */
  onMute?: () => void;
  /** Callback when video is unmuted. */
  onUnmute?: () => void;
  /** Callback when video volume changes. */
  onVolumeChange?: () => void;
  /** Content of the play button. */
  playContent: string;
  /** Content of the pause button. */
  pauseContent: string;
  /** Content of the mute button. */
  muteContent: string;
  /** Content of the unmute button. */
  unmuteContent: string | string[];
};

export function useControlsVideo(
  selectors: Selectors,
  videoOptions: Partial<Options> = {}
) {
  const video = getElement(selectors.video);
  const btnState = getElement(selectors.btnState);
  const btnMute = getElement(selectors.btnMute);

  const options: Options = Object.assign(
    {
      volume: 0.5,
      muted: true,
      playContent: "⏸️",
      pauseContent: "▶️",
      muteContent: "🔇",
      unmuteContent: ["🔉", "🔊"],
    } satisfies Options,
    videoOptions
  );

  video.volume = options.volume;
  video.muted = options.muted;

  let paused = video.paused;
  let volume = video.volume;

  video.addEventListener("playing", onPlay);
  video.addEventListener("pause", onPause);
  video.addEventListener("ended", onPause);
  video.addEventListener("volumechange", onVolumeChange);

  function init() {
    if (paused) {
      btnState.innerText = options.playContent;
      return;
    }
    btnState.innerText = options.pauseContent;
  }

  btnState.addEventListener("click", () => {
    if (paused) {
      video.play();
      return;
    }
    video.pause();
  });

  btnMute.addEventListener("click", () => {
    video.muted = !video.muted;
    if (video.muted) options.onMute?.();
    else options.onUnmute?.();
  });

  function onPlay() {
    paused = false;
    btnState.innerHTML = options.playContent;
    options.onPlay?.();
  }

  function onPause() {
    paused = true;
    btnState.innerHTML = options.pauseContent;
    options.onPause?.();
  }

  function onVolumeChange() {
    options.onVolumeChange?.();

    if (video.muted || video.volume === 0) {
      btnMute.innerHTML = options.muteContent;
      return;
    }

    if (typeof options.unmuteContent === "string") {
      btnMute.innerHTML = options.unmuteContent;
      return;
    }

    if (Array.isArray(options.unmuteContent)) {
      const index = findIndexByVolume(video.volume, options.unmuteContent);
      btnMute.innerHTML = options.unmuteContent[index];
    }
  }

  init();
}

function getElement<T extends HTMLElement>(selector: T | string): T {
  const element =
    typeof selector === "string"
      ? document.querySelector<T>(selector)
      : selector;

  assertsElementsExist(element);

  return element;
}

function assertsElementsExist<T extends HTMLElement>(
  element: T | null
): asserts element is T {
  if (!element) {
    throw new Error("Element not found");
  }
}

function findIndexByVolume(volume: number, array: string[]): number {
  let min = 0;
  for (let index = 0; index <= array.length; index++) {
    const max = (1 / array.length) * (index + 1);

    if (volume >= min && volume < max) {
      return index;
    }

    min = max;
  }

  return array.length - 1;
}
