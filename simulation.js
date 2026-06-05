/**
 * Moledrop Route Simulation
 * Dijkstra-based shortest path across pneumatic hub network
 */

const hubs = require('./hubs.json');

function buildGraph(routes) {
  const graph = {};
  for (const route of routes) {
    if (!graph[route.from]) graph[route.from] = [];
    if (!graph[route.to]) graph[route.to] = [];
    graph[route.from].push({ node: route.to, time: route.avg_time_min, dist: route.distance_km });
    graph[route.to].push({ node: route.from, time: route.avg_time_min, dist: route.distance_km });
  }
  return graph;
}

function dijkstra(graph, start, end) {
  const dist = {};
  const prev = {};
  const visited = new Set();
  const nodes = Object.keys(graph);

  nodes.forEach(n => dist[n] = Infinity);
  dist[start] = 0;

  while (true) {
    const current = nodes
      .filter(n => !visited.has(n))
      .reduce((a, b) => dist[a] < dist[b] ? a : b, null);

    if (!current || dist[current] === Infinity || current === end) break;
    visited.add(current);

    for (const neighbor of (graph[current] || [])) {
      const alt = dist[current] + neighbor.time;
      if (alt < dist[neighbor.node]) {
        dist[neighbor.node] = alt;
        prev[neighbor.node] = current;
      }
    }
  }

  const path = [];
  let node = end;
  while (node) { path.unshift(node); node = prev[node]; }
  return { path, total_time_min: dist[end] };
}

function findRoute(fromId, toId) {
  const activeHubs = hubs.hubs.filter(h => h.active).map(h => h.id);
  const activeRoutes = hubs.routes.filter(r => activeHubs.includes(r.from) && activeHubs.includes(r.to));
  const graph = buildGraph(activeRoutes);
  return dijkstra(graph, fromId, toId);
}

// Example usage
const result = findRoute('H-B', 'H-D');
console.log('Route:', result.path.join(' → '));
console.log('Estimated time:', result.total_time_min, 'min');

module.exports = { findRoute };
