const Graph = require('./Graph');

class FordFulkerson {
    constructor(graph) {
        this.graph = graph;
    }

    bfs(source, sink, parent) {
        const visited = Array(this.graph.V).fill(false);
        const queue = [];

        queue.push(source);
        visited[source] = true;

        while (queue.length > 0) {
            const u = queue.shift();

            for (let v = 0; v < this.graph.V; v++) {

                if (!visited[v] && this.graph.getCapacity(u, v) > 0) {
                    queue.push(v);
                    visited[v] = true;
                    parent[v] = u;
                    if (v === sink) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    maxFlow(source, sink) {
        const parent = Array(this.graph.V).fill(-1);
        let maxFlow = 0;

        while (this.bfs(source, sink, parent)) {
            let pathFlow = Infinity;
            let v = sink;
            while (v !== source) {
                const u = parent[v];
                pathFlow = Math.min(pathFlow, this.graph.getCapacity(u, v));
                v = u;
            }

            v = sink;
            while (v !== source) {
                const u = parent[v];
                this.graph.setCapacity(u, v, this.graph.getCapacity(u, v) - pathFlow);
                this.graph.setCapacity(v, u, this.graph.getCapacity(v, u) + pathFlow);
                v = u;
            }

            maxFlow += pathFlow;
        }

        return maxFlow;
    }
}

module.exports = FordFulkerson;
