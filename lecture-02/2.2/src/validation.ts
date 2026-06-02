import { RegistrationFormData, RegistrationFormErrors } from "./interfaces";

export function validateRegistrationForm(data: RegistrationFormData): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (data.fullName.trim().length < 2) {
    errors.fullName = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "გთხოვთ შეიყვანოთ valid ელ-ფოსტა";
  }

  if (data.password.length < 6) {
    errors.password = "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "პაროლები არ ემთხვევა ერთმანეთს";
  }

  if (isNaN(data.age) || data.age < 18 || data.age > 120) {
    errors.age = "ასაკი უნდა იყოს 18-120 წლის ფარგლებში";
  }

  if (!data.country) {
    errors.country = "გთხოვთ აირჩიოთ ქვეყანა";
  }

  if (!data.agree) {
    errors.agree = "თანხმობა სავალდებულოა";
  }

  return errors;
}
