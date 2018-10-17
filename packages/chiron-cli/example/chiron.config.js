const AliyunOSSPlugin = require('aliyun-oss-webpack-plugin');
const { name, version } = require('./package.json');

module.exports = {
  webpack(config) {
    // config.when(config.get('mode') === 'production', config => {
    //   config.output.publicPath(`https://statics.wosaimg.com/${name}/${version}/`);
    //   config.plugin('aliyun-oss').use(AliyunOSSPlugin, [
    //     {
    //       region: 'oss-cn-hangzhou',
    //       accessKeyId: '***',
    //       accessKeySecret: '***',
    //       bucket: '***',
    //     },
    //   ]);
    // });
  },
};
