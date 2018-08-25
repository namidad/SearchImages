var path = require("path");
module.exports = {
    entry: ["whatwg-fetch","./js/projekt.jsx"],
    output: {filename: "out.js", path: path.resolve(__dirname) + '/js'},
    watch: true,
    mode: "development",
    module: {
        rules: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }
        }
        ]
    },
};