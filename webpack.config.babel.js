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
