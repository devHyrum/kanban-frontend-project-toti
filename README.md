# KANBAN Project Toti

Design Desktop

![demoDesktop](/public/DemoDesktop/Desktop++-1280x720(5).png)

Design Mobile

![demoMobile](/public//DemoMobile/Mobile-359x586(3).png)

## Descrição
Este projeto é uma aplicação web de gerenciamento de tarefas baseada no estilo Kanban, desenvolvida para ajudar empresas a organizarem suas equipes e tarefas de forma mais eficiente. O aplicativo permite que os usuários criem, editem e gerenciem tarefas e equipes em diferentes quadros, proporcionando uma visão clara do fluxo de trabalho.

A aplicação foi desenvolvida usando React para a interface de usuário e CSS puro para o design responsivo e estilização.

## Funcionalidades
- **Criar e Editar Tarefas**: Permite aos usuários criar novas tarefas e editar as existentes, definindo responsáveis, categorias e datas de conclusão.
- **Gestão de Equipes**: Os usuários podem gerenciar membros de equipe e atribuir tarefas a diferentes equipes.
- **Visualização em Quadro Kanban**: As tarefas são organizadas em quadros Kanban, facilitando a visualização do progresso de cada uma.
- **Filtros de Tarefas**: Opção de filtrar tarefas por responsáveis, categoria ou status.
- **Modularização**: Código estruturado de forma modular para facilitar o entendimento e a manutenção.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **CSS** Puro: Para estilização e design da aplicação, garantindo um layout responsivo.
- **Axios**: Para realizar chamadas à API.
- **Context** API (React): Para gerenciar o estado global da aplicação.

## Recomendações
Por favor se mantenham com esta paleta de cores:
**[Paleta de cores](https://imagecolorpicker.com/color-code/7c3aed)**

Como faremos o design do KANBAN? Sigam este figma:
**[Design Board](https://www.figma.com/community/widget/1273992989430283111)**

Todo o website foi baseado deste esboço:
**[Desing WebSite](https://www.figma.com/community/file/1220368226816658013)**

A fonte de letra foi de google:
**[Fonte de Letra](https://fonts.google.com/specimen/Inter)**

Estamos usando uma libraria NPM que mostra um _skeleton_ temporário enquanto carrega as informações:
**[Loader's](https://www.npmjs.com/package/react-content-loader)**

## Estrutura do Projeto
```graphql
src
├── assets                  # Arquivos estáticos, como imagens e ícones
│   ├── Header              # Assets relacionados ao Header
│   └── Sidebar             # Assets relacionados ao Sidebar
├── components              # Componentes reutilizáveis da aplicação
│   └── loadings            # Componentes de carregamento e feedback visual
├── context                 # Context API para gerenciamento de estado global
├── layout
│   ├── modules             # Módulos que compõem o layout geral (Header, Sidebar)
│   ├── pages               # Páginas principais da aplicação
│   │   ├── Ajustes         # Página de configurações
│   │   ├── Boards          # Página principal de quadros Kanban
│   │   ├── Equipes         # Página de gerenciamento de equipes
│   │   ├── Help            # Página de ajuda
│   │   ├── Relatorios      # Página de relatórios
│   │   └── Welcome         # Página inicial de boas-vindas
│   └──App.jsx                 # Componente raiz da aplicação
├── index.css               # Estilos globais da aplicação
└── main.jsx                # Ponto de entrada principal do React
```

## Como clonar o projeto e trabalhar na sua branch

Siga os passos abaixo para clonar o repositório e entrar na sua branch designada:

### 1. Clonar o repositório

Abra o terminal e execute o seguinte comando para clonar o repositório:

```bash
git clone https://github.com/devHyrum/kanban-frontend-project-toti.git
```

### 2. Entrar na pasta do projeto
Após clonar o repositório, entre na pasta do projeto com o seguinte comando:
```bash
cd kanban-frontend-project-toti
```

## Contribuição
Sinta-se à vontade para contribuir com este projeto enviando pull requests ou abrindo issues para sugestões de melhorias.