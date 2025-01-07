# Headless CMS Wordpress Backend/NextJS, Typescript, Tailwind Frontend

## Description

Originally a sort of commission piece for my friend Sepy Baghaei, a successful theatre director based in London, it became a massive learning project for myself,
and a vehicle to host a new website for Sepy, as she had had the same standard Wordpress site for around 10 years(!).

I had some prior experience with Typescript, NextJS/React from making my own portfolio website, but this project had the looming issue of "how do I make something that my user can interact with, WITHOUT me." As Sepy had been using Wordpress to edit the site that she already had, I was thankfully guided by my mentor into using that as a backend for the frontend that I would create. This also meant that I would have to learn how Sepy interacted with the site, how she populated it with data, and how I could get her to use it so it became an almost seamless transition.

I learnt a lot about component libraries, about using motion, fonts, and queries especially through graphql, to query the WPress CMS in order to populate my frontend with her content, possibly the most difficult part.

It has been a fantastic learning experience, and has also given me the chance to work with someone who isn't an engineer or in tech. Real world experience that influenced the way that I work.

## Technologies used

- Typescript
- NextJS 15 / React
- Wordpress CMS
- Tailwind

## Design

In the first meeting with Sepy, we went through her original website and I ascertained what it is she liked about it and what she would like changed.

The original website was basic, using wordpress, having minimal design and using basic page structure.

![Screenshot 2025-01-07 at 11 53 17](https://github.com/user-attachments/assets/2ba9b37d-123a-4513-bf33-45ca79934145)

Sepy quite liked this, and so we kept to that mostly. As mentioned previously, I had prior experience with NextJS, so elected to use this and tailwind for styling. Sepy wanted a dark colour scheme, and mostly wanted to have a better improved gallery, which eventually led to the carousel on the landing page:

![Screenshot 2025-01-07 at 13 10 24](https://github.com/user-attachments/assets/ee995b22-d6fc-4295-80f9-ce4838a264d1)

The site consists of five pages:

- Landing page
  ![Screenshot 2025-01-07 at 13 36 54](https://github.com/user-attachments/assets/60390d04-c0a4-4ee4-8b7e-2f6a77e500f5)

- About
  ![Screenshot 2025-01-07 at 13 37 42](https://github.com/user-attachments/assets/6de3af9d-c97e-47c1-86ec-050858fa0821)

- CV
  ![Screenshot 2025-01-07 at 14 31 01](https://github.com/user-attachments/assets/471c5b13-daea-4857-8c1b-715fc8ece39f)

- Projects
  ![Screenshot 2025-01-07 at 14 31 34](https://github.com/user-attachments/assets/5c51db2d-6341-455f-b877-59fd093f7819)

- Contact
  ![Screenshot 2025-01-07 at 14 32 29](https://github.com/user-attachments/assets/70e9f095-6b0a-4050-90ce-12725138fcd6)

The design of these pages also came from the research input of Sepy, having given some examples of other directors' sites that she was fond of in their design.

## Challenges
The biggest challenge was learning to use the Wordpress CMS as a backend. I had no prior experience with it, so carried out much research, trial and error and assistance from friends and my mentor.

Using GraphQL, which is a query plugin in Wordpress, to properly query the backend and retrieve the data needed was one of the larger challenges, but after a lot of trial and error regarding the syntax of the requests, it became easier to navigate.

Once I could properly query the backend, the next challenges came from implementing different components, of which I myself created, and also used from component libraries, such as Shadcn and Aceternity. The implementation of these seemed simple in the onset, though actually incorporating them into a bespoke portfolio and interesting challenges.

One such was with the carousel on the main landing page. It went through about three different iterations before reaching what it looks like as of writing (Jan 2025). This is because the first couple of iterations were clunky in how they reacted to responsive environments, and simply because Sepy didn't like the way that they looked, which of course was important.

This leads to the most enjoying challenge, which was working with Sepy, who has no experience with website design or coding, in creating the website. As a director, she was very articulate at expressing what she wanted the pages to look like, and it was my job to help her to reach whatever it is she wanted the pages to look like. Structure, design, responsiveness have all improved from her input. 

Structure in that the original MVP did not include as many pages and was fleshed out as Sepy decided what she wanted to appear on the site, as the project progressed.

Design in that I asked Sepy to specifically look at fonts that would create the feel she would like, so the two main fonts we have on the page are her choosing. The colour scheme is also her choosing of course.

Responsiveness in that Sepy is the one that addressed slow loading times for the landing page, and so I looked at ways to improve this, implementing speed insights through vercel, where the page is deployed, and adjusting image optimisation and loading so as to make the landing page load faster.

## Conclusions/What I Would Do Differently
