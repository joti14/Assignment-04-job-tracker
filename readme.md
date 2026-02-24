1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById returns one single element by using a unique id. Returns null if id not found. It's a faster method to get an element with unique id.

getElementsByClassName finds all elements that have same class name and returns a live HTMLCollection. 

querySelector returns the first element that matches a CSS selector.

querySelectorAll returns a static Nodelist of all elements that matches a CSS selector.


2. How do you create and insert a new element into the DOM?

a. create an element using document.createElement()
b. set its innerText/innerHTML/setAttribute etc.
c. insert the new element to its parent node using append/appendChild etc. 


3. What is Event Bubbling? And how does it work?

Event Bubbling is how event triggers on the most nested element and then gradually triggers upward through all its parent element.
First it triggers on the element, then on its parent, then on its parent's parent and so on up to the document.


4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation is attaching one event listener to a parent element instead of many event listener to all the child elements.
When event listener is added on a parent, events bubble up so the parent can detect all the events that are coming from its child elements. It reduces number of event listeners, better performance, clean code and also works for elements that are dynamically added.


5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() stops the browser from executing its built-in behavior for an event. e.g. prevents a form from submitting on click.
stopPropagation() stops the event from bubbling up or capturing down to parent/child elements. e.g. prevents a click on a child element from triggering an event on the parent element.