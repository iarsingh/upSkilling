PROJECT_ROOT := $(shell pwd)

.PHONY: list validate

list:
	@find . -maxdepth 2 -name README.md | sort

validate:
	@find . -name "*.sh" -print -exec sh -n {} \;
	@find . -name "*.py" -print -exec python3 -m py_compile {} \;

