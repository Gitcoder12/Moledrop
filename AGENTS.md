# Agent Instructions — Moledrop

Read README.md, CONTRIBUTING.md and FEATURE_UPGRADE_PLAN.md before edits.

- Preserve graph semantics and public CLI behavior unless task requires a change.
- Validate IDs, edges, weights and disconnected graph behavior.
- Add deterministic tests for optimality and boundary conditions.
- Do not represent the simulation as live navigation or transport control.
- Report exact test commands and outputs; never invent validation.
- Work on a branch and open a PR. Do not merge or deploy autonomously.
