declare module 'posthtml' {
  export interface PostHTMLPluginConstructor {
    new (): PostHTMLPlugin;
  }

  export interface PostHTMLPlugin {
    (tree: any): any;
  }

  export interface PostHTML {
    version: string;
    name: string;
    plugins: Function | PostHTMLPlugin[];

    process(
      source: string,
      options?: {
        sync?: boolean;
        directives?: { name: string; start: string; end: string }[];
      },
    ): { html: string };
  }

  export default function(plugins?: PostHTMLPlugin[]): PostHTML;
}

declare module '@babel/code-frame' {
  export interface Location {
    start?: { line: number; column: number };
    end?: { line: number; column: number };
  }

  export interface CodeFrameOptions {
    highlightCode?: boolean;
    linesAbove?: number;
    linesBelow?: number;
    forceColor?: boolean;
    message: string;
  }

  export function codeFrameColumns(
    rawLines: string,
    location: Location,
    options?: CodeFrameOptions,
  ): string;
}

declare namespace NodeJS {
  interface Global {
    __LOG_LEVEL__: keyof Console;
  }
}

declare var __LOG_LEVEL__: keyof Console;
