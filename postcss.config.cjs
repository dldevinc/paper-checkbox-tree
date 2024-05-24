module.exports = {
    plugins: {
        "postcss-advanced-variables": {
            disable: "@import"
        },
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
