# ლექცია 03: საშინაო დავალება

## ამოცანა: Student Management System

შექმენით სტუდენტების მართვის მარტივი სისტემა TypeScript-ში.

### 1. Enums

```ts
// 1.1. Faculty — ფაკულტეტი (String Enum)
// მაგ: IT = "საინფორმაციო ტექნოლოგიები", Business = "ბიზნესი", Design = "დიზაინი"

// 1.2. StudyYear — კურსი (Numeric Enum)
// მაგ: First = 1, Second, Third, Fourth

// 1.3. GradeType — ქულის ტიპი (String Enum)
// მაგ: Exam = "გამოცდა", Assignment = "დავალება", Project = "პროექტი"
```

### 2. Tuples

```ts
// 2.1. Grade — Tuple: [subject: string, grade: number, gradeType: GradeType]
// 2.2. ContactInfo — Tuple: [email: string, phone: string]
```

### 3. Object Types

```ts
// 3.1. Student (Object Type):
// - id: number
// - firstName: string
// - lastName: string
// - age: number
// - faculty: Faculty
// - studyYear: StudyYear
// - contact: ContactInfo (tuple)
// - grades: Grade[] (tuple-ების მასივი)
// - isActive: boolean
// - address?: string (optional)
```

### 4. Data

```ts
// შექმენით სამი სტუდენტი:

const student1 = {
  id: 1,
  firstName: "მარიამ",
  lastName: "ჭელიძე",
  age: 21,
  faculty: Faculty.IT,
  studyYear: StudyYear.Third,
  contact: ["mariam@mail.com", "555-123456"],
  grades: [
    ["მათემატიკა", 92, GradeType.Exam],
    ["პროგრამირება", 88, GradeType.Assignment],
    ["მონაცემთა ბაზები", 95, GradeType.Project],
  ] as [string, number, GradeType][],
  isActive: true,
  address: "ჭავჭავაძე 15",
};

// ... კიდევ ორი სტუდენტი
```

### 5. Functions

```ts
// 5.1. ფუნქცია, რომელიც ითვლის სტუდენტის საშუალო ქულას
function calculateAverage(student: {
  grades: [string, number, GradeType][];
}): number {
  const sum = student.grades.reduce((total, [, grade]) => total + grade, 0);
  return sum / student.grades.length;
}

// 5.2. ფუნქცია, რომელიც აბრუნებს სტუდენტის სრულ სახელს
function getFullName(student: {
  firstName: string;
  lastName: string;
}): string {
  return `${student.lastName} ${student.firstName}`;
}

// 5.3. ფუნქცია, რომელიც ბეჭდავს სტუდენტის მონაცემებს
function printStudentInfo(student: Student): void {
  console.log(`სახელი: ${getFullName(student)}`);
  console.log(`ფაკულტეტი: ${student.faculty}`);
  console.log(`საშუალო ქულა: ${calculateAverage(student).toFixed(2)}`);
}
```

### 6. Filtering

```ts
// 6.1. გაფილტრეთ მხოლოდ აქტიური სტუდენტები
// 6.2. იპოვეთ სტუდენტი ID-ით
// 6.3. გაფილტრეთ ფაკულტეტის მიხედვით
```

## ჩაბარების პირობები

1. გამოყენებულია Enum (numeric, string) — მინიმუმ 2
2. გამოყენებულია Tuple — მინიმუმ 1
3. Object Types — მინიმუმ 2-3
4. Optional property — მინიმუმ 1
5. კოდი წარმატებით კომპილირდება
