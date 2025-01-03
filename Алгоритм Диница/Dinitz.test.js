const Graph = require('./Graph');
const Dinitz = require('./Dinitz');
const {performance} = require("perf_hooks");

describe('Dinitz Algorithm Tests', () => {

    /**
     * @param {number} V - Количетво вершин
     * @param {number} E - Количество ребер
     * @returns {Graph} - Граф
     */
    function generateGraph(V, E) {
        if (E < V - 1) {
            throw new Error('Колличество ребер должно быть не меньше  V - 1');
        }

        const graph = new Graph(V);

        for (let i = 0; i < V - 1; i++) {
            graph.addEdge(i, i + 1, 1);
        }

        let addedEdges = V - 1;
        while (addedEdges < E) {
            const from = Math.floor(Math.random() * V);
            const to = Math.floor(Math.random() * V);
            if (from !== to && graph.getCapacity(from, to) === 0) {
                graph.addEdge(from, to, 1);
                addedEdges++;
            }
        }

        return graph;
    }

    /**
     * @param {Graph} graph - Граф для тестирования
     * @returns {number} - Время в милисекундах
     */
    function measureExecutionTime(graph) {
        const dinitz = new Dinitz(graph);
        const source = 0;
        const sink = graph.V - 1;

        const startTime = performance.now();
        dinitz.maxFlow(source, sink);
        const endTime = performance.now();

        return endTime - startTime;
    }

    test('Тест 1: Простой граф с двумя непротиворечивыми путями', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 15);
        graph.addEdge(0, 2, 15);
        graph.addEdge(1, 3, 10);
        graph.addEdge(2, 3, 15);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(25);
    });

    test('Тест 2: Граф с обратными ребрами', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 20);
        graph.addEdge(2, 1, 5);
        graph.addEdge(1, 3, 20);
        graph.addEdge(2, 3, 10);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(25);
    });

    test('Тест 3: Граф без путей от источника к стоку', () => {
        const graph = new Graph(3);
        graph.addEdge(0, 1, 20);
        graph.addEdge(0, 2, 10);
        graph.addEdge(2, 1, 15);
        graph.addEdge(1, 3, 0);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(0);
    });

    test('Тест 4: Граф с циклом', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 15);
        graph.addEdge(0, 2, 10);
        graph.addEdge(1, 2, 5);
        graph.addEdge(2, 1, 15);
        graph.addEdge(2, 3, 20);
        graph.addEdge(1, 3, 10);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(25);
    });

    test('Тест 5: Большой граф с несколькими путями и пересекающимися потоками', () => {
        const graph = new Graph(6);
        graph.addEdge(0, 1, 16);
        graph.addEdge(0, 2, 13);
        graph.addEdge(1, 2, 10);
        graph.addEdge(2, 1, 4);
        graph.addEdge(1, 3, 12);
        graph.addEdge(3, 2, 9);
        graph.addEdge(2, 4, 14);
        graph.addEdge(4, 3, 7);
        graph.addEdge(3, 5, 20);
        graph.addEdge(4, 5, 20);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 5);
        expect(maxFlow).toBe(26);
    });

    test('Тест 6: Проверка временной сложности', () => {
        const graphSizes = [
            { V: 4000, E: 8000 },
            { V: 5000, E: 10000 },
            { V: 6000, E: 12000 },
        ];

        const timings = graphSizes.map(size => {
            const graph = generateGraph(size.V, size.E);
            const time = measureExecutionTime(graph);
            return { ...size, time: parseFloat(time.toFixed(2)) };
        });

        const comparisons = [];

        for (let i = 1; i < timings.length; i++) {
            const previous = timings[i - 1];
            const current = timings[i];

            const theoreticalRatio = (current.E * Math.pow(current.V, 2)) / (previous.E * Math.pow(previous.V, 2));

            const actualRatio = current.time / previous.time;

            comparisons.push({
                'Сравнение': `Graph ${i} to Graph ${i + 1}`,
                'Теоретическое соотношение': parseFloat(theoreticalRatio.toFixed(2)),
                'Реальное соотношение': parseFloat(actualRatio.toFixed(2)),
            });

            const tolerance = 1.5;

            expect(actualRatio).toBeGreaterThanOrEqual(theoreticalRatio / tolerance);
            expect(actualRatio).toBeLessThanOrEqual(theoreticalRatio * tolerance);
        }

        console.log('Результаты тестирования временной сложности', { timings, comparisons });
    });
})