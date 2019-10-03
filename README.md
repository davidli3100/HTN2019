# HTN2019

This is the repo for our hack the north 2019.

Devpost link: https://devpost.com/software/drdash

## Inspiration
Whenever we wanted to book an appointment at the doctor's office, we were always told to hold for "a few moments". Let's just say those "few moments" turned into numerous minutes.

We created DrDash to fix this problem. If implemented at a doctor's office, we no longer need to wait for the receptionist to be available to take our appointment information!

DrDash maximizes the efficiency of doctors' offices so they can focus on what they do best - helping patients.

## What it does
Just call your doctor's office and book an appointment like you would before, but this time it's a robot taking your call!
Of course you can still request to talk to a human if you require further assistance :)

Five simple steps:
1. Call your doctor's office
2. Say "book an appointment"
3. Give the robot your information
4. Appointment confirmation
5. Appointment appears on doctor's dashboard

We also added Freshbooks integration in our hack so doctors can keep track of their billings to OHIP/insurance/patients for their services.

Our hack also runs on Google Assistant and Facebook Messenger!

> (FOR THE PURPOSES OF THIS HACK: If you request to talk to a human, you might get to talk to one of us :D)

## How we built it
| Frontend        | Backend           |
| ------------- |-------------|
| React      | Firebase (hosting, firestore, functions) |
| HTML      | Flask (Dialogflow webhook) | 
| CSS + Javascript | Google Cloud Platform (Dialogflow intents, telephony, training, webhook) |

We used Voiceflow for prototyping our Dialogflow agent and Freshbooks API for invoicing OHIP/insurance/patients.

## Challenges we ran into
- Dialogflow webhook documentation is hard to understand and Python example code for it doesn't exist
- Cyclic dependency errors in our Freshbooks Firebase cloud function
- Figuring out how to use the Freshbooks API (thanks Anthony and Jill for the help!)
- It was hard to debug the Firebase Cloud Functions as missing polyfills would sometimes not be caught as errors

## Accomplishments that we're proud of
- Creating a dashboard in React
- Learning Voiceflow, Dialogflow and Freshbooks API in such a short period of time
- Managing to use so many APIs in one hack
- Never giving up when problems arise
- Developing a complete product with full business logic that is fully usable in a corporate environment

## What we learned
- Some documentation doesn't exist for writing microservices in Python
- Voiceflow, Dialogflow and Freshbook API
- Photoshop and some design skills

## What's next for DrDash
- Better integration for multi-users
- Add deployment options to doctor offices
