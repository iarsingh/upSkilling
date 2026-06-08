from app.calculator import add, divide


def test_add() -> None:
    assert add(2, 3) == 5


def test_divide() -> None:
    assert divide(10, 2) == 5


def test_divide_by_zero() -> None:
    try:
        divide(10, 0)
    except ValueError as exc:
        assert "must not be zero" in str(exc)
    else:
        raise AssertionError("expected ValueError")

