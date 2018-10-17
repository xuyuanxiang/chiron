import { resolve } from 'path';

global.__CHIRON_LOG_LEVEL__ = 'info';

global.__CHIRON_DIR_CWD__ = process.cwd();
global.__CHIRON_DIR_SRC__ = resolve(global.__CHIRON_DIR_CWD__, 'src');
global.__CHIRON_DIR_DIST__ = resolve(global.__CHIRON_DIR_CWD__, 'dist');

global.__CHIRON_RULE_JS__ = 'js_rule';
global.__CHIRON_RULE_REACT__ = 'react_rule';
global.__CHIRON_RULE_VUE__ = 'vue_rule';
global.__CHIRON_RULE_ANGULAR_JS__ = 'angular_rule';
global.__CHIRON_RULE_LESS__ = 'less_rule';

global.__CHIRON_LOADER_STYLE__ = 'style_loader';
global.__CHIRON_LOADER_CSS__ = 'css_loader';
global.__CHIRON_LOADER_POSTCSS__ = 'postcss_loader';
global.__CHIRON_LOADER_LESS__ = 'less_loader';
global.__CHIRON_LOADER_HTML__ = 'html_loader';
global.__CHIRON_LOADER_BABEL__ = 'babel_loader';
global.__CHIRON_LOADER_VUE__ = 'vue_loader';

global.__CHIRON_PLUGIN_HTML__ = 'html_plugin';
global.__CHIRON_PLUGIN_CLEAN__ = 'clean_plugin';
global.__CHIRON_PLUGIN_VUE__ = 'vue_plugin';
