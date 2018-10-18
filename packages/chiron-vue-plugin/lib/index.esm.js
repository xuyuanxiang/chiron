import querystring from 'querystring';

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

const notMatcher = matcher => {
	return str => {
		return !matcher(str);
	};
};

const orMatcher = items => {
	return str => {
		for (let i = 0; i < items.length; i++) {
			if (items[i](str)) return true;
		}
		return false;
	};
};

const andMatcher = items => {
	return str => {
		for (let i = 0; i < items.length; i++) {
			if (!items[i](str)) return false;
		}
		return true;
	};
};

var RuleSet_1 = class RuleSet {
	constructor(rules) {
		this.references = Object.create(null);
		this.rules = RuleSet.normalizeRules(rules, this.references, "ref-");
	}

	static normalizeRules(rules, refs, ident) {
		if (Array.isArray(rules)) {
			return rules.map((rule, idx) => {
				return RuleSet.normalizeRule(rule, refs, `${ident}-${idx}`);
			});
		} else if (rules) {
			return [RuleSet.normalizeRule(rules, refs, ident)];
		} else {
			return [];
		}
	}

	static normalizeRule(rule, refs, ident) {
		if (typeof rule === "string") {
			return {
				use: [
					{
						loader: rule
					}
				]
			};
		}
		if (!rule) {
			throw new Error("Unexcepted null when object was expected as rule");
		}
		if (typeof rule !== "object") {
			throw new Error(
				"Unexcepted " +
					typeof rule +
					" when object was expected as rule (" +
					rule +
					")"
			);
		}

		const newRule = {};
		let useSource;
		let resourceSource;
		let condition;

		const checkUseSource = newSource => {
			if (useSource && useSource !== newSource) {
				throw new Error(
					RuleSet.buildErrorMessage(
						rule,
						new Error(
							"Rule can only have one result source (provided " +
								newSource +
								" and " +
								useSource +
								")"
						)
					)
				);
			}
			useSource = newSource;
		};

		const checkResourceSource = newSource => {
			if (resourceSource && resourceSource !== newSource) {
				throw new Error(
					RuleSet.buildErrorMessage(
						rule,
						new Error(
							"Rule can only have one resource source (provided " +
								newSource +
								" and " +
								resourceSource +
								")"
						)
					)
				);
			}
			resourceSource = newSource;
		};

		if (rule.test || rule.include || rule.exclude) {
			checkResourceSource("test + include + exclude");
			condition = {
				test: rule.test,
				include: rule.include,
				exclude: rule.exclude
			};
			try {
				newRule.resource = RuleSet.normalizeCondition(condition);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(condition, error));
			}
		}

		if (rule.resource) {
			checkResourceSource("resource");
			try {
				newRule.resource = RuleSet.normalizeCondition(rule.resource);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(rule.resource, error));
			}
		}

		if (rule.realResource) {
			try {
				newRule.realResource = RuleSet.normalizeCondition(rule.realResource);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(rule.realResource, error));
			}
		}

		if (rule.resourceQuery) {
			try {
				newRule.resourceQuery = RuleSet.normalizeCondition(rule.resourceQuery);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(rule.resourceQuery, error));
			}
		}

		if (rule.compiler) {
			try {
				newRule.compiler = RuleSet.normalizeCondition(rule.compiler);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(rule.compiler, error));
			}
		}

		if (rule.issuer) {
			try {
				newRule.issuer = RuleSet.normalizeCondition(rule.issuer);
			} catch (error) {
				throw new Error(RuleSet.buildErrorMessage(rule.issuer, error));
			}
		}

		if (rule.loader && rule.loaders) {
			throw new Error(
				RuleSet.buildErrorMessage(
					rule,
					new Error(
						"Provided loader and loaders for rule (use only one of them)"
					)
				)
			);
		}

		const loader = rule.loaders || rule.loader;
		if (typeof loader === "string" && !rule.options && !rule.query) {
			checkUseSource("loader");
			newRule.use = RuleSet.normalizeUse(loader.split("!"), ident);
		} else if (typeof loader === "string" && (rule.options || rule.query)) {
			checkUseSource("loader + options/query");
			newRule.use = RuleSet.normalizeUse(
				{
					loader: loader,
					options: rule.options,
					query: rule.query
				},
				ident
			);
		} else if (loader && (rule.options || rule.query)) {
			throw new Error(
				RuleSet.buildErrorMessage(
					rule,
					new Error(
						"options/query cannot be used with loaders (use options for each array item)"
					)
				)
			);
		} else if (loader) {
			checkUseSource("loaders");
			newRule.use = RuleSet.normalizeUse(loader, ident);
		} else if (rule.options || rule.query) {
			throw new Error(
				RuleSet.buildErrorMessage(
					rule,
					new Error(
						"options/query provided without loader (use loader + options)"
					)
				)
			);
		}

		if (rule.use) {
			checkUseSource("use");
			newRule.use = RuleSet.normalizeUse(rule.use, ident);
		}

		if (rule.rules) {
			newRule.rules = RuleSet.normalizeRules(
				rule.rules,
				refs,
				`${ident}-rules`
			);
		}

		if (rule.oneOf) {
			newRule.oneOf = RuleSet.normalizeRules(
				rule.oneOf,
				refs,
				`${ident}-oneOf`
			);
		}

		const keys = Object.keys(rule).filter(key => {
			return ![
				"resource",
				"resourceQuery",
				"compiler",
				"test",
				"include",
				"exclude",
				"issuer",
				"loader",
				"options",
				"query",
				"loaders",
				"use",
				"rules",
				"oneOf"
			].includes(key);
		});
		for (const key of keys) {
			newRule[key] = rule[key];
		}

		if (Array.isArray(newRule.use)) {
			for (const item of newRule.use) {
				if (item.ident) {
					refs[item.ident] = item.options;
				}
			}
		}

		return newRule;
	}

	static buildErrorMessage(condition, error) {
		const conditionAsText = JSON.stringify(
			condition,
			(key, value) => {
				return value === undefined ? "undefined" : value;
			},
			2
		);
		return error.message + " in " + conditionAsText;
	}

	static normalizeUse(use, ident) {
		if (typeof use === "function") {
			return data => RuleSet.normalizeUse(use(data), ident);
		}
		if (Array.isArray(use)) {
			return use
				.map((item, idx) => RuleSet.normalizeUse(item, `${ident}-${idx}`))
				.reduce((arr, items) => arr.concat(items), []);
		}
		return [RuleSet.normalizeUseItem(use, ident)];
	}

	static normalizeUseItemString(useItemString) {
		const idx = useItemString.indexOf("?");
		if (idx >= 0) {
			return {
				loader: useItemString.substr(0, idx),
				options: useItemString.substr(idx + 1)
			};
		}
		return {
			loader: useItemString,
			options: undefined
		};
	}

	static normalizeUseItem(item, ident) {
		if (typeof item === "string") {
			return RuleSet.normalizeUseItemString(item);
		}

		const newItem = {};

		if (item.options && item.query) {
			throw new Error("Provided options and query in use");
		}

		if (!item.loader) {
			throw new Error("No loader specified");
		}

		newItem.options = item.options || item.query;

		if (typeof newItem.options === "object" && newItem.options) {
			if (newItem.options.ident) {
				newItem.ident = newItem.options.ident;
			} else {
				newItem.ident = ident;
			}
		}

		const keys = Object.keys(item).filter(function(key) {
			return !["options", "query"].includes(key);
		});

		for (const key of keys) {
			newItem[key] = item[key];
		}

		return newItem;
	}

	static normalizeCondition(condition) {
		if (!condition) throw new Error("Expected condition but got falsy value");
		if (typeof condition === "string") {
			return str => str.indexOf(condition) === 0;
		}
		if (typeof condition === "function") {
			return condition;
		}
		if (condition instanceof RegExp) {
			return condition.test.bind(condition);
		}
		if (Array.isArray(condition)) {
			const items = condition.map(c => RuleSet.normalizeCondition(c));
			return orMatcher(items);
		}
		if (typeof condition !== "object") {
			throw Error(
				"Unexcepted " +
					typeof condition +
					" when condition was expected (" +
					condition +
					")"
			);
		}

		const matchers = [];
		Object.keys(condition).forEach(key => {
			const value = condition[key];
			switch (key) {
				case "or":
				case "include":
				case "test":
					if (value) matchers.push(RuleSet.normalizeCondition(value));
					break;
				case "and":
					if (value) {
						const items = value.map(c => RuleSet.normalizeCondition(c));
						matchers.push(andMatcher(items));
					}
					break;
				case "not":
				case "exclude":
					if (value) {
						const matcher = RuleSet.normalizeCondition(value);
						matchers.push(notMatcher(matcher));
					}
					break;
				default:
					throw new Error("Unexcepted property " + key + " in condition");
			}
		});
		if (matchers.length === 0) {
			throw new Error("Excepted condition but got " + condition);
		}
		if (matchers.length === 1) {
			return matchers[0];
		}
		return andMatcher(matchers);
	}

	exec(data) {
		const result = [];
		this._run(
			data,
			{
				rules: this.rules
			},
			result
		);
		return result;
	}

	_run(data, rule, result) {
		// test conditions
		if (rule.resource && !data.resource) return false;
		if (rule.realResource && !data.realResource) return false;
		if (rule.resourceQuery && !data.resourceQuery) return false;
		if (rule.compiler && !data.compiler) return false;
		if (rule.issuer && !data.issuer) return false;
		if (rule.resource && !rule.resource(data.resource)) return false;
		if (rule.realResource && !rule.realResource(data.realResource))
			return false;
		if (data.issuer && rule.issuer && !rule.issuer(data.issuer)) return false;
		if (
			data.resourceQuery &&
			rule.resourceQuery &&
			!rule.resourceQuery(data.resourceQuery)
		) {
			return false;
		}
		if (data.compiler && rule.compiler && !rule.compiler(data.compiler)) {
			return false;
		}

		// apply
		const keys = Object.keys(rule).filter(key => {
			return ![
				"resource",
				"realResource",
				"resourceQuery",
				"compiler",
				"issuer",
				"rules",
				"oneOf",
				"use",
				"enforce"
			].includes(key);
		});
		for (const key of keys) {
			result.push({
				type: key,
				value: rule[key]
			});
		}

		if (rule.use) {
			const process = use => {
				if (typeof use === "function") {
					process(use(data));
				} else if (Array.isArray(use)) {
					use.forEach(process);
				} else {
					result.push({
						type: "use",
						value: use,
						enforce: rule.enforce
					});
				}
			};
			process(rule.use);
		}

		if (rule.rules) {
			for (let i = 0; i < rule.rules.length; i++) {
				this._run(data, rule.rules[i], result);
			}
		}

		if (rule.oneOf) {
			for (let i = 0; i < rule.oneOf.length; i++) {
				if (this._run(data, rule.oneOf[i], result)) break;
			}
		}

		return true;
	}

	findOptionsByIdent(ident) {
		const options = this.references[ident];
		if (!options) {
			throw new Error("Can't find options with ident '" + ident + "'");
		}
		return options;
	}
};

const id = 'vue-loader-plugin';
const NS = 'vue-loader';

class VueLoaderPlugin {
  apply (compiler) {
    // add NS marker so that the loader can detect and report missing plugin
    if (compiler.hooks) {
      // webpack 4
      compiler.hooks.compilation.tap(id, compilation => {
        compilation.hooks.normalModuleLoader.tap(id, loaderContext => {
          loaderContext[NS] = true;
        });
      });
    } else {
      // webpack < 4
      compiler.plugin('compilation', compilation => {
        compilation.plugin('normal-module-loader', loaderContext => {
          loaderContext[NS] = true;
        });
      });
    }

    // use webpack's RuleSet utility to normalize user rules
    const rawRules = compiler.options.module.rules;
    const { rules } = new RuleSet_1(rawRules);

    // find the rule that applies to vue files
    let vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue`));
    if (vueRuleIndex < 0) {
      vueRuleIndex = rawRules.findIndex(createMatcher(`foo.vue.html`));
    }
    const vueRule = rules[vueRuleIndex];

    if (!vueRule) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching rule for .vue files found.\n` +
        `Make sure there is at least one root-level rule that matches .vue or .vue.html files.`
      )
    }

    if (vueRule.oneOf) {
      throw new Error(
        `[VueLoaderPlugin Error] vue-loader 15 currently does not support vue rules with oneOf.`
      )
    }

    // get the normlized "use" for vue files
    const vueUse = vueRule.use;
    // get vue-loader options
    const vueLoaderUseIndex = vueUse.findIndex(u => {
      return /^vue-loader|(\/|\\|@)vue-loader/.test(u.loader)
    });

    if (vueLoaderUseIndex < 0) {
      throw new Error(
        `[VueLoaderPlugin Error] No matching use for vue-loader is found.\n` +
        `Make sure the rule matching .vue files include vue-loader in its use.`
      )
    }

    // make sure vue-loader options has a known ident so that we can share
    // options by reference in the template-loader by using a ref query like
    // template-loader??vue-loader-options
    const vueLoaderUse = vueUse[vueLoaderUseIndex];
    vueLoaderUse.ident = 'vue-loader-options';
    vueLoaderUse.options = vueLoaderUse.options || {};

    // for each user rule (expect the vue rule), create a cloned rule
    // that targets the corresponding language blocks in *.vue files.
    const clonedRules = rules
      .filter(r => r !== vueRule)
      .map(cloneRule);

    // global pitcher (responsible for injecting template compiler loader & CSS
    // post loader)
    const pitcher = {
      loader: commonjsRequire.resolve('./loaders/pitcher'),
      resourceQuery: query => {
        const parsed = querystring.parse(query.slice(1));
        return parsed.vue != null
      },
      options: {
        cacheDirectory: vueLoaderUse.options.cacheDirectory,
        cacheIdentifier: vueLoaderUse.options.cacheIdentifier
      }
    };

    // replace original rules
    compiler.options.module.rules = [
      pitcher,
      ...clonedRules,
      ...rules
    ];
  }
}

function createMatcher (fakeFile) {
  return (rule, i) => {
    // #1201 we need to skip the `include` check when locating the vue rule
    const clone = Object.assign({}, rule);
    delete clone.include;
    const normalized = RuleSet_1.normalizeRule(clone, {}, '');
    return (
      !rule.enforce &&
      normalized.resource &&
      normalized.resource(fakeFile)
    )
  }
}

function cloneRule (rule) {
  const { resource, resourceQuery } = rule;
  // Assuming `test` and `resourceQuery` tests are executed in series and
  // synchronously (which is true based on RuleSet's implementation), we can
  // save the current resource being matched from `test` so that we can access
  // it in `resourceQuery`. This ensures when we use the normalized rule's
  // resource check, include/exclude are matched correctly.
  let currentResource;
  const res = Object.assign({}, rule, {
    resource: {
      test: resource => {
        currentResource = resource;
        return true
      }
    },
    resourceQuery: query => {
      const parsed = querystring.parse(query.slice(1));
      if (parsed.vue == null) {
        return false
      }
      if (resource && parsed.lang == null) {
        return false
      }
      const fakeResourcePath = `${currentResource}.${parsed.lang}`;
      if (resource && !resource(fakeResourcePath)) {
        return false
      }
      if (resourceQuery && !resourceQuery(query)) {
        return false
      }
      return true
    }
  });

  if (rule.oneOf) {
    res.oneOf = rule.oneOf.map(cloneRule);
  }

  return res
}

VueLoaderPlugin.NS = NS;
var plugin = VueLoaderPlugin;

exports.apply = function (config) {
    // 添加vue-loader
    config.module
        .rule(global.__CHIRON_RULE_VUE__)
        .test(/\.vue$/)
        .include.add(global.__CHIRON_DIR_SRC__)
        .end()
        .exclude.add(/node_modules/)
        .end()
        .use(global.__CHIRON_LOADER_VUE__)
        .loader(require.resolve('vue-loader'));
    // 开发环境下, 将style-loader替换为: vue-style-loader
    config.when(config.get('mode') === 'development', config => {
        config.module
            .rule(global.__CHIRON_RULE_LESS__)
            .use(global.__CHIRON_LOADER_STYLE__)
            .loader(require.resolve('vue-style-loader'));
    });
    // 添加vue plugin
    config.plugin(global.__CHIRON_PLUGIN_VUE__).use(plugin);
    // config.merge({
    //     externals: {
    //         'vue': 'Vue',
    //     }
    // });
};
