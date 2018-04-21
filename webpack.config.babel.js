import webpack from 'webpack';
import path from 'path';


module.exports = {
	context: path.join(__dirname, 'src'),
	entry: [
		'react-hot-loader/patch',
		'./index.jsx',
		'./assets/scss/style.scss',
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
				}, {
					loader: 'sass-loader',
				}],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [{
					loader: 'file-loader',
				}],
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			$fonts: path.resolve(__dirname, 'src/assets/fonts'),
			$img: path.resolve(__dirname, 'src/assets/img'),
			$scss: path.resolve(__dirname, 'src/assets/scss'),

			$components: path.resolve(__dirname, 'src/components'),
			$actions: path.resolve(__dirname, 'src/actions'),
			$reducers: path.resolve(__dirname, 'src/reducers'),
			$constants: path.resolve(__dirname, 'src/constants'),
			$store: path.resolve(__dirname, 'src/store'),

			$utils: path.resolve(__dirname, 'src/utils'),
			$config: path.resolve(__dirname, 'src/config'),
		},
	},
	output: {
		path: path.join(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: './src',
		hot: true,
	},
};
