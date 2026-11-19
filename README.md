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

---

## Examples Used
- Finding the fastest delivery path through connected hubs
- Comparing alternative routes when a hub is unavailable
- Testing shortest-path behavior on a disconnected network


---

## Comparison with Existing Open-Source Projects

Moledrop is documented as a simulation prototype for route planning in a network of pneumatic delivery hubs. Its current README identifies Dijkstra-based route selection over a static sample network. The following projects provide adjacent graph and simulation foundations.

| Project | Established focus | Relationship to Moledrop |
|---|---|---|
| [NetworkX](https://github.com/networkx/networkx) | General-purpose graph creation, analysis and algorithms | A broad graph library with a much larger algorithm ecosystem; Moledrop packages a specific hub-to-hub delivery simulation and route-selection workflow. |
| [SimPy](https://github.com/simpx/simpy) | Process-based discrete-event simulation in Python | A simulation framework suited to modelling queues, throughput and resource contention; Moledrop currently focuses on shortest-path routing rather than a full event simulation. |
| [OSRM](https://github.com/Project-OSRM/osrm-backend) | High-performance routing on real road networks | A mature real-world road-routing engine; Moledrop models a different, domain-specific network and should not claim real-world routing equivalence. |

### Where Moledrop is different
- **Pneumatic-network abstraction:** the domain model represents hubs and directed/weighted links rather than roads and vehicles.
- **Focused route logic:** the documented MVP uses a transparent shortest-path calculation that is easy to inspect and test.
- **Delivery-network experimentation:** the concept can be extended to compare hub availability and network topology.

### Where established projects are stronger
NetworkX, SimPy and OSRM have mature algorithms, validation and ecosystems. Moledrop's current sample graph is a simulation dataset, not evidence of an operational pneumatic delivery network or real-world delivery performance.

### Evidence and limitations
Keep sample-network outputs labelled as simulation results. Validate route weights as finite and non-negative, test disconnected graphs and malformed data, and add event/queue modelling before making throughput or latency claims. This is a scope comparison, not a performance benchmark.
