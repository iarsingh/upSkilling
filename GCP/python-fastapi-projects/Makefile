.PHONY: validate list

list:
	@find . -maxdepth 2 -name README.md | sort

validate:
	@find . -name "*.py" -print -exec python3 -m py_compile {} \;

