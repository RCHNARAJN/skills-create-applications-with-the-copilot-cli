const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    test('should add two numbers: 2 + 3 = 5', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add multiple numbers: 2 + 3 + 5 = 10', () => {
      expect(calculator.add(2, 3, 5)).toBe(10);
    });

    test('should handle negative numbers: 5 + (-3) = 2', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });

    test('should handle decimals: 1.5 + 2.5 = 4', () => {
      expect(calculator.add(1.5, 2.5)).toBe(4);
    });

    test('should handle zero: 5 + 0 = 5', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });

    test('should add multiple numbers including zero: 1 + 0 + 2 + 0 = 3', () => {
      expect(calculator.add(1, 0, 2, 0)).toBe(3);
    });

    test('should handle large numbers: 1000000 + 2000000 = 3000000', () => {
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });

    test('should throw error when no numbers provided', () => {
      expect(() => calculator.add()).toThrow('Addition requires at least one number');
    });
  });

  describe('Subtraction', () => {
    test('should subtract two numbers: 10 - 4 = 6', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract multiple numbers: 10 - 3 - 2 = 5', () => {
      expect(calculator.subtract(10, 3, 2)).toBe(5);
    });

    test('should handle negative numbers: 5 - (-3) = 8', () => {
      expect(calculator.subtract(5, -3)).toBe(8);
    });

    test('should handle decimals: 10.5 - 3.5 = 7', () => {
      expect(calculator.subtract(10.5, 3.5)).toBe(7);
    });

    test('should result in negative: 3 - 5 = -2', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('should handle zero: 5 - 0 = 5', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    test('should handle subtract from zero: 0 - 5 = -5', () => {
      expect(calculator.subtract(0, 5)).toBe(-5);
    });

    test('should throw error when no numbers provided', () => {
      expect(() => calculator.subtract()).toThrow('Subtraction requires at least one number');
    });
  });

  describe('Multiplication', () => {
    test('should multiply two numbers: 45 * 2 = 90', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply multiple numbers: 3 * 4 * 5 = 60', () => {
      expect(calculator.multiply(3, 4, 5)).toBe(60);
    });

    test('should handle negative numbers: 5 * (-3) = -15', () => {
      expect(calculator.multiply(5, -3)).toBe(-15);
    });

    test('should handle two negative numbers: (-5) * (-3) = 15', () => {
      expect(calculator.multiply(-5, -3)).toBe(15);
    });

    test('should handle decimals: 2.5 * 4 = 10', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should handle zero: 5 * 0 = 0', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    test('should handle one: 5 * 1 = 5', () => {
      expect(calculator.multiply(5, 1)).toBe(5);
    });

    test('should handle large numbers: 1000 * 2000 = 2000000', () => {
      expect(calculator.multiply(1000, 2000)).toBe(2000000);
    });

    test('should throw error when no numbers provided', () => {
      expect(() => calculator.multiply()).toThrow('Multiplication requires at least one number');
    });
  });

  describe('Division', () => {
    test('should divide two numbers: 20 / 5 = 4', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('should divide multiple numbers sequentially: 100 / 2 / 5 = 10', () => {
      expect(calculator.divide(100, 2, 5)).toBe(10);
    });

    test('should handle decimal division: 10 / 2.5 = 4', () => {
      expect(calculator.divide(10, 2.5)).toBe(4);
    });

    test('should handle result in decimal: 5 / 2 = 2.5', () => {
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    test('should handle negative numbers: 10 / (-2) = -5', () => {
      expect(calculator.divide(10, -2)).toBe(-5);
    });

    test('should handle two negative numbers: (-10) / (-2) = 5', () => {
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    test('should handle division of zero: 0 / 5 = 0', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing by zero in sequence: 100 / 2 / 0', () => {
      expect(() => calculator.divide(100, 2, 0)).toThrow('Division by zero is not allowed');
    });

    test('should handle division by one: 10 / 1 = 10', () => {
      expect(calculator.divide(10, 1)).toBe(10);
    });

    test('should handle large numbers: 1000000 / 1000 = 1000', () => {
      expect(calculator.divide(1000000, 1000)).toBe(1000);
    });

    test('should throw error when no numbers provided', () => {
      expect(() => calculator.divide()).toThrow('Division requires at least one number');
    });
  });

  describe('Clear', () => {
    test('should return 0 when clear is called', () => {
      expect(calculator.clear()).toBe(0);
    });
  });

  describe('Integration Tests - Image Examples', () => {
    test('Image example 1: 2 + 3 = 5', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('Image example 2: 10 - 4 = 6', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('Image example 3: 45 * 2 = 90', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('Image example 4: 20 / 5 = 4', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle very small decimals: 0.1 + 0.2', () => {
      const result = calculator.add(0.1, 0.2);
      expect(result).toBeCloseTo(0.3, 5);
    });

    test('should handle Infinity results gracefully in division', () => {
      const result = calculator.divide(1, 0.0001);
      expect(result).toBeGreaterThan(9999);
    });

    test('should maintain precision with multiple operations', () => {
      const add1 = calculator.add(10, 20, 30);
      const subtract1 = calculator.subtract(add1, 5);
      const multiply1 = calculator.multiply(subtract1, 2);
      const divide1 = calculator.divide(multiply1, 10);
      expect(divide1).toBe(11);
    });

    test('should handle single number addition', () => {
      expect(calculator.add(42)).toBe(42);
    });

    test('should handle single number subtraction', () => {
      expect(calculator.subtract(42)).toBe(42);
    });

    test('should handle single number multiplication', () => {
      expect(calculator.multiply(42)).toBe(42);
    });

    test('should handle single number division', () => {
      expect(calculator.divide(42)).toBe(42);
    });
  });
});
