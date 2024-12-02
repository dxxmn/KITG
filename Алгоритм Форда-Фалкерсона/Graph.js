class Graph {
    constructor(numberOfVertices) {
        this.V = numberOfVertices;
        this.adjMatrix = Array.from({ length: this.V }, () => Array(this.V).fill(0));
    }

    addEdge(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }

    getCapacity(from, to) {
        return this.adjMatrix[from][to];
    }

    setCapacity(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }

    getNeighbors(v) {
        const neighbors = [];
        for (let i = 0; i < this.V; i++) {
            if (this.adjMatrix[v][i] > 0) {
                neighbors.push(i);
            }
        }
        return neighbors;
    }
}

module.exports = Graph;