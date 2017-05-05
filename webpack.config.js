'use strict';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./server/config.js');

const PROD_BUILD = process.env.NODE_ENV === 'production';

let webpackConfig = {
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		filename: 'bundle.js',
		historyApiFallback: true,
		hot: true,
		publicPath: '/assets/'
	},
	devtool: 'cheap-source-map',
	entry: ['babel-polyfill','whatwg-fetch','./client/client.js'],
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel',
			include: [
				path.resolve(__dirname, 'client'),
				path.resolve(__dirname, 'test', 'unit', 'helpers'),
				path.resolve(__dirname, 'test', 'unit', 'spec'),
			],
			query: {
				// See http://stackoverflow.com/a/34574630
				presets: ['babel-preset-es2015', 'babel-preset-react'].map(require.resolve),
				plugins: ['istanbul', 'transform-decorators-legacy', 'transform-class-properties']
			}
		}, {
			test: /\.less$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
		}, {
			test: /\.(json|\/package)$/,
			loader: 'json'
		}, {
			test: /\.(woff2?|ttf|eot|svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'url-loader?limit=10000&name=[path][name].[ext]?[hash]'
		}, {
			test: /\.module.css$/,
			loader: ExtractTextPlugin.extract("style-loader",
				"css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader")
		}]
	},
	output: {
		path: path.resolve(__dirname, 'public/assets'),
		publicPath: '/assets/',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: true,
			filename: path.resolve(__dirname, 'public', 'index.html'),
			template: path.resolve(__dirname, 'client', 'index.html')
		}),
		new ExtractTextPlugin('style.css', {
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify({
				NODE_ENV: JSON.stringify(process.env.NODE_ENV) || "development",
				BROWSER: true
			}),
			SiteInfo: JSON.stringify(config.site_info)
		}),
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
			Intl: 'imports?this=>global!exports?global.Intl!intl'
		}),
		// this shenanigans is required for tests to run beause of a glitch in
		// the cheerio component, see https://github.com/airbnb/enzyme/issues/286
		new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
			if(/cheerio/.test(result.context)) {
				result.request = "./package.json"
			}
		}),
		new webpack.IgnorePlugin(/react\/addons/),
		new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
		new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/),
		new webpack.EnvironmentPlugin(["NODE_ENV"])
		// </shenanigans>
	],
	postcss: [
		autoprefixer({ browsers: ["last 2 versions"] })
	],
	resolve: {
		extensions: ['', '.js', '.jsx'],
		fallback: path.join(__dirname, 'node_modules'),
		alias: {
			webworkify: "webworkify-webpack-dropin"
		}
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};

if (!PROD_BUILD) {
  webpackConfig.devtool = 'inline-source-map';
}

module.exports = webpackConfig;
