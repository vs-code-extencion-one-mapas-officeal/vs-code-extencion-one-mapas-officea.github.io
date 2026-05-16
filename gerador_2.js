window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 2 - Binary Search]\nfunction buscaBinaria_${num}(lista, alvo) {\n    let inicio = 0, fim = lista.length - 1;\n    while (inicio <= fim) {\n        let meio = Math.floor((inicio + fim) / 2);\n        if (lista[meio] === alvo) return meio;\n        if (lista[meio] < alvo) inicio = meio + 1;\n        else fim = meio - 1;\n    }\n    return -1;\n}`;
    }
};
