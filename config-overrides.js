const { override, fixBabelImports,addLessLoader,addDecoratorsLegacy} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': 'orange' },
        }
    }),
    //这里是让react支持装饰器语法的
    addDecoratorsLegacy()
);