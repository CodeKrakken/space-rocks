# space-rocks
This was a great challenge, using some technology I know (Vue) and some I don't (Firebase). I spent three days learning Firebase, Vuex and Vue Router with a dummy project before commencing the challenge. I didn't want to go in half-cocked. I'm glad I put in the time - there was a lot of hidden complexity. After three days I abandoned my attempt and started again, eliminating Vuex and Vue Router for the sake of simplicity. This enabled me to focus fully on Firebase and the areas of Vue with which I am less familiar. After a lot more hard work I found that in order to get the DOM to dynamically update when a new asteroid is added to the profile, I had to instigate Vuex anyway - this did not prove too difficult, even at a fairly advanced stage. Prior to this I had been using a hook - this proved troublesome as I managed to max out my Firestore allowance by sending 50,000 requests in about an hour. I transferred to a different email account and carried on. However in the end, time (or lack of it) has been my enemy. There are a few shortcomings I would like to highlight:
* The Search component is FAR too large. I attempted to split this into four components (search and results by id and dates) but this proved too difficult for my sleep deprived brain. Next time I would start with the components separated instead of assuming I will be able to put them together later.
* A lot of it quite ugly. I had planned a nicer display involving asteroid previews and full information, taking up the full screen with the orbital and close approach data on display at all times, but as ever, most of the styling got left to the last minute.
* I would have liked to have Save buttons for all asteroids, no matter where they have been searched.
* I would have liked to add a delete button for each asteroid in the profile.
* If I had really had enough time, it would have been great to get a graph or two involved!

All in all it has been a lot of fun, very hard work, and a very satisfying learning experience. I plan to continue the project, perhaps turning it into a more general Space information site.
