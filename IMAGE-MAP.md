# Mapa de imagens

A página já tem os espaços prontos. Enquanto o arquivo não existe, aparece um placeholder bege com o nome do arquivo. Para trocar, salve a imagem em `public/images/` com o nome exato da tabela. Não precisa mexer no código.

## Direção comum a todas as fotos

Cole este bloco no início de cada pedido ao GPT:

> Editorial documentary photograph, natural window light, soft and slightly overcast. Muted palette of warm off-white (#F7F6F2), deep navy (#0E1B2C) and neutral greys, with no saturated colors. Shot on a 35mm lens, shallow depth of field, real skin texture, no retouched stock-photo look, nobody smiling at the camera. No text, logos, hospital names or legible documents in the frame. Composition leaves calm negative space.

O que evitar: pose de banco de imagem com jaleco e estetoscópio no pescoço, aperto de mão, martelo de juiz, balança da justiça, holograma de IA, luz azul de "tecnologia".

## Imagens por seção

| # | Seção | Arquivo | Formato | Tamanho de exportação | Peso alvo | Obrigatória |
|---|---|---|---|---|---|---|
| 1 | Hero (desktop) | `hero-physician.webp` | 4:5 vertical | 1200 × 1500 | ≤ 140 KB | sim |
| 2 | Como funciona | `how-resident-phone.webp` | 4:5 vertical | 1200 × 1500 | ≤ 140 KB | sim |
| 3 | Faixa de confiança | `advisor-1.webp`, `advisor-2.webp`, `advisor-3.webp` | 1:1 | 256 × 256 | ≤ 20 KB | não |
| 4 | Depoimentos | `testimonial-1.webp`, `testimonial-2.webp` | 1:1 | 256 × 256 | ≤ 20 KB | não |
| 5 | Prévia do link | `og.png` | 1.91:1 | 1200 × 630 | ≤ 300 KB | recomendada |

### 1. Hero: `hero-physician.webp`

**Função:** pôr uma pessoa atrás do contrato. O card animado de redline cobre o terço inferior esquerdo da foto, e o card de preço cobre o canto superior direito. **Deixe essas duas áreas sem nada importante.** O rosto e as mãos ficam no terço superior central.

**Prompt:**

> [direção comum] Vertical 4:5 portrait. A physician in her early thirties, navy scrubs, hair loosely tied, sitting at a kitchen table at dusk after a shift, reading a printed multi-page employment contract with a pen in hand, concentrated and slightly uneasy. Laptop half-closed beside her, a mug. The lower-left third of the frame is a plain, out-of-focus tabletop; the upper-right corner is a soft plain wall. Face and hands in the upper-middle of the frame.

**Alt:** "A young physician in scrubs reading her employment contract at home" (já está no código, em `src/components/Hero.tsx`).

### 2. Como funciona: `how-resident-phone.webp`

**Função:** provar o argumento do mobile. O residente faz o upload pelo celular, entre um plantão e outro. No celular a imagem é cortada em 4:3, então mantenha o assunto no centro.

**Prompt:**

> [direção comum] Vertical 4:5. A male resident in his late twenties in navy scrubs and a fleece vest, standing in a quiet hospital corridor near a window, photographing a printed contract page with his phone held flat above it. Over-the-shoulder angle so the phone and the paper are the focus; the page text is blurred and illegible. Subject centered so a 4:3 crop still works.

**Alt:** "A resident in a hospital corridor photographing his contract pages with his phone". Se gerar mulher, troque "his" por "her" no alt em `src/components/Roi.tsx`.

### 3. Faixa de confiança: `advisor-1..3.webp`

**Função:** rostos do conselho consultivo (médicos e advogados de saúde).

⚠️ **Só use foto real e com autorização.** Rosto gerado por IA ao lado de "Built with input from physicians and healthcare attorneys" vira prova social falsa, que é exatamente a falta de confiança que o redesign quer resolver. Para o conceito, deixe o placeholder (o código já mostra a legenda "placeholder until names are confirmed"). Se quiser preencher só para o print, use o prompt e mantenha a legenda.

**Prompt (gere 3, variando idade, gênero e etnia):**

> [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a [healthcare attorney in a navy blazer | physician in her fifties in a white coat | physician in his forties in a navy quarter-zip], calm neutral expression, soft light from the left.

### 4. Depoimentos: `testimonial-1.webp`, `testimonial-2.webp`

**Função:** avatar ao lado do depoimento. Os cards já levam o selo "Illustrative testimonial". Combine cada rosto com a especialidade do texto.

- **testimonial-1** (Emergency medicine, PGY-3):
  > [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a female emergency medicine resident around 30, navy scrubs, tired but relieved expression.
- **testimonial-2** (Family medicine, new attending):
  > [direção comum] Square head-and-shoulders portrait, plain warm off-white background, a male family physician around 34, light blue button-down shirt, calm expression.

### 5. Prévia do link: `og.png`

**Função:** é a imagem que aparece quando o link da Vercel é colado num e-mail ou no Slack da Foundey. Recomendo montar no Figma em vez de gerar: fundo `#F7F6F2`, o H1 "Don't sign your first contract blind." em Newsreader 500 com "blind." em vermelho `#C8102E`, e um recorte do card de redline.

## Depois de gerar

1. Converter para WebP com qualidade 75 a 80 (Squoosh ou `cwebp -q 78`).
2. Conferir o peso alvo. O hero é a única imagem carregada sem lazy-load, então ela pesa direto no Lighthouse mobile.
3. Salvar em `public/images/` com o nome exato e fazer push. A Vercel publica sozinha.
