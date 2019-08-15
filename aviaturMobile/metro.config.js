/**
 * Metro configuration for AVIATUR Mobile
 * https://github.com/yarednicolas23/apps-agencies/
 *
 * @author yarednicolas23
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
