---
name: Create PhreePet Product Route
overview: Create a new route to highlight the PhreePet application and collect Beta Signups
todos:
  - id: scaffold-route
    content: Create the `/src/pages/products/phreepet` route and integrate Header/Footer layouts.
    status: pending
  - id: build-hero
    content: Implement the Hero section with background image and CTA button.
    status: pending
  - id: build-text-sections
    content: Build the Problem/Solution hook and Privacy Pitch sections.
    status: pending
  - id: build-carousel
    content: Build the interactive image carousel component in `/src/components/phreepet/`.
    status: pending
  - id: build-signup-form
    content: Implement the Call to Action & Beta Signup form with email and device dropdown.
    status: pending
isProject: false
---

# Create PhreePet Product Route

Create a new route or page titled `/src/pages/products/phreepet`.

The page should have the content described below. Do not edit any other routes.

When building the route, place any new modular components in the `/src/components/phreepet/` directory.

# Content

## Hero Section

**Style:** Use `/src/assets/Texture.jpg` as a background image. Refer to `/src/components/Hero/Hero.tsx` for general styling guidelines.
**Headline:** Stop Scrolling. Adopt Your Phone-Free Pet.
**Sub-headline:** Sign up now to join the early-access Alpha.
**Call to Action (CTA) Button:** Waitlist Signup

## The Problem & Solution (Brief Hook)

**Headline:** Break the Scroll. Raise Your Pet.
**Body:** We spend hours mindlessly scrolling. PhreePet uses your device's native screen time tools to help you take that time back. By using a virtual pet as an avatar for your own digital well-being, building healthier routines finally feels rewarding.

## Feature Showcase (Interactive Carousel)

*Note: This section features an image carousel where users can click through screenshots. Below each image, the corresponding text will update dynamically.*

The images can be found in `/src/assets/phreepet/`.

* **Slide 1: The Introduction**
  * *Image:* `story.jpg`
  * *Caption:* **Meet Your New Companion.** Discover the story of your PhreePet and commit to a healthier digital life.
* **Slide 2: The Egg**
  * *Image:* `egg.jpg`
  * *Caption:* **Develop Better Habits.** Earn FocusPoints as a reward for periods of healthy screen time to help your egg hatch.
* **Slide 3: Historical Stats**
  * *Image:* `stats.jpg`
  * *Caption:* **Understand Your Habits.** Get a clear view of how your digital well-being changes over time.
* **Slide 4: The Pet**
  * *Image:* `pet.jpg`
  * *Caption:* **Watch Them Grow.** Your pet needs occasional feeding, attention, and healthy screen time. Put the phone down to keep them thriving!
* **Slide 5: Full Emotional Model**
  * *Image:* `emotions.jpg`
  * *Caption:* **Experience It All.** Too much time scrolling? Leave your pet neglected? The fully featured emotional model will reflect your behavior.
* **Slide 6: Usage Details**
  * *Image:* `details.jpg`
  * *Caption:* **Learn Why.** See your screen time insights and face the reality of your phone-use habits.

## The Privacy Pitch

**Headline:** Zero-Knowledge by Design. Your Data Stays Yours.
**Body:** PhreePet is built on a foundation of absolute privacy, utilizing local-first tools on both iOS and Android.
* **No Raw Data:** We never collect, see, or store what apps you use or how long you use them.
* **On-Device Processing:** Your app limits and usage timers are handled entirely on your device.

## Call to Action & Beta Signup

**Headline:** Be the First to Hatch a PhreePet.
**Body:** The first round of closed Alpha testing is starting soon! Sign up below to reserve your spot and join the movement.
**Form Fields:**
* Email Address (Text Input)
* Primary Device (Dropdown: iOS / Android)
* Submit Button: "Request Access"

## Header & Footer

* Use `/src/layout/Header/Header.tsx` for the top navigation.
* Use `/src/layout/Footer/Footer.tsx` for the bottom footer.

## Test Plan

* Linting via standard project command
* Manual verification of responsive layout and carousel interactions