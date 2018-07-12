const path = require('path');
const URLS = {
	ENTRY: path.join(__dirname, 'build/admin', 'index.js'),
	OUTPUT: path.join(__dirname, 'build/admin'),
	
	CSS: '[name].main.css',
	SCSS: '[name].scss.css',
	JS: 'main.bundle.js',
	
	SRC: path.join(__dirname, 'admin/public'),
	//JS: path.join(__dirname, 'admin/src'),
	ADMIN: path.join(__dirname, 'admin'),
};
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const extractCSS = new ExtractTextPlugin('[name].main.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.join(__dirname, 'build/admin');
const ADMIN_DIR = path.join(__dirname, 'admin');

console.log('BUILD_DIR', BUILD_DIR);
console.log('ADMIN_DIR', ADMIN_DIR);

module.exports = (env = {}) => {
	return {
		entry: 'admin/index.js',
		output: {
			path: BUILD_DIR,
			filename: 'main.bundle.js',
			//publicPath: ''
		},
		devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			historyApiFallback: true,
			contentBase: BUILD_DIR,
			//publicPath: '',
			port: 3000,
			compress: true,
			hot: true,
			open: true
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|build|theme)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['react', 'env']
						}
					}
				},
				{
					test: /\.(json)$/,
					exclude: /(node_modules|build|theme)/,
					use: {
						loader: 'json-loader',
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
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
			new webpack.NamedModulesPlugin(),
			extractCSS,
			extractSCSS,
			new HtmlWebpackPlugin({ inject: true, template: './admin/public/index.html' }),
			new CopyWebpackPlugin([{from: './admin/public/assets/img', to: 'assets/img'}], {copyUnmodified: false})
		],
		/*target: 'node',
		node: {
			console: true,
		},*/
		resolve: {
			extensions: ['.js', '.jsx'],
			modules: [__dirname, 'node_modules']
		},
		//externals: [nodeExternals()]
	}
};