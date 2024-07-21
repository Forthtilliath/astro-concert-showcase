type Selectors = {
  video: HTMLVideoElement | string;
  btnState: HTMLButtonElement | string;
  // btnVolume: HTMLButtonElement | string;
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
  /** Content of the play button. */
  playContent: string;
  /** Content of the pause button. */
  pauseContent: string;
  /** Content of the mute button. */
  // muteContent: string;
  /** Content of the unmute button. */
  // unmuteContent: string;
};

export function useControlsVideo(
  selectors: Selectors,
  videoOptions: Partial<Options> = {}
) {
  const video = getElement(selectors.video);
  const btnState = getElement(selectors.btnState);

  const options: Options = Object.assign(
    {
      volume: 0.5,
      muted: true,
      playContent: "⏸️",
      pauseContent: "▶️",
    } satisfies Options,
    videoOptions
  );

  video.volume = options.volume;
  video.muted = options.muted;

  let paused = video.paused;

  video.addEventListener("playing", onPlay);
  video.addEventListener("pause", onPause);
  video.addEventListener("ended", onPause);

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

  init();

  return {
    play: onPlay,
    pause: onPause,
  };
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
