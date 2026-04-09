export {};

declare namespace kakao.maps {
  function load(callback: () => void): void;

  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(container: HTMLElement, options: { center: LatLng; level: number });
  }

  class CustomOverlay {
    constructor(options: {
      position: LatLng;
      content: HTMLElement;
      yAnchor?: number;
    });
    setMap(map: Map): void;
  }

  namespace services {
    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: KakaoAddressSearchResult[], status: string) => void,
      ): void;
    }

    const Status: {
      OK: string;
    };
  }
}

declare global {
  interface KakaoAddressSearchResult {
    x: string;
    y: string;
    address_name: string;
  }

  interface Window {
    kakao: typeof kakao;
  }
}
