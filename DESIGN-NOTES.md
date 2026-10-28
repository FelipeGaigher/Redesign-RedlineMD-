# Redline MD: design notes

A one-page concept for the Foundey design challenge. Two sections are fully finished, the hero with upload and the ROI section with how it works. Trust, testimonials, FAQ and footer are simpler and are there for context.

## Diagnosis

I started by clicking through the current site on a phone. Two things explained most of the brief.

1. **The funnel ends in a Google Form.** Every "Get your Analysis" button links to `forms.gle`, and the sample report is a Google Drive file. A form with file upload asks the visitor to sign in to Google. On a phone this is the worst point to stop someone: the visitor has just come from an ad, has to sign in, and often doesn't have the PDF on that device at all. This is the most likely reason mobile brings 35% of the traffic and less than 10% of the revenue.
2. **Nothing on the page looks like a physician's contract.** The hero mockup shows "License Grant" and "ACME Corp" (a commercial or IP contract), the "Without" screenshot has garbled, AI-generated text, and the numbers disagree ($10,000 in one section, $50,000 in another, plus an unsourced "30% salary increase"). For a skeptical, evidence-trained buyer, each of these takes away trust. The logo subtitle also reads "Medical Contract Reiew".

## Four decisions

**1. One action, always under the thumb.** "Upload your contract" is the only primary button on the page, in the brand's existing yellow with charcoal text (13:1). Everything else is a navy outline or a text link. On mobile, a fixed bar with the price and the button slides in once the hero CTA scrolls away, and hides at the footer and while the upload sheet is open.

**2. Upload replaces the form, and keeps the intent when the file isn't there.** The CTA opens a native sheet: drag and drop on desktop, file picker or camera on mobile, then upload progress, a visible analysis checklist, and a free preview of the findings with one risk shown and two locked. Next to the dropzone there is a second path: *"Contract not on this device? Email me a secure upload link."* That one line is the mobile strategy. A phone visitor who can't upload no longer bounces. They leave an email and finish on the laptop. (Everything is simulated in the browser. No file is sent anywhere.)

**3. Show the product, then prove it.** The hero's centerpiece is a physician's clause (§ 7.3, tail coverage) redlined the way Word shows track changes: the risky sentence struck in red, employer-paid language inserted in green, a comment with the dollar exposure. Right below the hero, the numbers sit as a quiet strip, not a section, and the page goes straight into how it works: three steps that advance on their own, each with a live preview (upload, redline, negotiation email). A diagram then shows what the engine checks and what it flags. Selling the product comes before any price comparison.

**4. The existing brand, made to look like it can be trusted with a contract.** I kept Redline MD's logo, red, navy and yellow, and cropped off the misspelled tagline. One sans family (Hanken Grotesk) with mono only for technical data, one 4px radius, no decorative gradients. Real footage of residents and of a signature replaces the generic dashboard mockups, so the page shows the person and the moment it is about. The structure and motion follow digai.ai (two-tone title, pixel grid, auto-advancing steps, live diagram, dark proof section), translated into this brand. The page also ships in English and Portuguese.

Trust replaces the five unlinked certification badges with three plain promises a doctor actually worries about: encrypted, deleted after review, never shared with the employer. Plus an honest answer to "Is this legal advice?"

The full token and component list is in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

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
