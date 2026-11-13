# Moledrop — Feature Upgrade Plan

## Objective

A route-planning simulation for a made-up underground delivery network. It finds a low-travel-time path between hubs.

## P0 — correctness

- [ ] Validate hub IDs, route endpoints, positive finite travel weights and duplicate links.
- [ ] Test disconnected graphs, inactive hubs, cycles, equal-cost paths and unknown start/end nodes.

## P1 — usable API/CLI

- [ ] Separate graph construction, pathfinding and CLI presentation into testable modules.
- [ ] Return path cost, route and explanatory failure reasons in a documented JSON interface.

## P2 — evaluation

- [ ] Benchmark graph sizes and document algorithmic complexity.
- [ ] Compare Dijkstra against a baseline and add reproducible generated-network scenarios.

## Contributor work packages

1. Graph schema validation.
2. Dijkstra correctness and boundary tests.
3. CLI and machine-readable output contract.
4. Reproducible performance evaluation.

## Definition of done

- [ ] All weights and endpoints are validated.
- [ ] Tests cover connected, disconnected, cyclic and equal-cost cases.
- [ ] CLI output and error behavior are documented.
- [ ] Complexity and simulation limitations are explicit.
