#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// API link
let apiLink = "https://v6.exchangerate-api.com/v6/cb322d40e910080335c234a0/latest/PKR";
// fetching data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
// obj to array
let countries = Object.keys(data);
//user input first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "converting from",
    choices: countries,
});
// first  country amount
let userMoney = await inquirer.prompt({
    type: "number",
    name: "amount",
    message: `please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}`,
});
// converting to country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "converting to",
    choices: countries,
});
// conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/cb322d40e910080335c234a0/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let cnvRate = await cnvData(cnv);
let convertedRate = userMoney.amount * cnvRate;
console.log(`your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.amount)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
