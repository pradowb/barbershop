# Hero: novo vídeo e novo título

## 1. Vídeo da hero
Substituir o loop atual (navalha/vapor) por um novo vídeo curto (5s, mudo, em loop) de um barbeiro a cortar cabelo com máquina de corte — plano fechado nas mãos e na máquina, sem mostrar o rosto do cliente, luz vermelha quente sobre fundo escuro para manter a paleta.

- Novo asset de vídeo gerado para o projeto; `src/lib/media.ts` passa a apontar para ele.
- Mantém-se o poster/fallback com a imagem atual da hero e o comportamento com `prefers-reduced-motion` (imagem estática).

## 2. Título
"Corte de precisão cirúrgica." passa a "Barbearia Social Fade".

- A animação de revelação por corte (clip-path + brilho) fica aplicada à palavra "Fade", em vermelho, no lugar de "precisão".
- As restantes palavras mantêm o fade + subida escalonada.

## Notas técnicas
- Alterados: `src/lib/media.ts` (URL do novo vídeo), `src/components/site/Hero.tsx` (array de palavras e índice da palavra destacada).
- Sem mudanças de backend, preços, agendamento ou restantes secções.
