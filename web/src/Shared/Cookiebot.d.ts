export type CookieBot =
  | {
      show: () => void;
      consent: {
        stamp: string;
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
    }
  | undefined
  | null;
