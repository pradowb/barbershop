# Planos simplificados, nova imagem e agendamento com WhatsApp

## 1. Planos — só cortes e barbas, preços intermédios

Remover qualquer venda de produtos/ferramentas dos planos. Nova estrutura de 3 cartões:

- **Avulso — 18€/visita**: corte assinatura, bebida incluída, agenda online.
- **Clube Corte & Barba — 45€/mês** (destaque): 2 cortes + 1 barba por mês, prioridade na agenda, acabamento livre entre visitas.
- **Ilimitado — 69€/mês**: cortes e barbas ilimitados, barbeiro dedicado, horário fora de expediente.

Serviços também ajustados para a mesma faixa: Corte 18€, Barba 12€, Combo 27€, Fade 20€.

## 2. Imagem do "Fade técnico"

Gerar nova imagem sem rosto visível — ideias que funcionam bem:

- Nuca/lateral vista de trás com degradê milimétrico e linha de contorno definida (opção escolhida como principal).
- Detalhe macro do degradê com luz lateral vermelha discreta.
- Vista de cima da cabeça, foco na textura do corte.

Vou usar a primeira (nuca vista de trás, sem rosto), em tom escuro com acento vermelho, e substituir `cut-1.jpg`. Também trocar o terceiro card (ferramentas) por um detalhe de barba/corte, para não parecer venda de ferramentas.

## 3. WhatsApp — botão de contacto direto

Link `wa.me` (sem API nem verificação): botão flutuante discreto + botões no CTA e nos cartões de plano, com mensagem pré-preenchida (serviço/plano escolhido). O número fica num único ficheiro de configuração para poder editar quando me indicar o número real (por agora um placeholder).

## 4. Fluxo de agendamento com calendário + WhatsApp

Escolha aprovada: agenda com base de dados (Lovable Cloud). Fluxo:

```text
Cliente escolhe serviço
   -> calendário mostra dias (Ter–Sáb)
   -> horários livres (slots de 30/45 min, já sem os ocupados)
   -> preenche nome + telefone
   -> reserva gravada (estado: pendente)
   -> abre WhatsApp com o resumo da marcação para confirmação
Barbearia responde no WhatsApp e confirma
```

Detalhes:
- Horário base: Ter–Sáb, 10h–20h; duração por serviço define os slots.
- Slots já reservados aparecem indisponíveis (evita choques).
- Nada de dados sensíveis expostos: o público só consegue ver quais horários estão ocupados, nunca nomes ou telefones de outros clientes.
- Painel de gestão da barbearia não está incluído neste passo (a confirmação acontece por WhatsApp). Posso acrescentar depois.

## Notas técnicas

- Ativar Lovable Cloud e criar tabela `bookings` (serviço, data/hora, duração, nome, telefone, estado) com RLS: inserção pública validada, leitura pública limitada a uma vista/função que devolve apenas slots ocupados; leitura completa só para admin.
- Nova secção `Booking` com seletor de serviço, calendário (dias + slots) e formulário, chamando server functions em `src/lib/bookings.functions.ts`.
- Constante `WHATSAPP_NUMBER` em `src/lib/contact.ts` para o link `wa.me`.
- Sem bibliotecas pesadas de calendário: grelha própria em Tailwind, mantendo o motion atual e `prefers-reduced-motion`.
- Imagens geradas em 900x1200, `loading="lazy"`, mantendo o peso atual.
