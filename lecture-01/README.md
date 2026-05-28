# ლექცია 01: TypeScript-ის დაყენება და კონფიგურაცია

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📋 შინაარსი

| # | თემა |
|---|------|
| 01 | [რა არის TypeScript?](./presentation.md#სლაიდი-1-რა-არის-typescript) |
| 02 | [Playground](./presentation.md#სლაიდი-2-სცადე-typescript-ბრაუზერშივე--playground) |
| 03 | [Node.js / npm ინსტალაცია](./presentation.md#სლაიდი-3-nodejs-და-npm-ის-ინსტალაცია) |
| 04 | [TypeScript-ის ინსტალაცია](./presentation.md#სლაიდი-4-typescript-ის-ინსტალაცია) |
| 05 | [tsconfig.json](./presentation.md#სლაიდი-5-tsconfigjson--კონფიგურაცია) |
| 06 | [პროექტის სტრუქტურა](./presentation.md#სლაიდი-6-პროექტის-სტრუქტურა) |
| 07 | [პირველი TypeScript კოდი](./presentation.md#სლაიდი-7-პირველი-typescript-კოდი) |
| 08 | [HTML ინტეგრაცია](./presentation.md#სლაიდი-8-html-თან-ინტეგრაცია) |
| 09 | [Watch რეჟიმი](./presentation.md#სლაიდი-9-watch-რეჟიმი) |
| 10 | [npm Scripts](./presentation.md#სლაიდი-10-npm-scripts) |
| 11 | [strict რეჟიმი](./presentation.md#სლაიდი-11-strict-რეჟიმი) |
| 12 | [exclude / include](./presentation.md#სლაიდი-12-exclude--include) |

---

## 🎯 სასწავლო მიზნები

- გავიგოთ რა არის TypeScript და რატომ გამოვიყენოთ
- დავაყენოთ TypeScript გარემო (Node.js, npm, TypeScript compiler)
- გავეცნოთ `tsconfig.json` კონფიგურაციას
- ავაწყოთ პირველი TypeScript პროექტი
- ვისწავლოთ კომპილაცია (`tsc`), watch რეჟიმი (`tsc -w`) და npm scripts

---

## 🗂️ პროექტის სტრუქტურა

```
lecture-01/
├── src/                        # TypeScript წყაროს კოდი
├── dist/                       # კომპილირებული JavaScript
├── presentation.md             # სალექციო მასალა
├── classwork.md                # საკლასო სამუშაო
├── homework.md                 # საშინაო დავალება
├── all-available-types.md      # TypeScript-ის ტიპების ცნობარი
├── 01_typescript.html          # HTML ინტეგრაციის მაგალითი
├── tsconfig.json               # TypeScript კონფიგურაცია
└── package.json                # npm კონფიგურაცია
```

---

## 🚀 სწრაფი დაწყება

```bash
# 1. ინსტალაცია
npm install

# 2. კომპილაცია
npm run build

# 3. გაშვება
npm run start
```

---

## 📚 მასალები

| ფაილი | აღწერა |
|--------|---------|
| [`presentation.md`](./presentation.md) | სრული სალექციო მასალა სლაიდებად |
| [`classwork.md`](./classwork.md) | საკლასო სამუშაოს ინსტრუქცია |
| [`homework.md`](./homework.md) | საშინაო დავალება |
| [`all-available-types.md`](./all-available-types.md) | TypeScript-ის ყველა ტიპის ცნობარი |
| [`01_typescript.html`](./01_typescript.html) | TypeScript + HTML ინტეგრაციის დემო |

---

## 🔗 რესურსები

- [TypeScript Playground](https://www.typescriptlang.org/play/)
- [PlayCode.io TypeScript](https://playcode.io/typescript)
- [TypeScript ოფიციალური დოკუმენტაცია](https://www.typescriptlang.org/docs/)

**პრეზენტაციები:**

| ენა | ბმული |
|-----|-------|
| 🇬🇧 English | [SharePoint Presentation](https://emis188-my.sharepoint.com/:p:/g/personal/kimadze_amiran_college_gov_ge/IQA1qXn5DzswSo443EWUfSWsAZTHtVmGoTFzoIUuWxxhCjc?e=dxYEcD) |
| 🇬🇪 ქართული | [Google Slides](https://docs.google.com/presentation/d/1ZJQOsNmdWgcx1y0jwUhHZa1X8tiQ8k1bJMaeJK-uXPQ/edit?usp=sharing) |
