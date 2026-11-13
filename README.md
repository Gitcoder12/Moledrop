# Moledrop

**A Node.js route-planning simulation for a hypothetical underground delivery hub network.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Moledrop models hubs and tunnel links as a weighted graph and uses Dijkstra's algorithm to find a route with the lowest total travel time.

## Features

- Load hub and route records from `hubs.json`.
- Exclude inactive hubs from route planning.
- Build an undirected weighted graph from active routes.
- Calculate a shortest-time path between two hub IDs.
- Return an empty result when no active route connects the requested hubs.

## Quick Start

Node.js is the only runtime requirement; the current implementation uses built-in modules.

```bash
git clone https://github.com/Gitcoder12/Moledrop.git
cd Moledrop
npm start
```

The sample run calculates the route from `H-B` to `H-D`:

```text
H-B → H-A → H-D
Estimated time: 6.5 min
```

## Run Tests

```bash
npm test
npm run check
```

The tests cover the sample shortest path, disconnected hubs, and a route where the start and end are the same node.

## Tech Stack

JavaScript · Node.js · JSON · Dijkstra's shortest-path algorithm · Node.js built-in test runner

## Project Structure

```text
Moledrop/
├── simulation.js        # Graph construction and route search
├── hubs.json            # Sample Hyderabad hub and route records
├── tests/
│   └── simulation.test.js
└── package.json         # Start, test, and syntax-check scripts
```

## Scope and Limitations

This is a graph simulation, not a real pneumatic delivery network. Hub coordinates, capacities, route distances, and travel times are sample data. The estimated times are values from the supplied graph, not measured logistics performance.

## License

MIT. See [LICENSE](LICENSE).

---

## Project handbook

- [Activity log](ACTIVITY_LOG.md) · [Feature upgrade plan](FEATURE_UPGRADE_PLAN.md)
- [Company and team fit](COMPANY_FIT.md) · [README explanation draft](README_ADDENDUM_DRAFT.md)
- [README quality checklist](README_QUALITY_CHECKLIST.md)
- [Contributing](CONTRIBUTING.md) · [Agent instructions](AGENTS.md) · [Agent skills](SKILLS.md)

## Understanding the project

### In plain language

A route-planning simulation for a made-up underground delivery network. It finds a low-travel-time path between hubs.

### Technical and research view

Node.js graph prototype. Hub records and weighted tunnel links are loaded into an undirected graph; inactive hubs/routes are excluded; Dijkstra's algorithm selects a shortest-time route. It is a hypothetical simulation, not a live transport or robotics routing system.

Document the graph representation, weighting assumptions, Dijkstra implementation, tie-breaking and no-route behavior. Include sample input and exact output.

See [FEATURE_UPGRADE_PLAN.md](FEATURE_UPGRADE_PLAN.md), [ACTIVITY_LOG.md](ACTIVITY_LOG.md), [COMPANY_FIT.md](COMPANY_FIT.md) and [CONTRIBUTING.md](CONTRIBUTING.md) for further technical and collaboration detail.
