# cea-trial-task commentary
Developer commentary and retrospective for CEA Trial Task.

#Tradeoffs

##General Patterns
Given the time limit of 48 hours, planning for this project involved many explore vs. exploit tradeoffs. I mostly erred on the side of exploit - once I found a workable solution, I tended to go with it first, then go back and improve if I had time later. I noticed that this led to a lot of pruning; I'd create an acceptable way of doing something (like selecting a user from a dropdown list), then get rid of it to make something more sophisticated (like a username and password login system).

##Stack Choice

###Database
I used MySQL for the stack because I'm very familiar with writing simple statements in SQL, so I knew that once I got the database talking to my server, I could efficiently write the queries I'd need. I think this was a good choice. I could have used Postgres, but since I am new to node.js, I think using a second new technology as well might have been biting off more than I could chew.

The main downside of using MySQL, other than it being different from CEA's generally used tool, was that it makes it a bit more difficult for an evaluator to replicate the system on their machine. With more time and more experience with other frameworks, I would use a tool to ameliorate that process.

###Server
I used node.js with npm for the server. I'd never really set up my own server before, or written backend javascript code, so this was the most exciting part of the project for me. I have written plenty of frontend javascript, so I was familiar with things like callback functions, and I've written a lot of C# service layer code in N-Tier MVC projects, so I was confident I could figure out the logic. That's why I decided to go with CEA's preferred tooling and see what I could learn about node.js.

I enjoyed working with node.js a lot. Regardless of the outcome of this trial task, I plan to use it in more projects. By the end of this project, I felt quite comfortable (if still very much a novice) writing server-side javascript code with node.

The main downside was that using a new stack took time to learn. But using my familiar C# would have also been a problem - my main experience there is large MVC applciations built with many dependencies in Visual Studio. Those would not have been the right tools for a small webapp like this.

###WebApp
I used Knockout to handle binding context, Bootstrap to quickly and easily do simple styling, and a normal CSS file (rather than less or sass) as the stylesheet. I used CDNs to access Bootstrap and Knockout for two reasons - one, because they are very commonly used packages, which users are likely to have cached from major CDNs, and two, to save time and get straight to coding.

I think Knockout was a really good choice for this project. It would also be good for extending - by changing a few observables into computed properties, I could have easily made total values update when new donations were added or removed from the page.

The main flaw of Knockout is that it tends to fail or turn into spaghetti code on larger applications, especially large single-page applications. If this page were part of a larger project, Knockout would not have worked well.

Overall, I'm happiest with my frontend code on this project. Other than a few issues that I commented on inline, I think my frontend code was well suited to the task.

##Enhancements
I finished the strict requirements of the task with enough time to spare to make decisions about enhancements. My biggest choice was whether to go with login functionality or create donation functionality first. I decided to go with login functionality for a few reasons:

1. Allowing users to post values to a database totally unauthenticated did not appeal to me, nor did letting users add donations only to the frontend which would vanish on a page refresh.
2. The system requirements meant that I already needed to hash and salt some passwords. It felt bad to waste them.
3. I'd already written one password unit test, which I could alter as a base for validation code.

Otherwise, I focused on enhancements which brought out the best features of the requirements, rather than enhancements that radically extended their scope. For example, I made a helper to make currencies look nice, added colors from the actual GWWC donation management site, and added a computed property saying how much a user still needed to donate, before embarking on the more ambitious task of adding user authentication functionality through a small login screen.

#Self Evaluation

###Things I think I did well:

1. I'm quite happy with my custom knockout binding to format currencies correctly.
2. I think my database was well designed and thought through - such as having a "IsCurrent" flag on incomes in case a user's income changes but past incomes might still be important for calculations or trends.
3. I made sure the core requirements were fully met and commented throughout before embarking on large enhancements.

###Things I think I could have done better:

1. I added a lot of infrastructural boilerplate early in the project, especially on the server project, before discovering I didn't need any of it. This wasted an hour or two between adding it and pruning it. I should have written smaller functions to test individual bits of functionality more in the first place.
2. My infrastructure could have been better in the WebApp project and the database project. Better knowledge of the node.js ecosystem will help in the future
3. I started implementing login functionality too late in the game. I got it working, but not without at least one (commented) security issue in the frontend. I'm on the fence on if it was still worth it to include given this. On the one hand, it's better to have people's data hidden behind a password. On the other hand, sending the passwords through a GET request puts them at risk, which could be catastrophic if a user has that same password elsewhere. In production code neither would be acceptable, and I'd have taken some extra time to refactor the frontend password-passing function into a POST.

#Overall Impressions
I enjoyed this project a lot. I hope to do more similar ones in the future. I realized some blind spots I have and now know better how I might fill them. In the past, I think I've underestimated the excitement of making an entire small system by myself, rather than contributing many pieces to larger ones like I usually do at work.
