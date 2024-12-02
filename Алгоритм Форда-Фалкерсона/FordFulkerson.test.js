const Graph = require('./Graph');
const FordFulkerson = require('./FordFulkerson');

describe('FordFulkerson Algorithm Tests', () => {
    test('Тест 1: Простой граф с двумя непротиворечивыми путями', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 100);
        graph.addEdge(0, 2, 100);
        graph.addEdge(1, 3, 100);
        graph.addEdge(2, 3, 100);

        const fordFulkerson = new FordFulkerson(graph);
        const maxFlow = fordFulkerson.maxFlow(0, 3);

        expect(maxFlow).toBe(200);
    });

    test('Тест 2: Граф с обратными ребрами', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 10);
        graph.addEdge(1, 2, 2);
        graph.addEdge(1, 3, 10);
        graph.addEdge(2, 3, 10);

        const fordFulkerson = new FordFulkerson(graph);
        const maxFlow = fordFulkerson.maxFlow(0, 3);

        expect(maxFlow).toBe(20);
    });

    test('Тест 3: Граф без путей от источника к стоку', () => {
        const graph = new Graph(3);
        graph.addEdge(0, 1, 10);
        graph.addEdge(1, 0, 5);
        graph.addEdge(1, 2, 0);
        const fordFulkerson = new FordFulkerson(graph);
        const maxFlow = fordFulkerson.maxFlow(0, 2);

        expect(maxFlow).toBe(0);
    });

    test('Тест 4: Граф с циклом', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 10);
        graph.addEdge(1, 2, 5);
        graph.addEdge(2, 1, 15);
        graph.addEdge(2, 3, 10);
        graph.addEdge(1, 3, 10);

        const fordFulkerson = new FordFulkerson(graph);
        const maxFlow = fordFulkerson.maxFlow(0, 3);

        expect(maxFlow).toBe(20);
    });

    test('Тест 5: Большой граф с несколькими путями и пересекающимися потоками', () => {
        const graph = new Graph(6);
        // Источник: 0, Сток: 5
        graph.addEdge(0, 1, 16);
        graph.addEdge(0, 2, 13);
        graph.addEdge(1, 2, 10);
        graph.addEdge(2, 1, 4);
        graph.addEdge(1, 3, 12);
        graph.addEdge(3, 2, 9);
        graph.addEdge(2, 4, 14);
        graph.addEdge(4, 3, 7);
        graph.addEdge(3, 5, 20);
        graph.addEdge(4, 5, 4);

        const fordFulkerson = new FordFulkerson(graph);
        const maxFlow = fordFulkerson.maxFlow(0, 5);

        expect(maxFlow).toBe(23);
    });
});
