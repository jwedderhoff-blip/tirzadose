# TirzaDose

Aplicativo PWA para acompanhamento de tratamento com **tirzepatida** — controle de doses, aplicações, peso, IMC, sintomas e dieta, tudo em um único arquivo instalável no celular.

---

## Acesso

**URL:** [jwedderhoff-blip.github.io/tirzadose](https://jwedderhoff-blip.github.io/tirzadose/)

O app roda direto no navegador e pode ser instalado como PWA (Progressive Web App) na tela inicial do celular ou no desktop via Chrome/Safari — funciona sem internet após a primeira carga.

---

## Funcionalidades

### Conta e Onboarding

O app oferece **dois modos de uso**:

- **Com conta** (via Supabase Auth — e-mail + senha): sincroniza dados entre dispositivos.
- **Sem conta**: todos os dados ficam salvos localmente no dispositivo (localStorage). Ideal para uso pessoal em um único aparelho.

No primeiro acesso, um assistente de configuração percorre 4 etapas:
1. Login ou escolha de usar sem conta
2. Perfil pessoal (nome, peso inicial, altura, data de início, dia da semana da aplicação, data de nascimento, sexo)
3. Preferências de dieta (ingredientes que prefere evitar)
4. Ativação de lembretes (notificação no dia da aplicação)

---

### Aba: Início

Painel resumido com as informações mais relevantes do momento:
- Próxima aplicação (contagem regressiva e dose)
- Peso atual e variação
- IMC atual com classificação
- Dose atual e dose inicial

---

### Aba: Aplicações

**Sub-aba — Aplicação:**
- **Próxima aplicação:** data e dose recomendada pelo protocolo ativo, com botão de registro
- **Calculadora de dose:** estimativa baseada na fase atual do protocolo
- **Histórico de aplicações:** lista colapsável com todas as aplicações registradas (data e dose), com opção de excluir registros

**Sub-aba — Protocolo:**

Define o escalonamento de dose ao longo do tratamento. Há 4 protocolos predefinidos e opção de protocolo personalizado:

| Protocolo | Descrição |
|---|---|
| Protocolo Padrão | Escalonamento completo até 15 mg conforme bula |
| Protocolo Personalizado | Até 12,5 mg com regressão gradual até 5 mg de manutenção |
| Protocolo Conservador | Escalonamento lento (6 semanas/etapa), manutenção em 10 mg |
| Protocolo Mínimo | Escalonamento até 5 mg de manutenção |
| **Personalizado** | Nome e etapas (dose + semanas) definidos pelo usuário |

A linha do tempo do protocolo ativo é exibida com marcação da fase atual.

---

### Aba: Dieta

- **Cardápio semanal** gerado e adaptado às preferências de dieta do usuário (ingredientes marcados para evitar)
- **Dicas de dieta** específicas para uso com tirzepatida
- Cardápio reorganizado automaticamente ao atualizar as preferências

---

### Aba: Progresso

**Evolução do Peso:**
- Gráfico interativo (Chart.js) com linha de peso e linha tracejada de IMC em eixo duplo
- Registro de pesagens com data
- Filtros de período (1 m, 3 m, 6 m, 1 a, tudo)

**Peso × Aplicações:**
- Tabela colapsável cruzando datas de pesagem, aplicações e registros de sintomas
- Indicador 🩺 em dias com sintomas registrados

**Histórico de Sintomas:**
- Registro de sintomas por data com seleção de chips:
  Náusea · Vômito · Diarreia · Constipação · Dor abdominal · Fadiga · Tontura · Falta de apetite · Dor no local · Refluxo
- Escala de severidade de 1 a 5
- Campo de observações livres
- Lista colapsável com opções de **editar** e **excluir** cada registro

**Tabela de IMC:**
- Tabela com faixas de IMC e classificação (Abaixo do peso → Obesidade III)
- Destaque da faixa atual do usuário

---

### Aba: Perfil

- Edição de dados pessoais (nome, peso, altura, data de nascimento, sexo, data de início, dia da semana da aplicação)
- Status de conta: login/logout, exibição de avatar e e-mail quando autenticado
- Preferências de dieta
- Tema: claro / escuro / sistema
- Dados de desenvolvimento: botão para carregar base de teste completa

---

### Card de Compartilhamento

Gerado via Canvas API — imagem 1080 × 1200 px pronta para compartilhar nas redes:

- **Cabeçalho:** nome do usuário e semana de tratamento
- **Faixas de peso:** peso inicial (com IMC inicial) e peso atual (com IMC atual)
- **Gráfico:** evolução do peso (linha verde) + evolução do IMC (linha tracejada roxa) com eixos duplos e escala Y visível
- **Barra de stats:** semanas em tratamento · número de aplicações · dose atual (com progressão)
- **Rodapé:** data de geração + QR code com link direto para o app

---

## Tecnologias

| Componente | Detalhe |
|---|---|
| Estrutura | Single-file PWA (`index.html`) |
| Armazenamento local | `localStorage` (chave `tirzadose_v2`) |
| Auth e sync | Supabase Auth (`@supabase/supabase-js@2.50.0`) |
| Gráficos | Chart.js 4.4.0 |
| QR Code | QRious 4.0.2 |
| Card de compartilhamento | Canvas API |
| Offline | Service Worker com cache-first para assets e network-first para HTML |
| Hospedagem | GitHub Pages |

---

## Instalação como PWA

**Android (Chrome):**
1. Abra o link no Chrome
2. Menu ⋮ → "Adicionar à tela inicial"

**iOS (Safari):**
1. Abra o link no Safari
2. Botão de compartilhar → "Adicionar à Tela de Início"

**Desktop (Chrome):**
1. Abra o link
2. Ícone de instalação na barra de endereços → "Instalar"

---

## Privacidade

- Sem conta: **nenhum dado sai do dispositivo**. Tudo fica no `localStorage` do navegador.
- Com conta: dados sincronizados via Supabase (banco de dados na nuvem, projeto privado).
- O app não coleta dados de terceiros nem usa rastreadores.
