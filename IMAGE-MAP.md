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

## Imagens que ainda faltam

| # | Seção | Arquivo | Formato | Tamanho de exportação | Peso alvo | Obrigatória |
|---|---|---|---|---|---|---|
| 1 | Conselho consultivo (seção escura) | `advisor-1.webp`, `advisor-2.webp`, `advisor-3.webp` | 1:1 | 256 × 256 | ≤ 20 KB | não |
| 2 | Depoimentos | `testimonial-1.webp`, `testimonial-2.webp` | 1:1 | 256 × 256 | ≤ 20 KB | não |
| 3 | Prévia do link | `og.png` | 1.91:1 | 1200 × 630 | ≤ 300 KB | recomendada |

### 1. Conselho consultivo: `advisor-1..3.webp`

**Função:** rostos do conselho consultivo (médicos e advogados de saúde).

⚠️ **Só use foto real e com autorização.** Rosto gerado por IA ao lado de "Built with input from physicians and healthcare attorneys" vira prova social falsa, que é exatamente a falta de confiança que o redesign quer resolver. Para o conceito, deixe o placeholder (o código já mostra a legenda "placeholder until names are confirmed"). Se quiser preencher só para o print, use o prompt e mantenha a legenda.

**Prompt (gere 3, variando idade, gênero e etnia):**

> [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a [healthcare attorney in a navy blazer | physician in her fifties in a white coat | physician in his forties in a navy quarter-zip], calm neutral expression, soft light from the left.

### 2. Depoimentos: `testimonial-1.webp`, `testimonial-2.webp`

**Função:** avatar ao lado do depoimento. Os cards já levam o selo "Illustrative testimonial". Combine cada rosto com a especialidade do texto.

- **testimonial-1** (Emergency medicine, PGY-3):
  > [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a female emergency medicine resident around 30, navy scrubs, tired but relieved expression.
- **testimonial-2** (Family medicine, new attending):
  > [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a male family physician around 34, light blue button-down shirt, calm expression.

### 3. Prévia do link: `og.png`

**Função:** é a imagem que aparece quando o link da Vercel é colado num e-mail ou no Slack da Foundey. Recomendo montar no Figma em vez de gerar: fundo branco, o logo, o H1 "Don't sign your first contract blind." em Hanken Grotesk 600 com "blind." em azul-marinho `#0E2E54`, e um recorte do card de redline.

## Depois de gerar

1. Converter para WebP com qualidade 75 a 80 (Squoosh ou `cwebp -q 78`).
3. Salvar em `public/images/` com o nome exato e fazer push. A Vercel publica sozinha.
