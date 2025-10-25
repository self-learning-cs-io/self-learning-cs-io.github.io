---
title: CS143 P2Week101 02 Structure Of A Compiler Final
---

1
00:00:00,000 --> 00:00:06,919
Welcome back. In this second half of the lecture, we'll continue with our overview of the

2
00:00:06,919 --> 00:00:16,000
structure of a compiler. Recall that a compiler has five major phases,

3
00:00:16,000 --> 00:00:22,000
lexical analysis, parsing, semantic analysis, optimization, and code generation.

4
00:00:22,000 --> 00:00:27,199
And now we're going to briefly talk about each one, and we're going to explain how a compiler

5
00:00:27,199 --> 00:00:33,200
understands these with an analogy to how humans understand English.

6
00:00:33,200 --> 00:00:41,200
The first step in understanding a program, both for a compiler and for a human, is to understand the words.

7
00:00:41,200 --> 00:00:49,200
Now, humans can look at this example sentence and immediately recognize that there are four words. This is

8
00:00:49,200 --> 00:01:17,200
so automatic that you don't even think about it, but there is real computation going on here. You have to recognize the separators, namely the blanks, and the punctuation, things like the periods, and also clues like capital letters. And these help you to divide up this group of letters into a bunch of words that you can understand. And just emphasize that this is not completely trivial.

9
00:01:17,200 --> 00:01:34,200
Let's take a look at this sentence. And you can read this, but it takes a little bit of time, because I've put the separators in odd places. So you can see the word is the word this, the word, and the word, sentence.

10
00:01:34,200 --> 00:01:45,200
But again, this isn't something that comes to you immediately. You actually have to do some work to see where the divisions lie, because they're not given to you in the way that you're used to.

11
00:01:45,200 --> 00:01:55,200
The goal of lexical analysis, then, is to divide the program text into its words, or what we call in compiler speak, the tokens.

12
00:01:55,200 --> 00:02:04,200
So here's an example piece of program text now, instead of a piece of English text. And let's walk through this and identify the tokens.

13
00:02:04,200 --> 00:02:18,199
So there are some obvious ones, there are keywords like if and then and else that we want to identify. And then there are variable names, things like x, and y, and z.

14
00:02:18,199 --> 00:02:31,199
There's also constants, things like number one and the number two. And then there's some operators, double equals is one, and the assignment operator is another.

15
00:02:31,199 --> 00:02:44,199
And here's already an interesting question. How do we know that double equals is not two individual equal signs? How do we know that we want this to be a double equals and we want and not two single equals?

16
00:02:44,199 --> 00:02:54,199
Well, we don't know right now, but we'll talk about that in the lecture on how we implement lexical analysis. But we're not done with all the tokens in this example, either. There's a few more.

17
00:02:54,199 --> 00:03:15,199
The semicolons, the punctuation are also tokens. And then the separators are also tokens. So here's a blank. That's a token. Here's another blank. That's another token. And then there are lots of blanks here that serve to separate things like the keywords and the variable names and other symbols from each other. And those are the tokens of this example.

18
00:03:16,199 --> 00:03:30,199
So for humans, once the words are understood, the next step is to understand the structure of the sentence. And this is called parsing. And as we all learned in elementary school, this means diagramming sentences and these diagrams are trees. And it's a very simple procedure.

19
00:03:31,199 --> 00:03:45,199
Let's look at this example. This line is a longer sentence. The first step in parsing is to identify the role of each word in the sentence. So we have things like nouns and verbs and adjectives.

20
00:03:46,199 --> 00:03:59,199
But then the actual work of parsing is to group these words together into higher level constructs. So for example, this particular sentence consists of a subject, a verb, and an object.

21
00:04:00,199 --> 00:04:16,199
And that actually forms an entire sentence. So here we have the root of the tree called a sentence. And that's broken down in the constituent parts, the high level structure, as we said, is subject verb object. And then the subject is more complicated as is the object. And this is an example of parsing an English sentence.

22
00:04:17,199 --> 00:04:30,199
The analogy between parsing English text and parsing program text is very strong. In fact, they're exactly the same thing. So here's our little example piece of code again. And let's work through parsing it.

23
00:04:30,199 --> 00:04:39,199
So clearly this is an if and then, and so the root of our diagram of our parse tree is going to be an if and else.

24
00:04:40,199 --> 00:04:53,199
This if and else consists of three parts, there's a predicate, then statement and an else statement. And now let's look at the predicate, which consists of three pieces. There's a variable, a comparison operator, and another variable.

25
00:04:53,199 --> 00:05:01,199
And together, those form a relation. So the comparison, a comparison between two things is one of the things you can have as a valid predicate.

26
00:05:02,199 --> 00:05:12,199
Similarly, the then statement consists of an assignment where z gets one and the else statement also has the form of an assignment, z gets two.

27
00:05:12,199 --> 00:05:21,199
And altogether, this is a parse tree of the if and else showing its structure, breaking it up into its constituent pieces.

28
00:05:22,199 --> 00:05:32,199
Now, once we've understood the sentence structure, the next step is to try to understand the meaning of what has been written. And this is hard.

29
00:05:32,199 --> 00:05:40,199
So actually, we don't know how this works for humans still. We don't understand what happens after lexical analysis and parsing.

30
00:05:40,199 --> 00:05:48,199
We do know that people do lexical analysis and parsing in much the same way that compilers lexically analyze and parse programs.

31
00:05:48,199 --> 00:06:04,199
But frankly, understanding meaning is something that is simply too hard for compilers. So the first important thing to understand about semantic analysis is that compilers can only do very limited kinds of semantic analysis.

32
00:06:05,199 --> 00:06:22,199
And in particular, the kinds of things that compilers generally do are try to catch inconsistencies. So if the program is somehow self inconsistent, compilers can often notice that and report errors, but they don't really know what the program is supposed to do.

33
00:06:22,199 --> 00:06:31,199
So for example, of the kind of thing that we do in semantic analysis, again, using an analogy in English, let's consider the following sentence.

34
00:06:31,199 --> 00:06:48,199
Jack said Jerry left his assignment at home. And the question is, what who does his refer to here? It could be that his refers to Jerry, in which case we would read Jack said Jerry left Jerry's assignment at home, or it could refer to Jack.

35
00:06:48,199 --> 00:07:01,199
And in the case we could read the sentence as Jack said Jerry left Jack's assignment at home. And without more information, we actually don't know which one his is referring to, whether it's Jack or it's Jerry.

36
00:07:01,199 --> 00:07:13,199
And even worse, let's take a look at this sentence down here, Jack said Jack left his assignment at home. And the question is, how many people are actually involved in this sentence?

37
00:07:13,199 --> 00:07:27,199
There could be as many as three, there could be two separate jacks and his could even refer to somebody completely different. We don't know without seeing the rest of the story that surrounds this sentence, all the possibilities for his.

38
00:07:27,199 --> 00:07:41,199
But it could also be as few as only a single person. It could be that Jack and Jack and his are all the same person in this sentence. And so this kind of ambiguity is a real problem in semantic analysis.

39
00:07:41,199 --> 00:07:53,199
And the analogy in programming languages is variable bindings. So we would have variables, in this case, a variable called Jack, or maybe more than one variable called Jack.

40
00:07:53,199 --> 00:08:03,199
And a programming language is going to have very strict rules to prevent the kind of ambiguity we had in the English sentences on the previous slide.

41
00:08:03,199 --> 00:08:18,199
So, you know, in this example, the question is, what value is printed by this output statement? And the answer is, it's going to print four because this use of the variable Jack binds to this definition here.

42
00:08:18,199 --> 00:08:31,199
And the outer definition is hidden. So the outer definition is not active in this scope because it's hidden by the inner definition. And that's just a standard rule of a lot of lexically scoped programming languages.

43
00:08:31,199 --> 00:08:44,200
Now, from pilots perform many semantic checks besides analyzing the variable bindings. And so here's another example in English. So Jack left her homework at home.

44
00:08:44,200 --> 00:08:55,200
And under the usual naming conventions, assuming that Jack is male, we know there's a tight mismatch between Jack and her. So we know that whoever her is, it is not Jack.

45
00:08:55,200 --> 00:09:04,200
And therefore, we know that this sentence is talking about two different people. And so this is analogous to type checking.

46
00:09:04,200 --> 00:09:20,200
The fourth compiler phase optimization doesn't have a very strong counterpart in everyday English usage, but it's a little bit like editing. And in fact, it's a lot like what professional editors do when they have to reduce the length of an article to get it down to some word budget.

47
00:09:20,200 --> 00:09:34,200
So for example, I have this phrase right here, but a little bit like editing. And if I didn't like it, if I thought it was too long, I could replace the middle four words with two words akin to.

48
00:09:34,200 --> 00:09:41,200
So now it says, but a kin to editing. And that means exactly the same thing as the original phrase, but uses fewer words.

49
00:09:41,200 --> 00:09:59,200
And the goal in program optimization is to modify the program so that it uses less of some resource. Maybe we want to use less time. We want the program to run faster. Maybe we wanted to use less space so that we can fit more data in memory.

50
00:09:59,200 --> 00:10:12,200
For a handheld device, we might be interested in reducing the amount of power that it uses. If we have external communication, we might be interested in reducing the number of network messages or the number of database accesses.

51
00:10:12,200 --> 00:10:24,200
And there's any number of resources that we might want to improve the program to use up.

52
00:10:24,200 --> 00:10:39,200
So for example, of the kinds of optimizations a program might do, we can have a rule in our compiler that says x equals y times zero is the same as x equals zero. And this seems like a real improvement because instead of doing the multiply, we can just do an assignment.

53
00:10:39,200 --> 00:11:02,200
So we save some computation by doing that. Now, unfortunately, this is not a correct rule. And this is one of the important things to know about compiler optimization is it's not always obvious when it's legal to do certain optimizations or not. Now it turns out that this particular rule is valid for integers.

54
00:11:02,200 --> 00:11:16,200
So if x and y are integers, then multiplying by zero is always the same thing as just assigning zero. But it's invalid for floating point.

55
00:11:16,200 --> 00:11:36,200
And why is that? Well, because you have to know some details of the IEEE floating point standard, but there is a special number in the IEEE standard called not a number. And it turns out that not a number called a n times zero is equal to not a number.

56
00:11:36,200 --> 00:11:55,200
And in particular, not a number times zero is not equal to zero. So if x and y are floating point numbers, you can't do this optimization. And in fact, if you did this optimization, it would break certain very important algorithms that rely on the proper propagation of not a numbers.

57
00:11:56,200 --> 00:12:04,200
Finally, the last compiler phase is code generation, often referred to as code gen.

58
00:12:04,200 --> 00:12:15,200
And code gen can produce assembly code. That's the most common thing that a compiler would produce. But in general, it's a translation into some other language. And this is entirely analogous to human translation.

59
00:12:15,200 --> 00:12:27,200
So just as a human translator might translate English into French, a compiler will translate a high level program into assembly code.

60
00:12:28,200 --> 00:12:45,200
To wrap up, almost every compiler has the five phases that we outlined. However, the proportions have changed a lot over the years. And if we were to go back to Fortran one and look inside of that compiler, we would probably see a size and complexity that looks something like this.

61
00:12:45,200 --> 00:13:03,200
A fairly complex electrical analysis phase, an equally complicated parsing phase, a very small semantic analysis phase, a fairly involved optimization phase, and another fairly involved code generation phase.

62
00:13:04,200 --> 00:13:14,200
And so we'd see a compiler where the complexity was spread fairly evenly throughout except for semantic analysis, which was very weak in the early days.

63
00:13:14,200 --> 00:13:25,200
And today, if we look at a modern compiler, you'll see almost nothing in Lexing very little in parsing because we have extremely good tools to help us write those two phases.

64
00:13:25,200 --> 00:13:46,200
But we would see a fairly involved semantic analysis phase. We would see a very large optimization phase. And this is in fact the dominant component of all modern compilers. And then a very small code generation phase, because again, we understand that phase very, very well.

65
00:13:46,200 --> 00:13:52,200
That's it for this lecture. Future lectures will look at each of these phases in detail.

