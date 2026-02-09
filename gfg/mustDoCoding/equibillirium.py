#Given an array of integers arr[], the task is to find the first equilibrium point in the array.

#The equilibrium point in an array is an index (0-based indexing) such that the sum of all elements before that index is the same as the sum of elements after it. Return -1 if no such point exists. 

class Solution:
    def findEquilibrium(self, arr):
        # code here
        total_sum = sum(arr)
        left_sum  = 0
        for i in range(len(arr)):
            total_sum -= arr[i]
            if left_sum == total_sum:
                return i
            left_sum += arr[i]
        return -1
        
