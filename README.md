<a href="https://geekout.netlify.app/" target="_blank" rel="noopener"><img src="https://github.com/Dan-DH/npProject/blob/master/client/src/assets/images/gitBanner.webp"/></a>

## Connect with fellow geeks/nerds/cool people.

## How does it work
1. Create an account using your email
2. Create an event (board games session, DnD campaing). Set a date, location and number of players.
3. Rejoice as other users sign up for your event.
4. Go and have a good time!

## Tools
- Node.js
- ApolloGraphQL
- MongoDB
- React
- Heroku (back-end deployment)
- Netlify (front-end deployment)

## Site functionalities
Pages:
- Login / Sign up. Includes a link to the password recovery page
- Main
  - List of events the user has signed for
  - List of events where the user is in the waitlist list (only renders if the user is in the waiting list for an event)
  - List of upcoming events
  - Option to create new events
  - Navbar menu with link to the profile page and logout button
- Profile / Settings
  - Users can change their account information (username, email, password).
  - Users can set their profile information (profile picture and bio. Optional).
- Password recovery. Allows the user to input their email to receive a password recovery link valid for 15 minutes.
- Password reset. When a user clicks on the password recovery email link, they are redirected to this page to reset their password.

Event related emails:
- Users receive an email when signing up for an event, or if they have been moved from the waiting list to the attending list.
- All attending users are notified by email when the organizer of an event removes the event.

## Site sketch design
<img src="https://github.com/Dan-DH/npProject/blob/master/client/src/assets/images/sketch3.jpg" width="600"/>
<img src="https://github.com/Dan-DH/npProject/blob/master/client/src/assets/images/sketch2.jpg" width="600"/>
