# Flab2Fit with Darshana — Landing Page

A lightweight, responsive static website built with plain HTML, CSS and JavaScript. It is designed to be easy to edit and upload directly to GitHub Pages. No build step, npm install or backend is required for the basic site.

## Files

- `index.html` — all page sections and copy
- `styles.css` — colours, layout, responsive design and interactions
- `script.js` — booking modal, payment/calendar configuration and mobile navigation
- `assets/` — logo, favicon, Darshana image placeholder and the seven uploaded client journey images

## 1. Add Darshana's real photo and logo

The current project includes a simple SVG placeholder for Darshana and a text-based temporary logo asset. Replace these with the approved brand assets:

- Replace `assets/darshana-placeholder.svg` with the final image, or update the two image `src` values in `index.html` to your photo filename.
- Replace `assets/logo.svg` with the official logo (keep the same filename if possible).
- `assets/favicon.svg` is the favicon. Replace it with an approved favicon if one exists.

Do not publish a person's photo or a client transformation image without the relevant permission.

## 2. Add your Razorpay payment link

Open `script.js` and find:

```js
PAYMENT_LINK: "RAZORPAY_PAYMENT_LINK_HERE",
```

Replace the placeholder with your Razorpay Payment Link, for example:

```js
PAYMENT_LINK: "https://rzp.io/i/your-real-link",
```

Use the real URL supplied from your Razorpay dashboard. Do not put Razorpay API secrets or secret keys in this project.

### Recommended booking flow

1. Visitor clicks **Book consultation for ₹99**.
2. The Razorpay Payment Link opens in a new tab.
3. Configure the Payment Link's successful-payment redirect to the deployed website URL with `?payment=success`, for example `https://your-domain.com/?payment=success`.
4. When the visitor returns via that redirect, this page opens the calendar popup so they can select an appointment time.
5. Google Calendar appointment scheduling creates the event using the settings on your appointment schedule.

If your Razorpay setup does not support a redirect URL, visitors can return to the landing page and click **I’ve completed payment — choose a time** in the booking popup.

**Important payment limitation:** a static website cannot securely verify that a payment succeeded. A query parameter or redirect is not proof of payment. For a production flow where only paid users can book, connect Razorpay webhooks to a small backend/serverless function and validate the payment before allowing calendar access. Do not rely on a client-side flag to enforce payment.

## 3. Add Google Calendar scheduling inside the website

Create an **Appointment schedule** in Google Calendar. Configure the availability, meeting duration, location/video call details, booking form and calendar settings there.

Google Calendar provides a public booking page and an embed option for appointment schedules. Copy the **embed URL** provided by Google Calendar (not a guessed URL) and set it in `script.js`:

```js
CALENDAR_EMBED_URL: "GOOGLE_CALENDAR_APPOINTMENT_EMBED_URL_HERE",
CALENDAR_PUBLIC_URL: "GOOGLE_CALENDAR_APPOINTMENT_PUBLIC_URL_HERE",
```

Replace both placeholders:

- `CALENDAR_EMBED_URL` — the Google-provided embed URL. This is shown inside the modal on the current website.
- `CALENDAR_PUBLIC_URL` — the public appointment booking page URL. This is shown as a fallback link if embedding is blocked.

Some Google Calendar appointment pages or account configurations may not permit embedding in every browser. Keep the fallback link configured. The website cannot control Google Calendar's internal confirmation emails; configure those settings in Google Calendar.

### About payment and calendar event creation

Google Calendar's public appointment scheduler books an event when the visitor completes its booking flow. It does not provide a supported static-page callback that can safely hold an unconfirmed slot and then create the event only after a separate Razorpay payment. This project therefore uses the practical order **payment → calendar scheduling**. If you need a slot to be selected first, payment second, and the event to be created only after payment, that requires a custom booking backend and calendar integration (plus payment verification/webhooks); a static-only page cannot reliably implement that transaction.

## 4. WhatsApp

The WhatsApp number is configured in `index.html` as:

`https://wa.me/919860630123?text=START`

To change the number or prefilled message, update the WhatsApp links in `index.html`. The floating button stays visible while scrolling.

## 5. Testimonials / transformation images

The seven supplied images are included in `assets/` and shown in the **Client journeys** section. Current captions are intentionally general rather than invented testimonials. Add a client's exact written review only when you have the approved wording and permission to publish it. The note below the gallery explains that individual outcomes vary.

To reorder or remove images, edit the `story-grid` in `index.html`. Each card's image path and alt text are written directly in the HTML.

## 6. Edit price and page copy

Search in `index.html` for `₹99` to update consultation pricing and related copy. The main booking CTA and booking modal copy are all in `index.html` (some modal text is also set in `script.js`).

Brand colours are near the top of `styles.css`:

```css
--orange: #F8931F;
--green: #98C03D;
```

## 7. Upload to GitHub Pages

1. Unzip this project.
2. Open the repository where you want the website.
3. Upload `index.html`, `styles.css`, `script.js`, `README.md` and the entire `assets` folder to the repository root.
4. In GitHub, open **Settings → Pages**.
5. Choose **Deploy from a branch**, select your branch (usually `main`) and folder `/ (root)`, then save.
6. After deployment, test the live site on mobile and desktop. Configure your custom domain in GitHub Pages if needed.

Because `index.html` is at the repository root and all paths are relative, the project works with GitHub Pages without a build process.

## 8. Before going live

- [ ] Replace the temporary logo with the official logo
- [ ] Replace Darshana's placeholder with her approved photo
- [ ] Add the real Razorpay Payment Link
- [ ] Configure the Razorpay successful-payment redirect
- [ ] Add Google Calendar embed and public booking URLs
- [ ] Confirm the appointment schedule availability and timezone
- [ ] Confirm permission for every client image and testimonial
- [ ] Test the payment redirect and calendar flow on mobile
- [ ] If payment must be verified before booking, add server-side Razorpay webhook verification
- [ ] Confirm any social links and professional qualifications before publishing

## Medical and advertising note

The page avoids guaranteed weight-loss promises and disease-cure claims. Nutrition guidance should not be presented as a substitute for medical diagnosis or treatment. Ensure all client images, results and statements are accurate, permissioned and compliant with applicable advertising rules.
