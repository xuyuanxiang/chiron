declare namespace NodeJS {
  interface Global {
    __LOG_LEVEL__: keyof Console;
  }
}

declare var __LOG_LEVEL__: keyof Console;
