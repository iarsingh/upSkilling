#1. Create a list that has 10, 23, 4, 26, 4, 75, 24, 54 values and with the help of while loop fetch the even numbers and print the numbers.

numbers = [10, 23, 4, 26, 4, 75, 24, 54]

i = 0
while i < len(numbers):
    if numbers[i] % 2 == 0:
        print(numbers[i])
    i += 1