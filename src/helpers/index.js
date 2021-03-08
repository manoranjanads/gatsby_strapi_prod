module.exports.toKebabCase = function(value) {
    return value.replace(new RegExp('(\\s|_|-)+', 'gmi'), '-');
};

module.exports.titleToPath = function({ basePath = '/', title = '' }) {
    const uniqueSlug = `${title.replace(/\s/gi, '_')}`;
    return `${basePath}/${uniqueSlug}`;
};
