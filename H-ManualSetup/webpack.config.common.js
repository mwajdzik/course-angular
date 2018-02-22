var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app/main.ts',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {test: /\.html/, loader: ['html-loader']},
            {test: /\.css/, loader: ['raw-loader']}
        ],
        exprContextCritical: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};