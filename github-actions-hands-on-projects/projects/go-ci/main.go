package main

func HealthStatus(ok bool) string {
	if ok {
		return "healthy"
	}
	return "unhealthy"
}

