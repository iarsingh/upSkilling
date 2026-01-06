#Problem Statement:
# You work in XYZ Corporation as a Data Analyst. Your company has told you to
# work with the if-else condition.
# Tasks To Be Performed:
# 1. Input the values of a and b as 10 and 20 respectively. Now check if a is greater or b is greater using if condition. Think about all the edge cases, and print the statements accordingly

#take input from the user
a = int(input("Enter value of a: "))
b = int(input("Enter value of b: "))

if a > b:
    print("a is greater than b")
elif b > a:
    print("b is greater than a")
else:
    print("Both a and b are equal")
