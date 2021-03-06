# space-rocks
<p align="justify">This began as a Tech Test but since I didn't finish it to my full satisfaction I decided to carry it on as a personal project. It is still very much Work In Progress.</p>

## Tech Test Write Up
<p align="justify">
This was a great challenge, using some technology I know (Vue) and some I don't (Firebase). I spent three days learning Firebase, Vuex and Vue Router with a dummy project before commencing the challenge. I didn't want to go in half-cocked. I'm glad I put in the time - there was a lot of hidden complexity. After three days I abandoned my attempt and started again, eliminating Vuex and Vue Router for the sake of simplicity. This enabled me to focus fully on Firebase and the areas of Vue with which I am less familiar. After a lot more hard work I found that in order to get the DOM to dynamically update when a new asteroid is added to the profile, I had to instigate Vuex anyway - this did not prove too difficult, even at a fairly advanced stage. Prior to this I had been using a hook - this proved troublesome as I managed to max out my Firestore allowance by sending 50,000 requests in about an hour. I transferred to a different email account and carried on. However in the end, time (or lack of it) has been my enemy. There are a few shortcomings I would like to highlight:
</p>

* <p align="justify">The Search component is FAR too large. I attempted to split this into four components (search and results by id and dates) but this proved too difficult for my sleep deprived brain. Next time I would start with the components separated instead of assuming I will be able to put them together later.</p>
* <p align="justify">A lot of it is quite ugly. I had planned a nicer display involving asteroid previews and full information, taking up the full screen with the orbital and close approach data on display at all times, but as ever, most of the styling got left to the last minute.</p>
* <p align="justify">I would have liked to have Save buttons for all asteroids, no matter where they have been searched.</p>
* <p align="justify">I would have liked to add a delete button for each asteroid in the profile.</p>
* <p align="justify">There is repetition. This is hugely against what I stand for, but when learning new technology it is sometimes easier to bash it out in front of you and tidy it up later. I find this process helps me to more fully digest the code. Of course, you need to have the time to tidy up.</p>
* <p align="justify">I didn't get time to learn how to abstract the API key in the front end - obviously I couldn't use dotenv. For the most part I had the repository set to private and now I have put the `firebase.js` file in `.gitignore` - please let me know if you need access!</p>
* <p align="justify">I didn't get to do any tests. I like to practise TDD but I find it tricky with new technology.</p>
* <p align="justify">If I had really had enough time, it would have been great to get a graph or two involved!</p>

<p align="justify">All in all it has been a lot of fun, very hard work, and a very satisfying learning experience. I plan to continue the project, perhaps turning it into a more general Space information site.</p>
