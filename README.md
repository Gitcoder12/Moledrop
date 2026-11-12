# Moledrop

**A Node.js route-planning simulation for a hypothetical underground delivery hub network.**

[![License](https://img.shields.io/badge/license-see%20LICENSE-lightgrey)](LICENSE)

Moledrop models hubs and tunnel links as a weighted graph and uses Dijkstra's algorithm to find a route with the lowest total travel time.

## Features

- Load hub and route records from `hubs.json`.
- Exclude inactive hubs from route planning.
- Build an undirected weighted graph from active routes.
- Calculate a shortest-time path between two hub IDs.
- Print a sample route when the script runs.

## Quick Start

Node.js is the only runtime requirement; the current implementation uses built-in modules.

```bash
git clone https://github.com/Gitcoder12/Moledrop.git
cd Moledrop
npm start
```

The script prints the sample route from `H-B` to `H-D`.

## Tech Stack

JavaScript · Node.js · JSON · Dijkstra's shortest-path algorithm

## Project Structure

```text
Moledrop/
├── simulation.js # Graph construction and route search
├── hubs.json     # Sample Hyderabad hub and route records
└── package.json  # Start script
```

## Scope and Limitations

This is a graph simulation, not a real pneumatic delivery network. Hub coordinates, capacities, route distances, and travel times are sample data. The current route function is designed for the bundled network and is not a live logistics or safety system.

## License

See [LICENSE](LICENSE).
