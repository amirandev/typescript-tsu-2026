# საშინაო დავალება — ლექცია 09

## ვალიდაციის სისტემა Type Guards-ით

შექმენით ფაილი `homework-09.ts` — ვალიდაციის სისტემა custom type guards-ით.

### მოცემული ტიპები

```ts
type ValidationType = "string" | "number" | "email" | "phone" | "url";

interface ValidationRule {
  type: ValidationType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

interface ValidationError {
  field: string;
  rule: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  data: Record<string, unknown>;
}
```

### დავალება 1: Primitive Type Guards

```ts
function isString(value: unknown): value is string {
  // TODO: typeof value === "string"
}

function isNumber(value: unknown): value is number {
  // TODO: typeof value === "number" && !isNaN(value)
}

function isBoolean(value: unknown): value is boolean {
  // TODO
}
```

### დავალება 2: Specific Type Guards

```ts
function isValidEmail(value: unknown): value is string {
  // TODO: isString + შეიცავს @
}

function isValidPhone(value: unknown): value is string {
  // TODO: isString + +995 ან 5XX ფორმატი
  // ნიმუში: /^(\+995|0)?5\d{8}$/
}

function isValidUrl(value: unknown): value is string {
  // TODO: isString + იწყება http:// ან https://
}
```

### დავალება 3: Validator

```ts
function validateField(
  fieldName: string,
  value: unknown,
  rules: ValidationRule
): ValidationError[] {
  const errors: ValidationError[] = [];

  // 1. required შემოწმება
  if (rules.required && (value === null || value === undefined || value === "")) {
    errors.push({
      field: fieldName,
      rule: "required",
      message: `${fieldName} სავალდებულოა`,
    });
    return errors;
  }

  // 2. ტიპის მიხედვით ვალიდაცია
  switch (rules.type) {
    case "string":
      if (!isString(value)) {
        errors.push({ field: fieldName, rule: "type", message: `უნდა იყოს სტრიქონი` });
      } else {
        if (rules.minLength && value.length < rules.minLength) {
          errors.push({ field: fieldName, rule: "minLength", message: `მინიმუმ ${rules.minLength} სიმბოლო` });
        }
        if (rules.maxLength && value.length > rules.maxLength) {
          errors.push({ field: fieldName, rule: "maxLength", message: `მაქსიმუმ ${rules.maxLength} სიმბოლო` });
        }
      }
      break;
    // TODO: number, email, phone, url
  }

  return errors;
}
```

### დავალება 4: Schema Validator

```ts
interface ValidationSchema {
  [field: string]: ValidationRule[];
}

const userSchema: ValidationSchema = {
  name: [
    { type: "string", required: true, minLength: 2, maxLength: 50 },
  ],
  email: [
    { type: "email", required: true },
  ],
  age: [
    { type: "number", required: true, min: 18, max: 120 },
  ],
  phone: [
    { type: "phone", required: false },
  ],
  website: [
    { type: "url", required: false },
  ],
};

function validateObject<T extends Record<string, unknown>>(
  obj: T,
  schema: ValidationSchema
): ValidationResult {
  // TODO: გაიარეთ schema-ს ყველა ველი
  // თითოეულისთვის გამოიძახეთ validateField
  // დააბრუნეთ ValidationResult
}
```

### დავალება 5: Test Data

```ts
const testUser = {
  name: "გიორგი",
  email: "giorgi@mail.com",
  age: 25,
  phone: "595123456",
  website: "https://giorgi.ge",
};

const invalidUser = {
  name: "ა",
  email: "არასწორი-იმეილი",
  age: 15,
  phone: "12345",
  website: "არასწორი-url",
};

// გამოიყენეთ validateObject ორივე შემთხვევისთვის
```

### Bonus: Nested Object Validation

```ts
interface AddressRule {
  street: ValidationRule[];
  city: ValidationRule[];
  zipCode: ValidationRule[];
}

const addressSchema: ValidationSchema = {
  street: [{ type: "string", required: true }],
  city: [{ type: "string", required: true }],
  zipCode: [{ type: "string", required: true, pattern: /^\d{4}$/ }],
};

// გააფართოვეთ validateObject nested ობიექტების მხარდასაჭერად
```

### Bonus: Form State Management

```ts
interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, ValidationError[]>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

class FormManager {
  private state: FormState;
  private schema: ValidationSchema;

  constructor(schema: ValidationSchema) {
    this.schema = schema;
    this.state = {
      values: {},
      errors: {},
      touched: {},
      isValid: false,
      isSubmitting: false,
    };
  }

  setField(fieldName: string, value: unknown): void {
    // TODO: განაახლეთ state
  }

  validate(): boolean {
    // TODO: დაავალიდეთ ყველა ველი
    return false;
  }

  getFieldError(fieldName: string): ValidationError[] | undefined {
    // TODO
  }

  isFieldTouched(fieldName: string): boolean {
    // TODO
  }
}
```
