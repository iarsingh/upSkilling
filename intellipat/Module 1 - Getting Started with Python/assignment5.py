#1. Create an array that has user defined inputs and with the help of for loop, fetch all the prime numbers and print the numbers.

# Take number of elements from user
n = int(input("Enter number of elements: "))

arr = []

# Take array elements from user
for i in range(n):
    value = int(input(f"Enter element {i+1}: "))
    arr.append(value)

print("Prime numbers in the array:")

# Check for prime numbers
for num in arr:
    if num <= 1:
        continue   # Skip non-prime numbers

    is_prime = True
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break

    if is_prime:
        print(num)