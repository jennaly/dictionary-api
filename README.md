# Lexi Learn Illustrated Dictionary
A fun, interactive dictionary for young avid learners that takes the user's word search and returns its definition(s) along with an image and example sentence (when applicable) from an english dictionary database. Designed for students in primary and secondary education, the application utilizes an expressive typeface and color scheme along with animated elements to stimulate student engagement. Lexi Learn's search history functionality allows students to review vocabulary words at their convenience, even after refreshing or having closed the browser window. The web application is responsive and mobile-friendly.

**Link to project:** http://lexilearn.netlify.com/

![alt text](https://github.com/jennaly/lexilearn-dictionary/blob/main/img/lexilearn-min.gif?raw=true)

## How It's Made:

**Tech used:** <br>
Front-End: HTML, CSS, JavaScript <br>
Back-End: Node.js, Express.js 

The definition(s), image, and example sentence are fetched from the <a href="https://owlbot.info/">Owlbot Dictionary API</a> via an <a href="https://github.com/jennaly/lexilearn-proxy-api/blob/main/README.md">Express proxy API</a>. Input from the user is appended to the request URL as a parameter to retrieve data that corresponds to the word. Each word search is saved to the user's browser window using the localStorage object. Data retrieved from localStorage is appended to the DOM and presented as a personalized dictionary, which in turn can be used by the user to revisit words they have looked up before.

## Optimizations

Images used in this application underwent lossless compression to optimize load time and performance. 

## Lessons Learned:

I learned to store and retrieve data from localStorage.



