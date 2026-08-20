function createInterviewRoutes(options) {
  const { service, readBody, sendJson, currentUserId } = options;

  function errorResponse(res, error, requestId) {
    sendJson(res, error.statusCode || 500, { error: { code: error.code || "INTERNAL_ERROR", message: error.statusCode ? error.message : "Unexpected server error.", requestId } });
  }

  return async function handleInterviewRoutes(req, res, url) {
    const requestId = req.headers["x-request-id"] || `req_${Date.now().toString(36)}`;
    res.setHeader("X-Request-Id", requestId);
    const pathname = url.pathname;
    if (req.method === "POST" && pathname === "/api/v1/interviews") {
      try { sendJson(res, 201, { interviewId: service.create(await readBody(req), currentUserId(req)).id, status: "READY" }); }
      catch (error) { errorResponse(res, error, requestId); }
      return true;
    }
    const match = pathname.match(/^\/api\/v1\/interviews\/([^/]+)(?:\/(start|questions\/next|answers|complete|report))?$/);
    if (!match) return false;
    const [, id, action] = match;
    const userId = currentUserId(req);
    try {
      if (req.method === "GET" && !action) sendJson(res, 200, { interview: service.get(id, userId) });
      else if (req.method === "POST" && action === "start") sendJson(res, 200, { interview: service.start(id, userId) });
      else if (req.method === "POST" && action === "questions/next") sendJson(res, 200, await service.nextQuestion(id, userId));
      else if (req.method === "POST" && action === "answers") sendJson(res, 201, { answer: service.submitAnswer(id, await readBody(req), userId) });
      else if (req.method === "POST" && action === "complete") sendJson(res, 200, { interview: service.complete(id, userId) });
      else if (req.method === "GET" && action === "report") sendJson(res, 200, { report: service.report(id, userId) });
      else sendJson(res, 405, { error: { code: "METHOD_NOT_ALLOWED", message: "Method not allowed.", requestId } });
    } catch (error) { errorResponse(res, error, requestId); }
    return true;
  };
}

module.exports = { createInterviewRoutes };
