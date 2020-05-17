<h1 align="center" style="font-size: 42px; font-weight: bolder;">
  <a href="https://wanianki.com">
    <img src="https://user-images.githubusercontent.com/2817993/81977026-18fd3500-9632-11ea-9145-07634e3544c1.png" alt="WaniAnki" width="200">
  </a>
  <div>
    WaniAnki
  </div>
</h1>

<h3 align="center">Review App for WaniKani</h3>
<p align="center">Sail through your reviews without typing. Just recall, reveal and swipe.</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#platforms">Platforms</a> •
  <a href="#reliability">Reliability</a> •
  <a href="#feature-requests">Feedback</a> •
  <a href="#further-contact">Contact</a>
</p>

<p align="center">
<br />
<br />
<img src="https://user-images.githubusercontent.com/2817993/82143706-81286280-984e-11ea-9336-b982002f6d80.gif" width="220" alt="WaniAnki"> 
</p>

## Introduction

WaniAnki is a minimalistic review app for [WaniKani](https://www.wanikani.com/) optimized for speed. It eliminates the need for typing; you just have to recall, reveal the answer and submit by swiping left or right.

WaniAnki was inspired by the popular flashcard app [Anki](https://ankiweb.net/) in the sense that it allows you to reveal the answer instead of having to typing it out, and it features Tinder-like swipe gestures to submit your answers. Just login with your WaniKani Personal Access Token and start swiping.

### User Interface

Cards are fairly simple; they show the Japanese characters and the question text under it. The characters are color coded in WaniKani color scheme; purple for vocabulary, pink for kanji and light blue for radicals. After you recall, simply use the `Reveal` button to reveal the answer. It's a press & hold interaction to avoid accidental touches. On the web (desktop), you can reveal the answer using the space bar as well. Once revealed, the answer will be displayed under the characters: if you got the answer right, swipe **right**, if you got it wrong, swipe **left**. On desktop (web), you can use the arrow keys instead of swiping. That's all there is to it. 

<img width="400" alt="Screen Shot 2020-05-17 at 7 27 03 PM" src="https://user-images.githubusercontent.com/2817993/82154792-0fb1d980-9879-11ea-801e-114f3965b0c9.png">

As for the review stats below the cards; the top and bottom rows show **completed** review and card data respectively. A "card" represents a question, every single question asked in a review session comes in a card, it's basically a *review / review type* pair. (ie. for one vocab or kanji review, there are two cards - reading and meaning, for one radical review there is one card - meaning).

The bars displays the percentage of the **completed** correct / incorrect reviews / cards respectively. A card is completed when you get it right, and a review is completed when you get all the cards for a review right. If you get a card wrong, it'll be requeued and asked again, and it won't be included in the percentage until you get it right. Same goes for reviews. Once you get a card / review right, it will be count as correct if you didn't submit an incorrect answer for it previously, otherwise, it'll be count as incorrect. (The number of incorrect answers you've submitted for a card / review isn't reflected on the bar - as it'll just count as one wrong answer - but it'll be submitted to WaniKani).

The `X of Y` displays show the number of items you have *completed* (`X`), and the number of items you have available in total (`Y`). The `Y` of the top bar shows how many reviews you have in that session, and the `Y` of the bottom bar shows how many cards you have in total (ie. how many questions you'll be answering). The `X` of the top bar is the number of reviews you have completed, and its superscript shows the number of half finished reviews, that is, the number of reviews that are not completed but has one completed part. It could also be thought as the number of reviews that'll lost if you close the app mid-session. The `X` at the bottom bar shows the number of cards you have completed.

## Platforms

WaniAnki is a cross-platform application, natively awailable on mobile platforms and is also available for the web. It's built with [React Native](https://reactnative.dev/), and uses [react-native-web](https://github.com/necolas/react-native-web) for the web support. There are a few different ways of using WaniAnki, below you can find details and links for these methods. Note that Web, PWA and Expo apps will receive updates / bug fixes more frequently and earlier than the native iOS and Android counterparts due to the review processes of the app stores.

### iOS

<a href="#">
  <img src="https://user-images.githubusercontent.com/2817993/82145767-ea11d980-9852-11ea-8880-704240dcbeae.png" height="40" alt="WaniAnki App Store">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82147983-1b41d800-985a-11ea-9e91-1321b85af125.png" width="70%" alt="WaniAnki iOS Screenshots">
</a>

### Android

<a href="#">
  <img src="https://user-images.githubusercontent.com/2817993/82146513-8dfb8500-9853-11ea-9769-bb2f81a1afe1.png" height="40" alt="WaniAnki Google Play">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82147988-25fc6d00-985a-11ea-8b7c-e9dc02fddb1f.png" width="70%" alt="WaniAnki Android Screenshots">
</a>

### Web

WaniAnki not only supports the web, it is also optimized for the desktop experience. You can do your reviews using only your keyboard, space to reveal the answer and arrow keys to submit the answer instead of the swipe gestures (although gestures are still supported for for touch screen devices using the web app). WaniAnki also supports the mobile web. You can go to [wanianki.com](wanianki.com) on your mobile browser and have a decent review experience (although native apps offers a much superior experience and are recommended).

<a href="https://wanianki.com">
  <img src="https://user-images.githubusercontent.com/2817993/82147198-bc2e9400-9856-11ea-984b-629e7df1b4a8.png" height="40" alt="WaniAnki Web">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82148778-8ccf5580-985d-11ea-95f4-ed207ea4fc1e.png" width="70%" alt="WaniAnki Web Screenshot">
  
</a>

### Progressive Web App (PWA)

Wanianki.com features PWA support, so you can install it and use it like a desktop application. [Here's](https://support.google.com/chrome/answer/9658361) a guide on how to install PWAs on Chrome, and note that most major browsers have support for PWA's.

<img width="200" alt="WaniAnki PWA Dock" src="https://user-images.githubusercontent.com/2817993/82148898-b7211300-985d-11ea-938a-1feba5ccb41b.png">

### Expo

If for whatever reason you're unable to download the native mobile apps but still prefer a native mobile experience, you can use WaniAnki through Expo. You can go to [https://expo.io/@oguzgelal/wanianki](https://expo.io/@oguzgelal/wanianki) or scan the QR code below to get the app.

<a href="https://wanianki.com">
  <img src="https://user-images.githubusercontent.com/2817993/82147800-ef722280-9858-11ea-9e9d-ae6413ebaa68.png" height="80" alt="WaniAnki Expo QR Code">
</a>


## Reliability

I made an extra special effort to make WaniAnki work as reliably as I can, especially when submitting the results, because I know how frustrating it would be to complete a long review session only to find out that they weren't submitted. I wanted to share some of the measures I took:

**No offline support:** I initially considered adding offline support to WaniAnki, but then decided against it. WaniAnki works as long as it can comunicate to WaniKani, and uses it as a single source of truth. This makes it more reliable, because offline support introduces a whole new layer of complexity that can potentially cause bugs: synchronisation. If there is enough demand and enough time on my hands I'm willing to undergo this challenge, but for now we'll have to accept the lack of this feature and enjoy the reliability benefits 🥂

<img src="https://user-images.githubusercontent.com/2817993/82153451-27389480-9870-11ea-9a54-4d39140ddfab.PNG" width="120" alt="WaniAnki no network screen">

**Network detection:** When your internet connection drops, WaniAnki will detect it and block your interactions to prevent you from doing your reviews while they aren't being submitted. Once you're back online, the block will be lifted and you'll be able to continue from where you're left off.

<img src="https://user-images.githubusercontent.com/2817993/82153804-67007b80-9872-11ea-9394-ce4342243bdb.PNG" width="120" alt="WaniAnki failed submission screen">

**Failed submission:** If any of the reviews you've completed fails to be submitted, WaniAnki will again block your interaction to prevent further data loss. The error message will tell you how many reviews in the session were submitted successfully and how many are half finished, and will be lost if you close the app. There is a "Retry" button that you can use to re-send the submission (any number of times, until it works or you give up). As a general principle, you can think that that if you're not seing this screen, your reviews are being submitted.

**On-the-fly submission:** Your reviews will be submitted in the background as you go through the session. This means if something goes horribly wrong mid-session, like a complete crash, previously submitted reviews will not be lost.

<img width="235" alt="Half finished reviews" src="https://user-images.githubusercontent.com/2817993/82154143-a039eb00-9874-11ea-9938-44d23e461a26.png">

**Review distribution:** A review is only submitted when it's fully completed, that is, when you get all parts of it correct (reading and meaning, only meaning for radicals). Kanji and Vocabulary reviews with only one part completed are half finished reviews, and they are the ones that'll be lost in a far from ideal situation like a crash, or dropping your device in a lake etc. To prepare for the worst and keep this loss minimal, WaniAnki will not put review pairs too far from each other. On the review bar below, superscript of the completed review number displays the number of half-finished reviews (shown above). WaniAnki will make sure that you don't having more than ~10 half finished reviews at a time.


## Feature Requests

I am planning to maintain WaniAnki and add in more features down the line. Needless to say, I'm open to feature requests. To see what's planned and get insights on the roadmap, you can check out the tickets under each [milestone](https://github.com/oguzgelal/wanianki/milestones), tickets related to new features will have an `enhancement` tag. You can also head over to [issues](https://github.com/oguzgelal/wanianki/issues) section and submit your own feature request. 


## Reporting Bugs

If you find a bug in WaniAnki, reporting it would be much appreciated. You can head over to the [open issues](https://github.com/oguzgelal/wanianki/issues) section and submit the issue from there. I'll try to fix bugs as quick as possible. Reporting bugs is easy, I made a crash screen that shows the error details (as shown below), so you can just take a screenshot of it and include it in your ticket.

<img src="https://user-images.githubusercontent.com/2817993/82118683-8b305f80-9781-11ea-9a74-633421342a80.PNG" width="320" />


## Further Contact

If you like to contact me direcly, you can do so by sending an email to [o.gelal77@gmail.com](mailto:o.gelal77@gmail.com).


## Mentions

Our preview images were created using '[Previewed](https://previewed.app)' at [https://previewed.app](https://previewed.app). Thanks Previewed!