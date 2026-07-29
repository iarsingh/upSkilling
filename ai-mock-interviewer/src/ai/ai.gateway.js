class AiGateway {
  constructor(options) {
    this.generate = options.generate;
    this.fallback = options.fallback;
    this.validate = options.validate;
  }

  async generateQuestion(request) {
    if (this.generate) {
      try {
        const result = await this.generate(request);
        if (result?.question && this.validate(result.question, request.allowedTopics)) {
          return { ...result, source: result.source || "ai" };
        }
      } catch {
        // Provider failure intentionally degrades to the deterministic bank.
      }
    }
    const fallback = await this.fallback(request);
    return { ...fallback, source: fallback.source || "question-bank" };
  }
}

module.exports = { AiGateway };
