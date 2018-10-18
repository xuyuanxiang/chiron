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

declare namespace NodeJS {
  interface Global {
    __CHIRON_LOG_LEVEL__: keyof Console;

    __CHIRON_DIR_CWD__: string;
    __CHIRON_DIR_SRC__: string;
    __CHIRON_DIR_DIST__: string;

    __CHIRON_RULE_JS__: string;
    __CHIRON_RULE_LESS__: string;
    __CHIRON_RULE_REACT__: string;
    __CHIRON_RULE_VUE__: string;
    __CHIRON_RULE_ANGULAR_JS__: string;

    __CHIRON_LOADER_STYLE__: string;
    __CHIRON_LOADER_CSS__: string;
    __CHIRON_LOADER_POSTCSS__: string;
    __CHIRON_LOADER_LESS__: string;
    __CHIRON_LOADER_HTML__: string;
    __CHIRON_LOADER_VUE__: string;
    __CHIRON_LOADER_BABEL__: string;

    __CHIRON_PLUGIN_HTML__: string;
    __CHIRON_PLUGIN_CLEAN__: string;
    __CHIRON_PLUGIN_VUE__: string;
  }
}
