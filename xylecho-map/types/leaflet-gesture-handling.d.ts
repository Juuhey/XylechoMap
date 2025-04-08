import * as L from "leaflet";

declare module "leaflet" {
  interface MapOptions {
    gestureHandling?: boolean;
    gestureHandlingOptions?: {
      text?: {
        touch?: string;
        scroll?: string;
        scrollMac?: string;
      };
    };
  }

  interface Map {
    gestureHandling: {
      enable: () => void;
      disable: () => void;
    };
  }
}