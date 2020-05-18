<h1 align="center" style="font-size: 42px; font-weight: bolder;">
  <a href="https://juken.io">
    <img src="https://user-images.githubusercontent.com/2817993/81977026-18fd3500-9632-11ea-9145-07634e3544c1.png" alt="Juken" width="200">
  </a>
  <div>
    Juken
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
<img src="https://user-images.githubusercontent.com/2817993/82143706-81286280-984e-11ea-9336-b982002f6d80.gif" width="220" alt="Juken"> 
</p>

## Introduction

Juken is a minimalistic review app for [WaniKani](https://www.wanikani.com/) optimized for speed. It eliminates the need for typing; you just have to recall, reveal the answer and submit by swiping left or right.

Juken was inspired by the popular flashcard app [Anki](https://ankiweb.net/) in the sense that it allows revealing the answers instead of having to typing it out, and it features Tinder-like swipe gestures to effectively submit your answers. Just login with your WaniKani Personal Access Token and start swiping.

### User Interface

Cards are fairly simple; they show the Japanese characters and the question text under it. The characters are color coded in WaniKani color scheme; purple for vocabulary, pink for kanji and light blue for radicals. After you recall, simply use the `Reveal` button to reveal the answer. It's a press & hold interaction to avoid accidental touches. On the web (desktop), you can reveal the answer using the space bar as well. Once revealed, the answer will be displayed under the characters: if you got the answer right, swipe **right**, if you got it wrong, swipe **left**. On desktop (web), you can use the arrow keys instead of swiping. That's all there is to it. 

<img width="400" alt="Screen Shot 2020-05-17 at 7 27 03 PM" src="https://user-images.githubusercontent.com/2817993/82154792-0fb1d980-9879-11ea-801e-114f3965b0c9.png">

As for the review stats below the cards; the top and bottom rows show **completed** review and card data respectively. A "card" represents a question, every single question asked in a review session comes in a card, it's basically a *review / review type* pair. (ie. for one vocab or kanji review, there are two cards - reading and meaning, for one radical review there is one card - meaning).

The bars displays the percentage of the **completed** correct / incorrect reviews / cards respectively. A card is completed when you get it right, and a review is completed when you get all the cards for a review right. If you get a card wrong, it'll be requeued and asked again, and it won't be included in the percentage until you get it right. Same goes for reviews. Once you get a card / review right, it will be count as correct if you didn't submit an incorrect answer for it previously, otherwise, it'll be count as incorrect. (The number of incorrect answers you've submitted for a card / review isn't reflected on the bar - as it'll just count as one wrong answer - but it'll be submitted to WaniKani).

The `X of Y` displays show the number of items you have *completed* (`X`), and the number of items you have available in total (`Y`). The `Y` of the top bar shows how many reviews you have in that session, and the `Y` of the bottom bar shows how many cards you have in total (ie. how many questions you'll be answering). The `X` of the top bar is the number of reviews you have completed, and its superscript shows the number of half finished reviews, that is, the number of reviews that are not completed but has one completed part. It could also be thought as the number of reviews that'll lost if you close the app mid-session. The `X` at the bottom bar shows the number of cards you have completed.

### Personal Access Token

To log in with your WaniKani account, you'll need to obtain a personal access token. Here's how you can get one:

1. Login to [https://wanikani.com](https://wanikani.com)
2. Click on your avatar on the top right corner, select `API Tokens` under `Settings` from the dropdown
3. Under `Personal Access Tokens` section, click `Generate a new token` button down below
4. Write a descriptive text in the `What is this token for?` input (ie: "Juken")
5. Check the following boxes:
    - Recommended: Check all the boxes. For now, Juken doesn't need all these permissions, however down the line I might add new features that needs some (or all) of them. For a smooth transition to newer versions, I recommend you to check all the boxes now.
    - Restricted: Check the one with the label `reviews:create`
6. Click `Generate Token`
7. You can log in with the code generated and listed under the `Token` column next to the item you've just created. Enjoy ☺

## Platforms

Juken is a cross-platform application, available natively on mobile platforms and for the web. It's built with [React Native](https://reactnative.dev/), and uses [react-native-web](https://github.com/necolas/react-native-web) for web support. There are a few different ways you can use Juken, you can find some details and links below. Note that Web, PWA and Expo apps will receive updates / bug fixes more frequently and earlier than the native iOS and Android counterparts due to the review processes of the app stores.

### iOS

<a href="https://apps.apple.com/ca/app/juken/id1513428918" target="_new">
  <img src="https://user-images.githubusercontent.com/2817993/82145767-ea11d980-9852-11ea-8880-704240dcbeae.png" height="40" alt="Juken App Store">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82147983-1b41d800-985a-11ea-9e91-1321b85af125.png" width="70%" alt="Juken iOS Screenshots">
</a>

### Android

<a href="https://play.google.com/store/apps/details?id=com.wk.wanianki" target="_new">
  <img src="https://user-images.githubusercontent.com/2817993/82146513-8dfb8500-9853-11ea-9769-bb2f81a1afe1.png" height="40" alt="Juken Google Play">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82147988-25fc6d00-985a-11ea-8b7c-e9dc02fddb1f.png" width="70%" alt="Juken Android Screenshots">
</a>

### Web

Juken is available on the web, and it is optimized for the desktop experience. You can do your reviews using only your keyboard; space to reveal the answer and arrow keys to submit instead of the swipe gestures (although gestures are still available for touch screen devices using the web app). Juken is also optimized for the mobile web. You can go to [juken.io](juken.io) on your mobile browser and have a decent review experience (although native apps offers a much superior experience and are recommended).

<a href="https://juken.io" target="_new">
  <img src="https://user-images.githubusercontent.com/2817993/82254164-08fb9300-995b-11ea-9637-6ac42e78359e.png" height="40" alt="Juken Web">
  <br />
  <img src="https://user-images.githubusercontent.com/2817993/82148778-8ccf5580-985d-11ea-95f4-ed207ea4fc1e.png" width="70%" alt="Juken Web Screenshot">
</a>

### Progressive Web App (PWA)

Juken has PWA support on [juken.io](juken.io), so you can install it and use it like a desktop application. [Here's](https://support.google.com/chrome/answer/9658361) a guide on how to install PWAs on Chrome, and note that most major browsers have support for PWAs.

### Expo

If for whatever reason you're unable to download the native apps but still prefer a native mobile experience, or simply you'd like to get the new features / updates before they're available on the app stores, you can use Juken through Expo. After installing the Expo client, you can get the app from [expo.io/@oguzgelal/juken](https://expo.io/@oguzgelal/juken).


## Feature Requests

I am planning to maintain Juken and add in more features down the line. Needless to say, I'm open to feature requests. To see what's planned and get insights on the roadmap, you can check out the tickets under each [milestone](https://github.com/oguzgelal/juken/milestones), tickets related to new features will have an `enhancement` tag. You can also head over to [issues](https://github.com/oguzgelal/juken/issues) section and submit your own feature request. 


## Reporting Bugs

If you find a bug in Juken, reporting it would be much appreciated. You can head over to the [open issues](https://github.com/oguzgelal/juken/issues) section and submit the issue from there. I'll try to fix bugs as quick as possible. Reporting bugs is easy, I made a crash screen that shows the error details (as shown below), so you can just take a screenshot of it and include it in your ticket.

<img src="https://user-images.githubusercontent.com/2817993/82118683-8b305f80-9781-11ea-9a74-633421342a80.PNG" width="320" />


## Further Contact

If you like to contact me direcly, you can do so by sending an email to [o.gelal77@gmail.com](mailto:o.gelal77@gmail.com).


## Mentions

Our preview images were created using '[Previewed](https://previewed.app)' at [https://previewed.app](https://previewed.app). Thanks Previewed!