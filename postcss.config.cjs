module.exports = {
    plugins: {
        "postcss-preset-env": {
            features: {
                "nesting-rules": false,
                "overflow-wrap-property": {
                    method: "copy"
                }
            }
        },
        "postcss-nested": {},
        "postcss-nested-ancestors": {},
        "postcss-pxtorem": {}
    }
};
