# Project 02: Go Log Parser

## Skill
File processing, scanners, maps, CLI arguments, and incident troubleshooting automation.

## Run

```sh
go run ./cmd --file sample.log
```

## Interview Q&A

**Q: Why use `bufio.Scanner` for logs?**  
A: It reads line by line without loading the whole file into memory.

**Q: When is a scanner not enough?**  
A: Very long lines may exceed the default token size, so you may need to increase the buffer or use a reader.

