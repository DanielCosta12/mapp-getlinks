# O projeto "mapp-getlinks" é um script de automação que realiza login em um site e extrai os links de acompanhamento das rotas disponíveis.

## Principais Pontos de Função
- Automação de Login: O script automatiza o processo de login em um site específico, preenchendo os campos necessários e realizando o login de maneira programática.
- Extração de Links: Após o login, o script percorre as rotas disponíveis na página e extrai os links de acompanhamento.
- Envio Futuro de Links por Email: Planeja-se integrar uma funcionalidade de envio dos links extraídos por email, tornando o processo ainda mais prático e útil.
## Stack de Tecnologia
- JavaScript
- Node.js

## Como Usar

### Pré-requisitos

Certifique-se de ter o **Node.js** instalado na sua máquina. Você pode verificar a instalação com:

```bash
node -v
```
### Passos de Instalação
Clone este repositório:

No terminal, use o comando git clone para copiar o repositório para a sua máquina local:

```
git clone https://github.com/seu-usuario/mapp-getlinks.git
```
Entre no diretório do projeto:

Após clonar o repositório, navegue até a pasta do projeto com o comando cd:

```cd mapp-getlinks```

Instale as dependências:

Com o projeto clonado e dentro do diretório, instale as dependências necessárias com o comando npm install:

```npm install```

Crie um arquivo .env: 

No diretório raiz do projeto, crie um arquivo chamado .env para armazenar suas variáveis de ambiente de forma segura, como as credenciais do site.

Exemplo de conteúdo do arquivo .env:

```
SITE_URL=https://example.com/login
USERNAME=seu_usuario
PASSWORD=sua_senha
 ```
Execute o script:

Com todas as dependências instaladas e as variáveis configuradas, você pode executar o script com o seguinte comando:

node index.js
Isso fará o login no site e extrairá os links de acompanhamento das rotas disponíveis.git init