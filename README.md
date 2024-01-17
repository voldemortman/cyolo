There are many different approaches to solve this problem.

One of my first thoughts was "I should add a cache" to optimize stats. However, I realized that there are far more posts than gets, so I will have many cache updates. This will slow down the service so that it will not be able to handle the large number of requests.

Another problem that I thought of is should I calculate the stats on every insertion, or just on request. I figured that on every insertion will not scale well, so it's easier to handle it on request.

I figured that when this will scale the easiest way to store it will be in some sql database, so in order to make the transition easier I used sqljs which is a library that allows you to store data in memory. This also makes it easier to calculate stats, because I can order the data when I retrieve it.

In my opinion storing the data this way optimizes the retrival for all stats as a whole, which is a good starting point. When we grow in scale and have real data about how many times each stat is used, it will be possible to store the data in a different way that optimizes the calculation for a specific stat.

We can also save the result of each stat when called and say that it is void when some word is inserted that makes it no longer true. For example, we can cache the least in a non complex way. The first time you calculate the least you cache it, and then you save that cache until the next time someone posts that word. However, in a system with a large scale that means adding latency to every request, since we now need to access a remote cache that can be shared between services. In my opinion that is not worth it.