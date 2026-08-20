REQUIREMENTS

- Your task is to create a data-loading pipeline that loads a dataset for training a model. The data are given here: https://github.com/t1t2tasks/t1nlppipeline/. The most important fields are 'question' and 'answer' but you'll also need 'unixTime'. 

- Implement the data loading pipeline using a generator pattern.
Iterate through all gzip files in the input data directory without fully decompressing them to disk (as they may be extremely large), and process each file either line by line or in batches. You should determine which approach provides the most appropriate balance between memory usage and performance, and clearly justify your decision.
Note: Do not assume that a .json extension guarantees valid JSON formatting; inspect and validate representative samples of the data accordingly.

- Write a function that shows that the pipeline returns all text fragments given ( you do not have to call it, just show how you will test that all text fragments are returned.)
