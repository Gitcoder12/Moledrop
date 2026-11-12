"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const { buildGraph, dijkstra, findRoute } = require("../simulation");

test("finds the lowest-time route across the sample active hubs", () => {
  const result = findRoute("H-B", "H-D");
  assert.deepEqual(result.path, ["H-B", "H-A", "H-D"]);
  assert.equal(result.total_time_min, 6.5);
});

test("returns an empty route for disconnected hubs", () => {
  const graph = buildGraph([
    { from: "A", to: "B", avg_time_min: 2, distance_km: 1 },
    { from: "C", to: "D", avg_time_min: 3, distance_km: 2 },
  ]);
  assert.deepEqual(dijkstra(graph, "A", "D"), {
    path: [],
    total_time_min: null,
  });
});

test("returns a zero-cost path when start and end are the same", () => {
  const graph = buildGraph([
    { from: "A", to: "B", avg_time_min: 2, distance_km: 1 },
  ]);
  assert.deepEqual(dijkstra(graph, "A", "A"), {
    path: ["A"],
    total_time_min: 0,
  });
});
