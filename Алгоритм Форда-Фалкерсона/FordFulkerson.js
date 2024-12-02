const Graph = require('./Graph');

class FordFulkerson {
    constructor(graph) {
        this.graph = graph;
    }

    // Метод для поиска пути с помощью BFS и возврата предков для восстановления пути
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

    // Метод для вычисления максимального потока от источника к стоку
    maxFlow(source, sink) {
        const parent = Array(this.graph.V).fill(-1);
        let maxFlow = 0;

        // Повторяем, пока существует путь из источника в сток
        while (this.bfs(source, sink, parent)) {
            // Находим минимальную пропускную способность на найденном пути
            let pathFlow = Infinity;
            let v = sink;
            while (v !== source) {
                const u = parent[v];
                pathFlow = Math.min(pathFlow, this.graph.getCapacity(u, v));
                v = u;
            }

            // Обновляем пропускные способности ребер и обратных ребер
            v = sink;
            while (v !== source) {
                const u = parent[v];
                this.graph.setCapacity(u, v, this.graph.getCapacity(u, v) - pathFlow);
                this.graph.setCapacity(v, u, this.graph.getCapacity(v, u) + pathFlow);
                v = u;
            }

            // Увеличиваем общий поток
            maxFlow += pathFlow;
        }

        return maxFlow;
    }
}

module.exports = FordFulkerson;
