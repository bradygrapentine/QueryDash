# QueryDash

## https://querydash.herokuapp.com/

![](./ClientApp/src/images/Capture.PNG)

I created this application for my capstone project at Suncoast Developers Guild. I had a great time working through the challenges associated with creating and delivering on this project.

QueryDash is a search aggregation application. The dashboards are the main feature. They contain panels that are associated with a particular website. The FrontEnd dashboard, for example, includes the MDN Web Docs, W3 Schools, and Stack Overflow, among others. The user enters their desired search in the navigation bar and presses Enter (or clicks search), and - boom - in a few seconds, the panels populate with search results from separate refined search requests executed in parallel on QueryDash's back-end via Gigablast's Web Search API (http://www.gigablast.com/api.html). The search queries are refined by the "site:" parameter.

Each search result includes a live link to the result, the header of the result, and a summary of the result. If you navigate away from the page, QueryDash sticks your last results by dashboard in local storage.If you create an account, you can archive results, and QueryDash will save your opened results as well.

I built this application to address the research process that is common to all software engineers, but I realized that the use cases were more numerous as I developed the idea.

Ultimately, QueryDash's purpose is outsourcing the work associated with navigating to different websites and searching for the same information from the user and their computer onto QueryDash's back-end, and returning results as if the web search requests were executed on the front-end in one place. But, QueryDash also provides two methods of storing relevant results for the user, and a place where users can see those results by dashboard or in general.

Dashboards can be created and copied and panels can be added, created, and removed from dashboards (panels and dashboards have a many-to-many relationship). You can use any valid URl to create a panel, but I only use the host in the query parameter.

So, the user can research essentially any topic they want at whatever site they want; the use cases are only limited by the family filter and the fact that I cut the URLs, but I'd like to add an advanced settings option to the create panel option to address that issue.

This is a work in progress, so please don't abuse the search feature. You're welcome to try QueryDash and create an account, dashes, and panels, but the API requests really start to pile up when the search feature is used excessively. I'm planning a transition to an un-metered service sometime soon. Please reach out to me at brady.grapentine@gmail.com with QA comments, questions, or suggestions.

I'm working on a Demo Video! Stay tuned.
