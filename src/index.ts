/*
 * functions
 */
// Q1.1)Define a function convertTemperature that takes a parameter celsius (number) and converts it to Fahrenheit. The function should return a string like "[celsius]°C is [fahrenheit]°F."

const convertTemperature = (temp: number): string => {
  const fahrenheit = (temp * 9) / 5 + 32;
  return `${temp}°C is ${fahrenheit.toFixed(2)}°F`;
};

console.log(convertTemperature(5));

// Q1.2)Create a function named factorial that takes a parameter n (number) and returns the factorial of n (i.e., the product of all positive integers up to n).

const factorial = (num: number): number => {
  if (num === 1) return 1;
  return num * factorial(num - 1);
};

console.log(factorial(3));

/*
 * function with two inputs
 */
// Q2.1)Define a function named power that takes two parameters base (number) and exponent (number), and calculates and returns base raised to the power of exponent.
const power = (base: number, exponent: number): number => {
  return base ** exponent;
};
console.log(power(2, 2));

// Q2.2)Create a function named gcd that takes two parameters a (number) and b (number), and returns their greatest common divisor (GCD).

const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
};

console.log(gcd(98, 56));

/*
 *  function with three inputs and return value
 */
// Q3.1) Create a function calculateBMI that takes three parameters: weight (number in kilograms), height (number in meters), and unit (string, either "metric" or "imperial").

// The function should calculate and return the BMI (Body Mass Index) based on the given parameters.

// For the metric system, the formula is weight / height^2. For the imperial system, the formula is (weight * 703) / height^2.
interface calculateBMIProp {
  (weight: number, height: number, unit: "metric" | "imperial"): number;
}
const calculateBMI: calculateBMIProp = (weight, height, unit) => {
  switch (unit) {
    case "metric": {
      return height / height ** 2;
    }
    case "imperial": {
      return (weight * 703) / height ** 2;
    }
  }
};
console.log(calculateBMI(2, 5, "metric"));
console.log(calculateBMI(2, 5, "imperial"));

// Q3.2) Define a function calculateHypotenuse that takes three parameters: a (number), b (number), and unit (string, either "cm" or "in").

// The function should calculate and return the length of the hypotenuse of a right triangle using the Pythagorean theorem.

// For the metric system - cm, the formula is √(a^2 + b^2).

// For the imperial system - in, the formula is √((a * inchToCm)^2 + (b * inchToCm)^2), where inchToCm is 2.54.

interface calculateHypotenuseProp {
  (a: number, b: number, unit: "cm" | "in"): number;
}
const calculateHypotenuse: calculateHypotenuseProp = (a, b, unit) => {
  switch (unit) {
    case "cm": {
      return Math.sqrt(a ** 2 + b ** 2);
    }
    case "in": {
      return Math.sqrt((a * 2.54) ** 2 + (b * 2.54) ** 2);
    }
  }
};
console.log(calculateHypotenuse(2, 3, "cm"));
console.log(calculateHypotenuse(2, 3, "in"));

/*
 *  function with union types
 */
// Q4.1)Create a function named printArrayOrString that takes a parameter data which can be either an array of strings or a single string. The function should console log the string if it's not an array or each element of the array.

type printArrayOrStringType = {
  (data: string | string[]): void;
};

const printArrayOrString: printArrayOrStringType = (data) => {
  if (Array.isArray(data)) {
    data.forEach((str) => console.log({ str }));
  } else {
    console.log({ data });
  }
};

printArrayOrString("anand");
printArrayOrString(["hey", "hey1", "hey2"]);

// Q4.2) You are working on a vehicle information system. Define a function printVehicleInfo that takes a parameter of type Car | Bike where Car and Bike are objects representing a car and a bike respectively. The function should log information about the vehicle, including its model and year.

// You are provided with the following types:
// 1.Car: Represents a car with a model and a year.
// 2.Bike: Represents a bike with a model and a year.

// Implement the function printVehicleInfo that takes a vehicle as a parameter and logs its model and year. Additionally, if the vehicle is a car, it should log "Type: Car". If the vehicle is a bike, it should log "Type: Bike".
type CarType = {
  Type: "Car";
  Model: string;
  Year: number;
};
type BikeType = {
  Type: "Bike";
  Model: string;
  Year: number;
};

type VehicleType = CarType | BikeType;
const printVehicleInfo = (data: VehicleType) => {
  console.log(`Model: ${data.Model}`);
  console.log(`Year: ${data.Year}`);
  console.log(`Type: ${data.Type}`);
};

printVehicleInfo({ Type: "Car", Model: "Toyota Camry", Year: 2022 });
printVehicleInfo({ Type: "Bike", Model: "Mountain Bike", Year: 2021 });

/*
 * function with discriminated unions
 */
// Q5.1) You are given a variety of products, each with its own type and price. Your task is to create a function calculateTotalPrice that calculates the total price of all the products combined.

// You are provided with the following product types:

// 1.Book: A book with a title and a price.
// 2.Electronic: An electronic item with a name and a price.
// 3.Clothing: A clothing item with a description and a price.

// You need to define a function calculateTotalPrice that takes an array of Product objects and calculates the total price by summing up the prices of all products.
type Book = {
  type: "book";
  title: string;
  price: number;
};

type Electronic = {
  type: "electronic";
  name: string;
  price: number;
};

type Clothing = {
  type: "clothing";
  item: string;
  price: number;
};

type Product = Book | Electronic | Clothing;

interface CalculateTotalPrice {
  (products: Product[]): number;
}
const calculateTotalPrice: CalculateTotalPrice = (products) => {
  return products.reduce((acc, curr) => acc + curr.price, 0);
};

const products: Product[] = [
  { type: "book", title: "The Great Gatsby", price: 10 },
  { type: "electronic", name: "Smartphone", price: 500 },
  { type: "clothing", item: "T-shirt", price: 20 }
];

console.log(calculateTotalPrice(products));

// Q5.2) You are given a list of transactions, each representing a financial transaction with a type and an amount. Write a function calculateBalance that calculates the account balance after processing all the transactions.

// You are provided with the following transaction types:

// 1.Deposit: Represents a deposit with a positive amount.
// 2.Withdrawal: Represents a withdrawal with a negative amount.

// Implement the function calculateBalance that takes an array of transactions and returns the account balance after processing all the transactions.

type Withdrawal = {
  type: "withdrawal";
  amount: number;
};

type Deposit = {
  type: "deposit";
  amount: number;
};

type Transaction = Withdrawal | Deposit;
const transactions: Transaction[] = [
  { type: "deposit", amount: 100 },
  { type: "withdrawal", amount: 50 },
  { type: "deposit", amount: 200 },
  { type: "withdrawal", amount: 30 }
];

interface CalculateBalance {
  (transactions: Transaction[]): number;
}
const calculateBalance: CalculateBalance = (transactions) => {
  return transactions.reduce((acc, curr) => {
    if (curr.type === "deposit") {
      return acc + curr.amount;
    } else if (curr.type === "withdrawal") {
      return acc - curr.amount;
    }
    return acc;
  }, 0);
};

console.log(calculateBalance(transactions));
