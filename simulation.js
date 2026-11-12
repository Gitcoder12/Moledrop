/**
 * Moledrop Route Simulation
 * Dijkstra-based shortest path across the sample pneumatic hub network.
 */

const hubs = require("./hubs.json");

function buildGraph(routes) {
  const graph = {};
  for (const route of routes) {
    if (!graph[route.from]) graph[route.from] = [];
    if (!graph[route.to]) graph[route.to] = [];
    graph[route.from].push({
      node: route.to,
      time: route.avg_time_min,
      dist: route.distance_km,
    });
    graph[route.to].push({
      node: route.from,
      time: route.avg_time_min,
      dist: route.distance_km,
    });
  }
  return graph;
}

function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const nodes = Object.keys(graph);

  if (!nodes.includes(start) || !nodes.includes(end)) {
    return { path: [], total_time_min: null };
  }

  for (const node of nodes) distances[node] = Infinity;
  distances[start] = 0;

  while (true) {
    let current = null;

    // Select the unvisited node with the smallest tentative distance.
    for (const node of nodes) {
      if (visited.has(node)) continue;
      if (current === null || distances[node] < distances[current]) {
        current = node;
      }
    }

    if (current === null || !Number.isFinite(distances[current])) break;
    if (current === end) break;

    visited.add(current);

    for (const neighbor of graph[current] || []) {
      const candidate = distances[current] + neighbor.time;
      if (candidate < distances[neighbor.node]) {
        distances[neighbor.node] = candidate;
        previous[neighbor.node] = current;
      }
    }
  }

  if (!Number.isFinite(distances[end])) {
    return { path: [], total_time_min: null };
  }

  const path = [];
  let node = end;
  while (node !== undefined) {
    path.unshift(node);
    if (node === start) break;
    node = previous[node];
  }

  return { path, total_time_min: distances[end] };
}

function findRoute(fromId, toId) {
  const activeHubs = hubs.hubs.filter((hub) => hub.active).map((hub) => hub.id);
  const activeRoutes = hubs.routes.filter(
    (route) => activeHubs.includes(route.from) && activeHubs.includes(route.to),
  );
  return dijkstra(buildGraph(activeRoutes), fromId, toId);
}

if (require.main === module) {
  const result = findRoute("H-B", "H-D");
  if (result.path.length === 0) {
    console.error("No active route found between the requested hubs.");
    process.exitCode = 1;
  } else {
    console.log("Route:", result.path.join(" → "));
    console.log("Estimated time:", result.total_time_min, "min");
  }
}

module.exports = { buildGraph, dijkstra, findRoute };
