import { useState } from "react";

interface UserType {
  name: string,
  age: number,
  city: string
}

interface SingleLang{
  name:string,
  age: string,
  city: string
}

interface TranslationsType{
  en: SingleLang,
  ge: SingleLang
}

const translations:TranslationsType = {
  en: {
    name: "Name",
    age: "Age",
    city: "City"
  },
  ge: {
    name: "სახელი",
    age: "ასაკი",
    city: "ქალაქი"
  }
}

let currentLanguage: keyof TranslationsType = 'ge';

function getWord(key: keyof SingleLang){
  return translations[currentLanguage][key];
}

const user: UserType = { name: "გიორგი", age: 25, city: "თბილისი" };

function App() {
  return <div>
    <h1>მომხარებელი</h1>
    <div>
      <strong> { getWord('name') }: {user.name}</strong>
    </div>
    <div>
      <strong> { getWord('age') }: {user.age}</strong>
    </div>
    <div>
      <strong> { getWord('city') }: {user.city}</strong>
    </div>
  </div>
}

export default App
