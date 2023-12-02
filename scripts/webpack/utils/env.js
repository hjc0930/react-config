// 需要注入到页面的变量名前缀
const PROJECT_ENV_PREFIX_REG = "REACT_APP_";

module.exports = {
  // "import.meta.glob": () => {
  //   console.log("1232");
  // },
  "import.meta.env": Object.entries(process.env)
    .filter(([key]) => key.includes(PROJECT_ENV_PREFIX_REG))
    .reduce(
      (prev, [key, value]) => ({ ...prev, [key]: JSON.stringify(value) }),
      {}
    ),
};
