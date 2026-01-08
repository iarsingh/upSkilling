#1. Take three user inputs and print the greatest number from those inputs using if-else condition. Edge cases, if any, should also be handled.

a = int(input("Enter value of a: "))
b = int(input("Enter value of b: "))
c = int(input("Enter value of c: "))

if a > b and a > c:
    print("Greatest number is:", a)
elif b > a and b > c:
    print("Greatest number is:", b)
elif c > a and c > b:
    print("Greatest number is:", c)
elif a == b and a > c:
    print("a and b are equal and greatest:", a)
elif a == c and a > b:
    print("a and c are equal and greatest:", a)
elif b == c and b > a:
    print("b and c are equal and greatest:", b)
else:
    print("All three numbers are equal:", a)