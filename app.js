// Dicionário para completar palavras comuns (Gatilho de letras)
const autoCompletarLetras = {
    "func": "function nomeDaFuncao() {\n    \n}",
    "clg": "console.log();",
    "defi": "const [data, setData] = useState(null);",
    "importa": "import * as fs from 'fs';"
};

async function processarRequisicao() {
    const urlCompleta = window.location.search;
    const urlParams = new URLSearchParams(urlCompleta);
    const letrasParam = urlParams.get('letras');

    let respostaFinal = { codigo: "" };

    // Se a extensão enviou um comando de IA (ex: ?ia_code_452)
    if (urlCompleta.includes('?ia_code_')) {
        const match = urlCompleta.match(/\?ia_code_(\d+)/);
        
        if (match) {
            const numero = parseInt(match[1], 10);

            if (numero >= 0 && numero <= 1000) {
                // Lógica matemática: distribui os 1000 números igualmente entre os 10 arquivos (0 a 9)
                const idArquivo = numero % 10; 
                const nomeArquivo = `gerador_${idArquivo}.js`;

                try {
                    // Carrega e executa o arquivo .js correspondente dinamicamente
                    const modulo = await importarScript(nomeArquivo);
                    if (modulo && typeof modulo.gerar === 'function') {
                        respostaFinal.codigo = modulo.gerar(numero);
                    } else {
                        respostaFinal.codigo = `// Erro: O arquivo ${nomeArquivo} não possui a função de geração correta.`;
                    }
                } catch (erro) {
                    respostaFinal.codigo = `// Erro ao carregar o módulo ${nomeArquivo}. Certifique-se de que ele foi enviado ao GitHub.`;
                }
            } else {
                respostaFinal.codigo = `// Código de IA número ${numero} está fora do limite permitido (0 a 1000).`;
            }
        }
    } 
    // Se a extensão enviou letras digitadas normais
    else if (letrasParam) {
        const busca = letrasParam.toLowerCase().trim();
        if (autoCompletarLetras[busca]) {
            respostaFinal.codigo = autoCompletarLetras[busca];
        } else {
            respostaFinal.codigo = `// Sugestão Automática para: ${letrasParam}\nconst ${letrasParam}Value = true;`;
        }
    }

    // Transforma a página em uma API JSON se houver parâmetros na URL
    if (urlCompleta.length > 0) {
        document.body.innerHTML = JSON.stringify(respostaFinal);
        document.body.style.fontFamily = "monospace";
        document.body.style.whiteSpace = "pre";
        document.body.style.padding = "20px";
        document.body.style.backgroundColor = "#1e1e1e";
        document.body.style.color = "#a9dc76";
    }
}

// Função auxiliar para carregar arquivos .js como módulos injetados no navegador
function importarScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            // Retorna o objeto global que o arquivo gerador acabou de criar
            resolve(window.ModuloGerador);
        };
        script.onerror = () => reject(new Error(`Falha ao carregar script ${src}`));
        document.head.appendChild(script);
    });
}

window.onload = processarRequisicao;
