def remaining_budget(total_requests: int, failed_requests: int, target: float) -> float:
    allowed_failures = total_requests * (1 - target / 100)
    if allowed_failures == 0:
        return 100.0
    return max(0.0, 100 * (allowed_failures - failed_requests) / allowed_failures)


if __name__ == "__main__":
    print({"remaining_percent": remaining_budget(1_000_000, 400, 99.9)})

