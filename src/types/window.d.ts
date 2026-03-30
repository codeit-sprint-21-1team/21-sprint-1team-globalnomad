export {};

interface PostcodeOptions {
  oncomplete: (data: PostcodeData) => void;
}
export interface PostcodeData {
  address: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: PostcodeOptions) => {
        open: () => void;
        embed: (container: HTMLElement) => void;
      };
    };
  }
}
