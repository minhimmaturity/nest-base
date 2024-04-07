/* eslint-disable @typescript-eslint/no-var-requires */
const { CaseConverterEnum, generateTemplateFilesCommandLine } = require('generate-template-files');

generateTemplateFilesCommandLine([
  {
    option: 'create-nestjs-module',
    defaultCase: CaseConverterEnum.PascalCase,
    entry: { folderPath: './templates/module/' },
    stringReplacers: ['__module__', '__ts__'],
    output: {
      path: './src/modules/__module__(kebabCase)',
      pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
      overwrite: true,
    },
  },
]);
