const msgPath = process.env.GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const releaseRE = /^v\d/;
const commitRE =
  /^(revert: )?(feat|fix|docs|refactor|perf|test|style|build|ci|revert|chore)(\(.+\))?: .{1,50}/;

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log();
  console.error(`
  [ERROR] 错误的提交信息格式\n
  输入信息不能为空且不能超过50字\n
  type 格式说明：\n
    ○ feat：新功能\n
    ○ fix：修补 bug\n
    ○ docs：文档更改\n
    ○ style：不影响代码含义的更改\n
    ○ refactor：代码重构\n
    ○ perf：优化相关，比如提升性能、体验\n
    ○ test：测试用例相关修改\n
    ○ build：编译相关的修改，例如发布版本、对项目构建或者依赖的改动\n
    ○ ci：持续集成修改\n
    ○ revert：回滚到上一个版本\n
    ○ chore：其他修改, 比如改变构建流程、或者增加依赖库、工具等\n
  `);
  process.exit(1);
}