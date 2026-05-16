window.ModuloGerador = {
    gerar: function(num) {
        return `// IA Code #${num} [Módulo 3 - React State Hook]\nimport React, { useState, useEffect } from 'react';\n\nexport const ComponenteIA_${num} = () => {\n    const [contador, setContador] = useState(${num});\n    useEffect(() => {\n        document.title = \`Contagem atual: \${contador}\`;\n    }, [contador]);\n    return <button onClick={() => setContador(c => c + 1)}>Incrementar</button>;\n};`;
    }
};
