#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+): Add two or more numbers
 * - Subtraction (-): Subtract numbers from an initial value
 * - Multiplication (*): Multiply two or more numbers
 * - Division (/): Divide numbers with error handling for division by zero
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

Supported Operations:
  add, +          Addition: sum all numbers
  subtract, -     Subtraction: subtract all numbers from the first
  multiply, *     Multiplication: multiply all numbers
  divide, /       Division: divide sequentially (with zero-check)
  help, -h        Display this help message

Examples:
  calculator add 5 3 2           # Result: 10
  calculator subtract 10 3 2     # Result: 5
  calculator multiply 4 5        # Result: 20
  calculator divide 100 2 5      # Result: 10
  calculator + 1.5 2.5           # Result: 4
  calculator * 3 4 5             # Result: 60
  `);
}

// Export for module usage
module.exports = Calculator;

// Run CLI if executed directly
if (require.main === module) {
  main();
}
