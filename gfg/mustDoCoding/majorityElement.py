#Given an array arr[]. Find the majority element in the array. If no majority element exists, return -1.

#Note: A majority element in an array is an element that appears strictly more than arr.size()/2 times in the array.

class Solution:
    def majorityElement(self, arr):
        #code here
        n = len(arr)
        candidate = None
        count = 0
        for num in arr:
            if count == 0:
                candidate = num
            count += (1 if num == candidate else -1)
        if arr.count(candidate) > n // 2:
            return candidate
        return -1