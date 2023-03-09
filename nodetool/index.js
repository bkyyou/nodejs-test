#!/usr/bin/env node
import inquirer from "inquirer";
import downgit from "download-git-repo";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { Command } from "commander";

// progress 包的使用
// const pro = new progress('下载中', {total: 10})
// setTimeout(() => {
//   pro.tick()
// }, 1000);

// commander 的原理
// if (process.argv[2] === '-v') {
//   console.log(1.0);
//   process.exit();
// }

const program = new Command();
// <> 表示必传  [] 表示选填
program.option("-a <num>", "测试指令", (num) => {
  console.log("u use -a and input" + num);
});
program.command("init <name>").action(name => {
  console.log(name);
  create();
})
program.version("1.0.0");
program.parse(process.argv);

function create() {
  // type: input, list, checkbox, confirm rawlist editor
  inquirer
    .prompt([
      {
        type: "input",
        message: "项目叫什么名字",
        // 键名
        name: "projectName",
      },
      {
        type: "list",
        message: "选择vue/react",
        // 键名
        name: "projectType",
        choices: ["vue", "react"],
      },
      {
        type: "checkbox",
        message: "选择功能",
        // 键名
        name: "projectFeature",
        choices: ["babel", "webpack", "router"],
      },
      {
        type: "comfirm",
        message: "是否生成",
        // 键名
        name: "render",
      },
    ])
    .then((res) => {
      console.log(res);
      const spiner = ora("下载中").start();
      const { projectType, projectName } = res;
      const _outputDir = path.resolve(process.cwd(), projectName);
      let _target = "facebook/react";
      if (projectType === "vue") {
        _target = "vuejs/vue";
      }
      fs.mkdirSync(_outputDir);
      downgit("github:" + _target, _outputDir, {}, (err, res) => {
        if (err) throw err;
        console.log(chalk.green("下载成功"));
        spiner.stop();
        // console.log(chalk.rgb(43, 56, 199)('下载成功'));
        // console.log(chalk.hex('#df13ef')('下载成功'));
      });
    });
}
