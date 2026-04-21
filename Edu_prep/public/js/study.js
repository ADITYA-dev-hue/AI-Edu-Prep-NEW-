const topics = {

variables: {
title: "Python Variables",
text: `
Variables are containers used to store data values.

Example:

x = 10
name = "Shiv"
price = 99.5

Rules:
• Use letters, numbers, underscore
• Cannot start with number
• Case sensitive

Use variables to store user input, counters and values.
`
},

loops: {
title: "Python Loops",
text: `
Loops repeat tasks automatically.

FOR LOOP:

for i in range(5):
    print(i)

WHILE LOOP:

x = 1
while x <= 5:
    print(x)
    x += 1

Used for iteration, automation and logic building.
`
},

functions: {
title: "Python Functions",
text: `
Functions are reusable blocks of code.

def greet():
    print("Hello")

greet()

With Parameters:

def add(a,b):
    return a+b

Functions reduce repeated code.
`
},

lists: {
title: "Python Lists",
text: `
Lists store multiple values.

nums = [10,20,30]

nums.append(40)
nums.remove(20)

Access:

print(nums[0])

Lists are ordered and mutable.
`
},

oops: {
title: "Python OOP Concepts",
text: `
OOP = Object Oriented Programming

Main Pillars:

1. Class
2. Object
3. Inheritance
4. Polymorphism
5. Encapsulation

Example:

class Car:
    pass

c1 = Car()

Used in real-world software systems.
`
},

array: {
title: "DSA Arrays",
text: `
Array stores elements in continuous memory.

arr = [1,2,3,4]

Access:
arr[0]

Time Complexity:
Access = O(1)
Search = O(n)

Used in almost every program.
`
},

stack: {
title: "DSA Stack",
text: `
Stack follows LIFO:

Last In First Out

Operations:

push()
pop()
peek()

Applications:

• Undo feature
• Function calls
• Expression solving
`
},

queue: {
title: "DSA Queue",
text: `
Queue follows FIFO:

First In First Out

Operations:

enqueue()
dequeue()

Applications:

• CPU scheduling
• Printing queue
• BFS traversal
`
},

tree: {
title: "DSA Trees",
text: `
Tree is hierarchical data structure.

        Root
       /    \\
      A      B

Types:

• Binary Tree
• BST
• Heap
• Trie

Used in databases and file systems.
`
},

binarysearch: {
title: "Binary Search",
text: `
Works only on sorted arrays.

arr = [1,2,3,4,5]

Steps:

1. Find middle
2. Compare target
3. Move left/right half

Time Complexity:

O(log n)

Very fast searching technique.
`
}

};

/* =============================
   SHOW TOPIC
   ============================= */

function showTopic(name){

const title =
document.getElementById("topicTitle");

const content =
document.getElementById("topicContent");

if(!topics[name]) return;

/* Fade animation */

content.style.opacity = "0";
title.style.opacity = "0";

setTimeout(() => {

title.innerText =
topics[name].title;

content.innerText =
topics[name].text;

title.style.opacity = "1";
content.style.opacity = "1";

},180);

/* Highlight Active Topic */

document
.querySelectorAll(".topic-btn")
.forEach(btn => {

btn.style.borderColor = "#232323";
btn.style.color = "#ffffff";
btn.style.background =
"linear-gradient(145deg,#0b0b0b,#131313)";

});

if(event && event.target){

event.target.style.borderColor =
"#ff5a00";

event.target.style.color =
"#ff5a00";

event.target.style.background =
"#111111";

}

/* Save Progress */

localStorage.setItem(
"lastTopic",
name
);

}

/* =============================
   AUTO LOAD LAST TOPIC
   ============================= */

window.onload = function(){

const last =
localStorage.getItem("lastTopic");

if(last && topics[last]){

setTimeout(() => {
showTopic(last);
},200);

}

};