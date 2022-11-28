## valyoos Client

This is front-end app for valyoos with back-end API endpoints served by NextJS framework. Currently deploy to vercel https://valyoos.com.au


### Quick Start on development

In your terminal:

```bash
# clone the project to your local machine
# you can also use git@github.com:jason-den/valyoos-front-end.git
git clone https://github.com/jason-den/valyoos-front-end.git
# go to target folder
cd valyoos-front-end
# install dependencies and run the app
npm i
npm run dev
```

You shall see something like this:

```
$ npm run dev                                                    

> valyoos-web@0.1.0 dev
> next dev -p 3001

ready - started server on 0.0.0.0:3001, url: http://localhost:3001
```

If any error heppend, try to stack-overflow it, or, contact jason.den.cloud@gmail.com for assistance.



### Tech stack explaination

This app uses [Next.js](https://nextjs.org/), a development framework extending ReactJS and capable of static site generation and server-side rendering.

You might want to refer to some documents like [pages with dynamic routes](https://nextjs.org/docs/basic-features/pages), [router](https://nextjs.org/docs/api-reference/next/router#userouter), or [server side rendering](https://nextjs.org/docs/basic-features/data-fetching)



### What have been done and what's not

Pages:

0. `Auth` and login  (currently working on it)
   - [x] firebase config on cloud
   - [x] firebase config on client app
   - [x] login/signup UI component for email
   - [ ] allowing login/signup with gmail
   - [ ] page level access control base on auth status 

1. Home page `/`

   - [x] Layout and visiable components

2. `/business`

   - [x] Layout and visiable components

3. `/about` , `/contact`, `privacy-policy`

   - [x] Layout and visiable components
   - [x] more improvement on responsiveness

4. `/venues` 

   - [x] Layout and visiable components

   - [ ] more improvement on responsiveness

5. `/hotels`

   > Same as `venues`

   - [x] Layout and visiable components

   - [ ] more improvement on responsiveness

6. `/npc_land` nfc link page

   > Not yet started

   - [ ] Layout and every visiable components



#### Features on hold, waiting for API & DB

1. `/venues` and `/hotels` use real data with API

> currently showing dummy hard-coded list. Need backend API for real data. 

2. Form submission handling  ( Contact form, email subscription )

> submission handling is fake, wait for API 
#### Our priorities
Milestone 1 encompasses; 
 
•	Visual layout 
•	All current pages 
•	Functionality of two separate profile types (users and business) sign up process 
•	Dashboard features including password change and profile editing 
•	Business profile pages for both hospitality and accommodation business types 
 
 
Milestone 2 encompasses; 
 
•	Accessibility question sign-up process 
•	Accessibility scoring system 
•	Stripe payment integration 
•	Social Media Icon URL function 

New Functionality 
 
Machine Learning (recommendations) – The new function valyoos wants included within this project is the recommendation feature (ML) in which once a personal user has signed up to valyoos, they can receive a weekly update via email of new business profiles that match their accessibility requirements. This could also be included within their dashboard as discussed and eventually pushed to the mobile app. 
 
 



Mobile (future work to be considered in this build) 
 
We would like there eventually to be a valyoos app for the personal users that has the following functionality; 
 
•	They can access their dashboard from the mobile app which has all the same functions of the web app. 
•	They can use it to access the NFC beacons / QR code. 
•	They can fill in / verify accessibility information while in the community at venues (concept image below) 

