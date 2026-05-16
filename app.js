// Dicionário para completar palavras comuns (Gatilho de letras da sua extensão)
const autoCompletarLetras = {
    "func": "function nomeDaFuncao() {\n    \n}",
    "clg": "console.log();",
    "defi": "const [data, setData] = useState(null);",
    "importa": "import * as fs from 'fs';"
};

async function processarRequisicao() {
    // Captura os parâmetros da URL (ex: ?letras=func ou ?ia_code_742)
    const urlCompleta = window.location.search;
    const urlParams = new URLSearchParams(urlCompleta);
    const letrasParam = urlParams.get('letras');

    let respostaFinal = { codigo: "" };

    // REGRA 1: Se a extensão enviou um comando de IA (ex: ?ia_code_452)
    if (urlCompleta.includes('?ia_code_')) {
        const match = urlCompleta.match(/\?ia_code_(\d+)/);
        
        if (match) {
            const numero = parseInt(match[1], 10);

            // Valida se o número está dentro do limite combinado (0 a 1000)
            if (numero >= 0 && numero <= 1000) {
                // Descobre qual das 10 classes de IA deve responder (0 a 9)
                const idArquivo = numero % 10; 
                const nomeArquivo = `gerador_ia_id_1${idArquivo}.js`; // Formato exato dos seus novos arquivos

                try {
                    // Carrega o script correspondente de forma assíncrona
                    const modulo = await importarScript(nomeArquivo);
                    
                    // Executa a classe/módulo para criar o App em segundos
                    if (modulo && typeof modulo.gerar === 'function') {
                        respostaFinal.codigo = modulo.gerar(numero);
                    } else {
                        respostaFinal.codigo = `// Erro: O arquivo ${nomeArquivo} não possui a estrutura 'window.ModuloGerador.gerar'.`;
                    }
                } catch (erro) {
                    respostaFinal.codigo = `// Erro: Falha ao carregar o módulo [${nomeArquivo}]. Verifique se o arquivo foi enviado ao repositório do GitHub.`;
                }
            } else {
                respostaFinal.codigo = `// Código de IA número ${numero} está fora do limite permitido (0 a 1000).`;
            }
        }
    } 
    // REGRA 2: Se a extensão enviou letras digitadas comuns (ex: ?letras=func)
    else if (letrasParam) {
        const busca = letrasParam.toLowerCase().trim();
        if (autoCompletarLetras[busca]) {
            respostaFinal.codigo = autoCompletarLetras[busca];
        } else {
            // Sugestão genérica caso o usuário digite algo que não está no dicionário
            respostaFinal.codigo = `// Sugestão Automática para: ${letrasParam}\nconst ${letrasParam}Value = true;`;
        }
    }

    // Se a URL tiver parâmetros, limpa a tela do site e cospe apenas o JSON puro (Comportamento de API)
    if (urlCompleta.length > 0) {
        document.body.innerHTML = JSON.stringify(respostaFinal);
        document.body.style.fontFamily = "monospace";
        document.body.style.whiteSpace = "pre";
        document.body.style.padding = "20px";
        document.body.style.backgroundColor = "#1e1e1e";
        document.body.style.color = "#a9dc76"; // Cor verde estilo terminal/hacker
    }
}

// Função auxiliar responsável por injetar e carregar os outros arquivos .js sob demanda
function importarScript(src) {
    return new Promise((resolve, reject) => {
        // Remove scripts antigos com o mesmo nome para evitar conflito de cache na página
        const scriptsAntigos = document.querySelectorAll(`script[src="${src}"]`);
        scriptsAntigos.forEach(s => s.remove());

        const script = document.createElement('script');
        script.src = src;
        
        script.onload = () => {
            // Retorna o objeto global que a classe de IA acabou de registrar na memória
            resolve(window.ModuloGerador);
        };
        
        script.onerror = () => reject(new Error(`Falha ao injetar script: ${src}`));
        document.head.appendChild(script);
    });
}

// Dispara o processamento assim que a página termina de carregar no navegador
window.onload = processarRequisicao;
