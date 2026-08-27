# Navalha — redesenho "vivo" com motion

Mantém a paleta preto/vermelho e a tipografia bold atuais. Todo o trabalho é de frontend/apresentação: nada muda na base de dados nem na lógica de marcações (o fluxo continua a gravar no backend e a confirmar por WhatsApp).

## 1. Hero

- Vídeo em loop (3-5s, mudo, autoplay, `playsInline`, poster = imagem atual) a substituir a foto: navalha a deslizar / vapor de toalha quente em luz vermelha. Gerado como asset do projeto; a imagem atual fica como poster e fallback.
- Letreiro neon "Stay Sharp" novo, com flicker sutil (glow + opacidade em keyframes irregulares, a cada poucos segundos).
- Badge "Lisboa · desde 2014": ponto vermelho com pulso "ao vivo".
- Headline: a palavra "precisão" revelada por um traço de navalha (clip-path da esquerda para a direita) com um brilho fino a acompanhar o corte.
- Botão "Reservar horário": ícone de navalha que desliza ao hover, como se cortasse o botão.
- Cursor personalizado (navalha) apenas dentro da hero, em desktop com ponteiro fino.

## 2. Serviços

- Hover nos cards: tilt 3D leve (rotação seguindo o rato) + glow vermelho na borda.
- Ícone SVG por serviço (pente, navalha, tesoura, toalha) com animação de traço a ser desenhado no hover.
- Preços com count-up de 0 até ao valor quando o card entra na viewport.

## 3. Planos

- Card "Mais escolhido" com borda de gradiente animada em rotação lenta.
- Botões com "squish" tátil (scale rápido para baixo/cima) ao clicar.

## 4. Agendamento

- Seleção de dia com reorganização em spring (layout animation), não troca instantânea.
- Horários indisponíveis com opacidade pulsante suave ("a esfriar").
- Ao confirmar: transição wipe de navalha sobre o painel antes da mensagem de confirmação e da abertura do WhatsApp.

## 5. Decorativos

- Camada de SVGs de baixo contraste (respingos de espuma, linhas de corte, fumo) a flutuar lentamente em secções escolhidas, com parallax muito subtil e `pointer-events: none`.

## 6. Microcopy

Textos com humor seco, ainda em pt-PT. Propostas:

- "Ver serviços" → "Sem enrolação"
- Serviços: "Poucos serviços. Executados ao detalhe." → "Fazemos pouco. Fazemos bem."
- Planos: "Sem produtos, sem extras. Só cortes e barbas."
- Agendar: "A cadeira está livre. A tua desculpa, não."

## 7. Rodapé / WhatsApp

- Botão flutuante com "respiração" (pulse leve), texto "Falar com o barbeiro" e troca de ícone no hover (WhatsApp ↔ navalha).

## Notas técnicas

- Framer Motion para reveals, tilt, layout springs e wipes; keyframes CSS em `src/styles.css` para flicker, pulso, gradiente rotativo e float dos decorativos.
- Só `transform`/`opacity`/`clip-path`; sem animar layout pesado. Vídeo com `preload="metadata"`, poster e lazy fora do primeiro ecrã.
- `prefers-reduced-motion`: flicker, pulsos, float, tilt e vídeo desativados (poster estático); reveals passam a fade curto.
- Novos ficheiros previstos: `src/components/site/NeonSign.tsx`, `src/components/site/ServiceIcons.tsx`, `src/components/site/FloatingDecor.tsx`, `src/components/site/CountUp.tsx`, `src/assets/hero-loop.mp4`.
- Alterados: `Hero.tsx`, `Services.tsx`, `Plans.tsx`, `Booking.tsx`, `WhatsAppButton.tsx`, `styles.css`.
