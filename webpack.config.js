const path = require('path');
const URLS = {
	ENTRY: path.resolve(__dirname, 'build/admin', 'index.js'),
	OUTPUT: path.resolve(__dirname, 'build/admin'),
	
	CSS: '[name].main.css',
	SCSS: '[name].scss.css',
	JS: 'main.bundle.js',
	
	SRC: path.resolve(__dirname, 'admin/public'),
	//JS: path.resolve(__dirname, 'admin/src'),
	ADMIN: path.resolve(__dirname, 'admin'),
};
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
//const CopyWebpackPlugin = require('copy-webpack-plugin'); todo: update to webpackv4

const extractCSS = new ExtractTextPlugin('[name].main.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'build/admin');
const ADMIN_DIR = path.resolve(__dirname, 'admin');

console.log('BUILD_DIR', BUILD_DIR);
console.log('ADMIN_DIR', ADMIN_DIR);

module.exports = (env = {}) => {
	return {
		mode: 'development',
		
		entry: path.resolve(BUILD_DIR, 'index.js'),
		output: {
			path: BUILD_DIR,
			filename: 'main.bundle.js',
			//publicPath: './admin'
		},
		
		// watch: true,
		/*
		devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			historyApiFallback: true,
			contentBase: BUILD_DIR,
			//publicPath: './admin',
			port: 3000,
			compress: true,
			hot: true,
			open: true
		},*/
		module: {
			rules: [
				{
					test: /\.(js|jsx|json)$/,
					exclude: /(node_modules|build|theme)/,
					
					use: {
						loader: 'babel-loader',
						options: {
							///cacheDirectory: true,
							presets: ['react', 'env']
						}
					}
				},
				{
					test: /\.html$/,
					loader: 'html-loader',
				},
				{
					test: /\.(scss)$/,
					use: ['css-hot-loader'].concat(extractSCSS.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {alias: {'./img': './admin/public/assets/img'}}
							},
							{
								loader: 'sass-loader'
							}
						]
					}))
				},
				{
					test: /\.css$/,
					use: extractCSS.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				},
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							// loader: 'url-loader'
							loader: 'file-loader',
							options: {
								name: './img/[name].[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
					options: {
						name: './fonts/[name].[hash].[ext]'
					}
				}
			]
		},
		//target: 'node',
		resolve: {
			extensions: ['.js', '.jsx', '.json'],
			/*plugins: [
				new DirectoryNamedWebpackPlugin()
			],*/
			//aliasFields: ['main', 'browser', 'module'],
			modules: [__dirname, 'node_modules']
		},
		plugins: [
			new DirectoryNamedWebpackPlugin(true),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			extractCSS,
			extractSCSS,
			new HtmlWebpackPlugin({
				inject: true,
				template: './admin/public/index.html'
			})/*,
			new CopyWebpackPlugin([
					{from: './admin/public/assets/img', to: 'assets/img'}
				],
				{copyUnmodified: false}
			)*/
		],
		optimization: {
			//nodeEnv: 'development',
			minimize: true,
		}
	}
};