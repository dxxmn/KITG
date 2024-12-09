const Graph = require('./Graph');

class Dinitz {
    constructor(graph) {
        this.graph = graph;
        this.level = [];
    }

    bfs(source, sink) {
        this.level = Array(this.graph.V).fill(-1);
        const queue = [];
        queue.push(source);
        this.level[source] = 0;

        while (queue.length > 0) {
            const u = queue.shift();
            for (let v = 0; v < this.graph.V; v++) {
                if (this.level[v] < 0 && this.graph.getCapacity(u, v) > 0) {
                    this.level[v] = this.level[u] + 1;
                    queue.push(v);
                }
            }
        }

        return this.level[sink] >= 0;
    }

    dfs(u, sink, flow, start) {
        if (u === sink) {
            return flow;
        }

        for (let v = start[u]; v < this.graph.V; v++) {
            if (this.level[v] === this.level[u] + 1 && this.graph.getCapacity(u, v) > 0) {
                const currentFlow = Math.min(flow, this.graph.getCapacity(u, v));
                const tempFlow = this.dfs(v, sink, currentFlow, start);
                if (tempFlow > 0) {
                    this.graph.setCapacity(u, v, this.graph.getCapacity(u, v) - tempFlow);
                    this.graph.setCapacity(v, u, this.graph.getCapacity(v, u) + tempFlow);
                    return tempFlow;
                }
            }
            start[u]++;
        }

        return 0;
    }

    maxFlow(source, sink) {
        if (source === sink) {
            return 0;
        }

        let totalFlow = 0;

        while (this.bfs(source, sink)) {
            const start = Array(this.graph.V).fill(0);

            let flow;
            do {
                flow = this.dfs(source, sink, Infinity, start);
                totalFlow += flow;
            } while (flow > 0);
        }

        return totalFlow;
    }
}

module.exports = Dinitz;
