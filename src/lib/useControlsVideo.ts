// initial "Pause" | "Play"
type State = "Pause" | "Play";
type Volume = 0 | 1;

const path = {
  play: "M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z",
  pause:
    "M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-32-320v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z",
  mute: "",
  unmute: "",
};

type Selectors = {
  video: HTMLVideoElement | string;
  btnState: HTMLButtonElement | string;
  // btnVolume: HTMLButtonElement | string;
};

type Options = {
  initialState?: State;
};

export function useControlsVideo(selectors: Selectors, options: Options = {}) {
  const video = getElement(selectors.video);
  const btnState = getElement(selectors.btnState);
  let state = options.initialState || "Pause";

  function init() {
    switch (state) {
      case "Play":
        btnState.innerText = "Pause";
        break;
      case "Pause":
        btnState.innerText = "Play";
        break;
    }

    btnState.addEventListener("click", () => {
      switch (state) {
        case "Play":
          pause();
          break;
        case "Pause":
          play();
          break;
      }
    });
  }

  function play() {
    state = "Play";
    btnState.innerText = "Pause";
    video.play();
  }

  function pause() {
    state = "Pause";
    btnState.innerText = "Play";
    video.pause();
  }

  init();

  return {
    play,
    pause,
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

// export function useControlsVideo(selector: string) {
//   const video = document.querySelector<HTMLVideoElement>(selector);
//   return {
//     play: () => {
//       video?.play();
//     },
//     pause: () => {
//       video?.pause();
//     },
//   };
// }
