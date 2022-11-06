---
layout: layouts/post.njk
title: In defence of the URL
metaDesc: Be creative and clear with your URLs. Browsers should not hide the
  URL. The users will thank you.
date: 2020-08-19T13:05:46.664Z
tags:
  - platform
  - browser
  - experiments
part: writing
---
On August 12 2020 the Chrome security team posted an article about [how people and users perceive URLs](https://blog.chromium.org/2020/08/helping-people-spot-spoofs-url.html).

In short they are currently running an experiment in Chrome 86:

> In Chrome 86, we’re likewise going to experiment with how URLs are shown in the address bar on desktop platforms. Our goal is to understand -- through real-world usage -- whether showing URLs this way helps users realize they’re visiting a malicious website, and protects them from phishing and social engineering attacks.

While I can imagine where they are coming from – noboby knows what's happening with URLs like this `https://www.totally-made-up-shop.com/N/51141/filter/4277392517-4275877262-4275059032-4274437062-26297-21584-16639/` – I'm strongly against the decision to hide parts of the URL. Here's why:

## Security
As Chrome's security team layed out in their blog post:
> there are myriad ways that attackers can manipulate URLs to confuse users about a website’s identity, which leads to rampant phishing, social engineering, and scams.

While this is entirely true, those are not problems with the URL itself. The problems lie within education of users and spam/phishing filtering on browsers end. And in my opinion their proposed solution only adds up to the confusion by removing key parts of the url.

Users have been told and are getting used to check for the `https` protocol identifier to check if a site sends data securely. Hiding that will break that check.

Let's say that a user has navigated to the following URL:
`http://awesome-bank.com/superawesome-phishing-page.html`
Chrome will only show `awesome-bank.com` making it impossible for the user to check if the site sends data securely and indentifying the fishy html page they are on.

Basically Chrome reduces the ability for a user to verify a URL by 3 points to just 1 point (`https`, the domain and the endpoint). Making it less easy for a user to identify possible fraud/phishing/scams.

## Identity
Let's say you are using Chrome 86 and you found out about this blog on Twitter. You clicked on the link in the Twitter post and landed on this page immediately. The URL-bar is showing you `bram.is`. Are you on the homepage? How do you share this page? Where the hell are you?

The URL always provides context and a unique identity to the page you're visiting. When created correctly a URL can add to the accesibility of a page by giving a clear and concise notion on where the user is on your site.

## Creativity
The last but certainly not the least important point I'd like to make is that URLs can be super creative.

On this blog for instance all my urls and pages are written in sentence format: “Bram is doing-something”.
When you search for [my work](/working) the URL says: `https://bram.is/working`
And if you want to know more [about me](/awesome) as a person: `https://bram.is/awesome`.
Reading a [blog post](/writing)? The URL says: `https://bram.is/writing/in-defence-of-the-url`

Be creative and clear with your URLs. Browsers should not hide the URL. The users will thank you.
