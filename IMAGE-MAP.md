# Mapa de imagens

A página já tem os espaços prontos. A foto grande do hero virou vídeo, e o "como funciona" virou prévia animada do produto; sobram os avatares e a prévia do link. Enquanto o arquivo não existe, aparece um placeholder bege com o nome do arquivo. Para trocar, salve a imagem em `public/images/` com o nome exato da tabela. Não precisa mexer no código.

## Direção comum a todas as fotos

Cole este bloco no início de cada pedido ao GPT:

> Editorial documentary photograph, natural window light, soft and slightly overcast. Muted palette of white, warm grey (#F6F5F4), deep navy (#0E2E54) and neutral greys, with no saturated colors. Shot on a 35mm lens, shallow depth of field, real skin texture, no retouched stock-photo look, nobody smiling at the camera. No text, logos, hospital names or legible documents in the frame. Composition leaves calm negative space.

O que evitar: pose de banco de imagem com jaleco e estetoscópio no pescoço, aperto de mão, martelo de juiz, balança da justiça, holograma de IA, luz azul de "tecnologia".

## Vídeos já na página

Três clipes do [Mixkit](https://mixkit.co/license/#videoFree), licença livre para uso comercial, sem crédito obrigatório. Ficam em `public/video/`, comprimidos (270 a 750 KB cada), com a imagem de capa `.jpg` ao lado.

| Seção | Arquivo | Clipe de origem |
|---|---|---|
| Hero (desktop), atrás do card do contrato | `hero-clipboard.mp4` | Mixkit 17469, médico escrevendo na prancheta |
| Faixa "Your first attending offer…" | `band-residents.mp4` | Mixkit 23069, residentes no corredor |
| CTA final "Read it before you sign it." | `cta-signing.mp4` | Mixkit 28362, assinatura em close |

Para trocar um vídeo, mantenha o nome do arquivo e gere a capa com o mesmo nome em `.jpg`.

## Imagens

- `public/og.png`: prévia do link (1200 × 630), gerada a partir do hero. Para trocar, mantenha o nome.
- Os avatares de depoimento e do conselho consultivo saíram da página: espaço vazio parecia trabalho inacabado. Quando houver fotos reais e autorizadas, eles voltam como `public/images/testimonial-1.webp` etc., com o componente de foto do histórico do git.
