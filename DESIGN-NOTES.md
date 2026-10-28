# Redline MD: design notes

A one-page concept for the Foundey design challenge. Two sections are fully finished, the hero with upload and the ROI section with how it works. Trust, testimonials, FAQ and footer are simpler and are there for context.

## Diagnosis

I started by clicking through the current site on a phone. Two things explained most of the brief.

1. **The funnel ends in a Google Form.** Every "Get your Analysis" button links to `forms.gle`, and the sample report is a Google Drive file. A form with file upload asks the visitor to sign in to Google. On a phone this is the worst point to stop someone: the visitor has just come from an ad, has to sign in, and often doesn't have the PDF on that device at all. This is the most likely reason mobile brings 35% of the traffic and less than 10% of the revenue.
2. **Nothing on the page looks like a physician's contract.** The hero mockup shows "License Grant" and "ACME Corp" (a commercial or IP contract), the "Without" screenshot has garbled, AI-generated text, and the numbers disagree ($10,000 in one section, $50,000 in another, plus an unsourced "30% salary increase"). For a skeptical, evidence-trained buyer, each of these takes away trust. The logo subtitle also reads "Medical Contract Reiew".

## Four decisions

**1. One action, always under the thumb.** "Upload your contract" is the only primary button on the page, in ink on paper (16:1 contrast). I tested a trust blue (#1D4ED8). It passed AA too, but it read as SaaS. Ink reads as legal. On mobile, a fixed bar with the price and the button slides in once the hero CTA scrolls away, and hides at the footer and while the upload sheet is open.

**2. Upload replaces the form, and keeps the intent when the file isn't there.** The CTA opens a native sheet: drag and drop on desktop, file picker or camera on mobile, then upload progress, a visible analysis checklist, and a free preview of the findings with one risk shown and two locked. Next to the dropzone there is a second path: *"Contract not on this device? Email me a secure upload link."* That one line is the mobile strategy. A phone visitor who can't upload no longer bounces. They leave an email and finish on the laptop. (Everything is simulated in the browser. No file is sent anywhere.)

**3. Show the product instead of describing it.** The hero's centerpiece is a real-looking clause, § 7.3 Professional liability, being redlined. The physician-paid tail sentence is struck in red, employer-paid language is inserted in green, and a tag shows "Risk: ~$12,000 exposure". It loops every 6 seconds, pauses off-screen, and stays static with reduced motion. Within three seconds it says what the product does and why it matters to this buyer.

**4. ROI as numbers, and a visual language from law and medicine.** $199, $500+ and $10,000+ are set large, in that order: what you pay, what you'd pay, what you'd lose. A bar compares the two review prices. The type is an editorial serif (Newsreader) for authority and Hanken Grotesk for the interface. The palette is paper, ink, and the two colors of a real redline, red for struck text and green for accepted text. No gradients, glow or emoji. Every color, font and shadow is a token in `src/index.css`.

Trust replaces the five unlinked certification badges with three plain promises a doctor actually worries about: encrypted, deleted after review, never shared with the employer. Plus an honest answer to "Is this legal advice?"

## Things I marked as placeholders

Turnaround (I kept the current site's 24 hours rather than promising minutes), the money-back guarantee, the $10,000+ average, the advisory board, and both testimonials, which are labeled "Illustrative". The free preview before payment is a proposal for the client, not current behavior.

## With more time

- A/B test the H1 ("Don't sign your first contract blind" vs. a tail-insurance-led headline) on paid traffic only.
- One landing page per Google Ads keyword cluster (tail insurance, non-compete, residency-to-attending), sharing these components.
- Real social proof: named reviews, the review count, and advisor names with credentials.
- Checkout (Stripe) inside the same sheet, and the email-link flow wired to a real backend.
- Load framer-motion lazily to cut the JS bundle for the mobile Lighthouse score.

## Speed vs. quality

The brief allowed one hour. I spent the first part on diagnosis, because the biggest problem turned out to be the funnel and not the layout. Then I finished two sections completely, with every state, both breakpoints and reduced motion, instead of six sections at average quality. The supporting sections reuse the same tokens and components, so extending the page is assembly, not new design.
