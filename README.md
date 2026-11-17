# Moledrop

---

## AI-maintained project notes (secondary — 2026-11-13)

This section supplements the maintainer-authored README above. The original text has been restored verbatim from Git-history baseline `b6764ea5e6d4e8d87f933ba3d09c63c9cbacd410`; this addendum does not replace or certify the original claims.

- The current source tree, runtime data and tests are the implementation source of truth. Roadmap items, draft PRs and AI-generated descriptions are not shipped features by themselves.
- Preserve real and maintainer-provided data. Never silently substitute generated or placeholder data. Clearly label and isolate synthetic fixtures.
- Mark unverified sources, identifiers, metrics, benchmark results and external claims as unknown/unverified rather than guessing.
- Verify setup, execution, tests and public claims against the exact current commit before using this repository in a job, research or academic application.
- See [MODEL_AUDIT_ROUTER.md](MODEL_AUDIT_ROUTER.md) for independent model review instructions and the merge gate.

---

## Engineering Audit & Handover — 2026-11-17

**Review scope:** default branch `main`; static inspection of `simulation.js`, `hubs.json`, and `tests/simulation.test.js`. Tests were not executed.

### Confirmed findings
- The route planner uses Dijkstra's algorithm with `avg_time_min` as the edge weight. Dijkstra requires non-negative finite edge weights, but `buildGraph()` does not validate route weights or route endpoints.
- The current tests cover a sample shortest route, disconnected hubs, and start-equals-end. They do not cover malformed route data, negative/NaN weights, duplicate edges, or invalid hub references.
- The sample network is static data in `hubs.json`; it is a simulation dataset, not evidence of an operational pneumatic delivery network.

### Next actions
1. Validate route schema and require finite, non-negative travel times and distances before graph construction.
2. Add malformed-data and edge-case tests.
3. Keep all sample-network outputs clearly labelled as simulation estimates.

**Verification status:** static inspection only; `npm test` and `npm run check` have not been run in this audit.
