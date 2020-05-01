# Event Propogation, bubbling and once

Demo app to clear the confusion between common terms related to event listeners.
1. Event bubbling : when working with nested elements eventlisteners start/listen to all the element inside out.
2. Event Capture and Propogation : when option in eventlistener is set true it starts to listen from outside to inside. This propogation can be stopped all true by `stopPropogation()` method on events object
3. There's one more interesting option called `once` which basically removes the eventlisterner after one time trigger.
This could be useful in situation where you do not want users to keep clicking a button continuously ex. checkout button.

