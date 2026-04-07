#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Basic Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers from an initial value
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide numbers with error handling for division by zero
 * 
 * Supported Advanced Operations:
 * - Modulo (%): Return the remainder of a divided by b
 * - Power (^): Raise a number to an exponent
 * - Square Root (√): Calculate the square root of a number
 */

class Calculator {
  /**
   * Addition: Add two or more numbers
   * @param {...number} numbers - Numbers to add
   * @returns {number} The sum of all numbers
   */
  add(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Addition requires at least one number');
    }
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  /**
   * Subtraction: Subtract numbers from the first number
   * @param {...number} numbers - Numbers to subtract (first is minuend, rest are subtrahends)
   * @returns {number} The result of subtraction
   */
  subtract(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Subtraction requires at least one number');
    }
    return numbers.reduce((diff, num) => diff - num);
  }

  /**
   * Multiplication: Multiply two or more numbers
   * @param {...number} numbers - Numbers to multiply
   * @returns {number} The product of all numbers
   */
  multiply(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Multiplication requires at least one number');
    }
    return numbers.reduce((product, num) => product * num, 1);
  }

  /**
   * Division: Divide numbers sequentially with error handling
   * @param {...number} numbers - Numbers to divide (first is dividend, rest are divisors)
   * @returns {number} The result of division
   * @throws {Error} If attempting to divide by zero
   */
  divide(...numbers) {
    if (numbers.length === 0) {
      throw new Error('Division requires at least one number');
    }
    
    return numbers.reduce((quotient, num, index) => {
      if (num === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return index === 0 ? num : quotient / num;
    });
  }

  /**
   * Modulo: Return the remainder of a divided by b
   * @param {number} a - The dividend
   * @param {number} b - The divisor
   * @returns {number} The remainder of a divided by b
   * @throws {Error} If b is zero
   */
  modulo(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Modulo requires two numbers');
    }
    if (b === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    return a % b;
  }

  /**
   * Power: Return base raised to the exponent
   * @param {number} base - The base number
   * @param {number} exponent - The exponent
   * @returns {number} The result of base raised to the exponent
   */
  power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('Power requires two numbers');
    }
    return Math.pow(base, exponent);
  }

  /**
   * Square Root: Return the square root of n
   * @param {number} n - The number to find the square root of
   * @returns {number} The square root of n
   * @throws {Error} If n is negative
   */
  squareRoot(n) {
    if (typeof n !== 'number') {
      throw new Error('Square root requires a number');
    }
    if (n < 0) {
      throw new Error('Square root of negative numbers is not allowed');
    }
    return Math.sqrt(n);
  }

  /**
   * Clear: Reset the calculator (utility method)
   * @returns {number} Returns 0
   */
  clear() {
    return 0;
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    displayHelp();
    process.exit(0);
  }

  const calculator = new Calculator();
  const operation = args[0];
  const numbers = args.slice(1).map(num => parseFloat(num));

  // Validate that all arguments after operation are valid numbers
  if (numbers.some(isNaN)) {
    console.error('Error: All arguments must be valid numbers');
    process.exit(1);
  }

  try {
    let result;

    switch (operation) {
      case 'add':
      case '+':
        result = calculator.add(...numbers);
        break;
      case 'subtract':
      case '-':
        result = calculator.subtract(...numbers);
        break;
      case 'multiply':
      case '*':
        result = calculator.multiply(...numbers);
        break;
      case 'divide':
      case '/':
        result = calculator.divide(...numbers);
        break;
      case 'modulo':
      case '%':
        if (numbers.length !== 2) {
          throw new Error('Modulo requires exactly two numbers');
        }
        result = calculator.modulo(numbers[0], numbers[1]);
        break;
      case 'power':
      case '^':
        if (numbers.length !== 2) {
          throw new Error('Power requires exactly two numbers');
        }
        result = calculator.power(numbers[0], numbers[1]);
        break;
      case 'sqrt':
      case 'squareroot':
      case '√':
        if (numbers.length !== 1) {
          throw new Error('Square root requires exactly one number');
        }
        result = calculator.squareRoot(numbers[0]);
        break;
      case 'help':
      case '-h':
      case '--help':
        displayHelp();
        process.exit(0);
        break;
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        displayHelp();
        process.exit(1);
    }

    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

function displayHelp() {
  console.log(`
Calculator - Node.js CLI Calculator App

Usage: calculator <operation> <numbers...>

Basic Operations:
  add, +          Addition: sum all numbers
  subtract, -     Subtraction: subtract all numbers from the first
  multiply, *     Multiplication: multiply all numbers
  divide, /       Division: divide sequentially (with zero-check)

Advanced Operations:
  modulo, %       Modulo: remainder of first number divided by second
  power, ^        Power: raise first number to the power of second
  sqrt, squareroot, √   Square root: calculate square root of number

Other:
  help, -h        Display this help message

Examples - Basic Operations:
  calculator add 5 3 2           # Result: 10
  calculator subtract 10 3 2     # Result: 5
  calculator multiply 4 5        # Result: 20
  calculator divide 100 2 5      # Result: 10
  calculator + 1.5 2.5           # Result: 4

Examples - Advanced Operations:
  calculator modulo 10 3         # Result: 1
  calculator power 2 3           # Result: 8
  calculator ^ 5 2               # Result: 25
  calculator sqrt 16             # Result: 4
  calculator squareroot 9        # Result: 3
  `);
}

// Export for module usage
module.exports = Calculator;

// Run CLI if executed directly
if (require.main === module) {
  main();
}
