export type Severity = "high" | "medium" | "low";
export type Finding = {
  ruleId: string;
  severity: Severity;
  title: string;
  detail: string;
  file: string;
  line?: number;
};

export function scan(labels: string[], required: string[], mode: string): Finding[] {
  if (!required.length) {
    return [
      {
        ruleId: "no-required-configured",
        severity: "low",
        title: "No required-labels configured",
        detail: "Set inputs.required-labels",
        file: "pull_request",
      },
    ];
  }
  const set = new Set(labels.map((l) => l.toLowerCase()));
  if (mode === "any") {
    const ok = required.some((r) => set.has(r.toLowerCase()));
    if (ok) return [];
    return [
      {
        ruleId: "missing-any-label",
        severity: "medium",
        title: `PR needs one of: ${required.join(", ")}`,
        detail: "Current labels: " + (labels.join(", ") || "(none)"),
        file: "pull_request",
      },
    ];
  }
  const missing = required.filter((r) => !set.has(r.toLowerCase()));
  return missing.map((r) => ({
    ruleId: "missing-label",
    severity: "medium" as const,
    title: `Missing required label: ${r}`,
    detail: "Current labels: " + (labels.join(", ") || "(none)"),
    file: "pull_request",
  }));
}
