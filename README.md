# Lexi Learn Illustrated Dictionary
A fun, interactive dictionary for young avid learners that takes the user's word search and returns its definition(s) along with an image and example sentence (when applicable) from an English dictionary database. Designed for students in primary and secondary education, the application utilizes an expressive typeface and color scheme along with animated elements to stimulate student engagement. Lexi Learn's search history functionality promotes spaced repetition learning by allowing students to review vocabulary words at their convenience. The web application is responsive and mobile-friendly.

**Link to project:** http://lexilearn.netlify.com/

To learn more about this project's server code, click <a href="https://github.com/jennaly/lexilearn-proxy-api/">**here**</a>

![LexiLearnDemo](https://user-images.githubusercontent.com/106183040/196015198-1cecbf29-4bef-4065-90f1-c01fbfd19c30.gif)

## How It's Made:

**Tech used:** <br>
Front-End: HTML, CSS, JavaScript <br>
Back-End: Node.js, Express.js 

The definition(s), image, and example sentence are fetched from the <a href="https://owlbot.info/">Owlbot Dictionary API</a> via an <a href="https://github.com/jennaly/lexilearn-proxy-api/blob/main/README.md">Express proxy API</a>. Input from the user is appended to the request URL as a parameter to retrieve data that corresponds to the word. Each word search is saved to the user's browser window using the localStorage object. Data retrieved from localStorage is appended to the DOM and presented as a personalized dictionary, which in turn can be used by the user to revisit words they have looked up before.

## Optimizations

Images used in this application underwent lossless compression to optimize load time and performance. 

## Lessons Learned:

I learned to store and retrieve data from localStorage and use DOM manipulation methods to update page content.

## References

**Link to project:** http://lexilearn.netlify.com/ <br>
**Link to Lexi Learn Proxy API:** https://github.com/jennaly/lexilearn-proxy-api/



