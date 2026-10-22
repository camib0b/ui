declare const preset: {
  darkMode: ["class"];
  content: string[];
  theme: {
    container: {
      center: boolean;
      padding: string;
      screens: { "2xl": string };
    };
    extend: {
      fontFamily: Record<string, string[]>;
      fontSize: Record<string, [string, { lineHeight: string }]>;
      colors: Record<string, unknown>;
      borderRadius: Record<string, string>;
      boxShadow: Record<string, string>;
      transitionDuration: Record<string, string>;
      transitionTimingFunction: Record<string, string>;
      keyframes: Record<string, Record<string, Record<string, string>>>;
      animation: Record<string, string>;
    };
  };
};

export = preset;
