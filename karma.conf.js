const webpackConfig = require('./webpack.config');

// webpackConfig.target = 'node';

module.exports = function _webpackConfig(config) {
	config.set({
		browserNoActivityTimeout: 60000,
		browserDisconnectTolerance: 2,
		browsers: ['PhantomJS'],
		concurrency: 1,
		coverageReporter: {
			dir: 'test/results/coverage',
			reporters: [{
				type: 'html'
			}],
			includeAllSources: true
		},
		customLaunchers: {
			ChromeIgnoreCertErrors: {
				base: 'Chrome',
				flags: ['--ignore-certificate-errors']
			}
		},
		files: [
			'node_modules/babel-polyfill/dist/polyfill.js',
			'test/unit/helpers/karmaInject.js',
			'test/unit/testsIndex.js'
		],
		frameworks: [
			'jasmine'
		],
		htmlReporter: {
			outputDir: 'test/results/spec'
		},
		junitReporter: {
      outputDir: 'test/results/junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'results.xml' // if included, results will be saved as $outputDir/$browserName/$outputFile
    },
		preprocessors: {
			// 'client/**/*.js': ['webpack', 'coverage'],
			'test/unit/testsIndex.js': ['webpack', 'sourcemap']
		},
		reporters: [
			'progress',
			// 'coverage-allsources',
			'coverage',
			'html',
			'spec'
		],
		singleRun: true,
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: 'errors-only',
			stats: {
				chunks: false
			}
		}
	});
};
