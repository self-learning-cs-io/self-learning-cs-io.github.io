---
title: CS143 P12Week203 04 Formal Languages
---

1
00:00:00,000 --> 00:00:06,000
Welcome back. In this video we're going to take a little digression and talk about formal languages.

2
00:00:06,000 --> 00:00:12,000
Formal languages play a big role in theoretical computer science, but they're also very important in compilers.

3
00:00:12,000 --> 00:00:18,000
Because inside of a compiler we typically have several different formal languages that we're manipulating.

4
00:00:18,000 --> 00:00:29,000
Regular expressions are one example of a formal language, but it's actually helpful, I think, in understanding regular languages and all the formal languages we'll see later on in later videos.

5
00:00:29,000 --> 00:00:35,000
I have to talk about one of formal languages in general.

6
00:00:35,000 --> 00:00:50,000
So let's begin with a definition. A formal language has an alphabet, so some set of letters sigma, and then a language over that alphabet is just a set of strings of the characters drawn from the alphabet.

7
00:00:50,000 --> 00:01:00,000
So in the case of regular languages we had certain ways of building up sets of strings of characters, but other kinds of languages would have different sets of strings.

8
00:01:00,000 --> 00:01:06,000
And in general a formal language is just any set of strings over some alphabet.

9
00:01:06,000 --> 00:01:15,000
An example of a language that you're familiar with is a form from the alphabet of English characters, and it is just the set of English sentences.

10
00:01:15,000 --> 00:01:31,000
Now this is not quite a formal language in that we might disagree on which strings of English characters are in fact valid English sentences, but one could imagine that we could define some rules that would say that certain strings are English sentences and others aren't.

11
00:01:31,000 --> 00:01:35,000
And if we could come to some agreement this would be a fully formal language.

12
00:01:35,000 --> 00:01:47,000
Now a much more rigorous formal language would be something like the following. We could pick our alphabet to be the ASCII character set, and the language to be the set of all valid C programs.

13
00:01:47,000 --> 00:01:54,000
And this is definitely a very well-defined language. This is exactly the set of inputs that C compilers will accept.

14
00:01:54,000 --> 00:02:13,000
And the important contrast I want to draw here is that the alphabet is actually interesting. So different formal languages have very, very different alphabets, and we can't really talk about what the formal language is or what sort of strings we're interested in unless we first define that alphabet.

15
00:02:13,000 --> 00:02:36,000
Another important concept for many formal languages is a meaning function. Typically we have one of the strings in our language, and let's call that some expression E, and the expression E by itself is just a piece of syntax. It's a program in some sense, or it represents something else that which is the thing we're actually interested in.

16
00:02:36,000 --> 00:02:58,000
And so we have a function L that maps the strings in the language to their meanings. And so for example, in the case of the regular expressions, this would be a regular expression, and that would be mapped to a set of strings, the regular language that that regular expression denotes.

17
00:02:58,000 --> 00:03:13,000
So we saw an example where we wrote out the meaning function for regular expressions last time. So let's use regular expressions as an example, and I'm going to first write down the meaning of the regular expressions the way I wrote it down in the last video.

18
00:03:13,000 --> 00:03:33,000
If you recall, we had a regular expression Epsilon, and that denoted a set which contained just one string, namely the empty string. And then we had a regular expression C for every character in the alphabet, which also denoted a set containing just one string, namely the single character C.

19
00:03:33,000 --> 00:04:02,000
And then we had a bunch of compound expressions. So for example, A plus B, that was equal to the union of the sets A and B. And we had the concatenation, so I could juxtapose A and B, and that was equal to a cross product where I selected a string from each set in order and concatenated them together.

20
00:04:02,000 --> 00:04:18,000
And finally, there was iteration, so I could write a star, and that was the union over i greater than 0 of all the sets A to the i.

21
00:04:19,000 --> 00:04:33,000
And the interesting thing about this definition is you can see that we're mapping over here we have expressions. Let me switch colors here. Over here we have the expressions. And over here we have the sets.

22
00:04:34,000 --> 00:05:00,000
But there's something kind of odd about the way this is written, and not quite right, because you can see here where clearly we have an expression, and we have a piece of syntax A plus B. And then somehow on the other side, these A and this A and this B have magically turned into sets that we're taking the union of. And similarly down here we're choosing an element from this set, but this set is also an expression. And what does it mean? Somehow we're conflating the sets and the expressions.

23
00:05:00,000 --> 00:05:16,000
And this is what the meaning function is intended to fix, and this is what they are intended to make clear. So we really want to say that there's some mapping that the language L of epsilon is this set.

24
00:05:16,000 --> 00:05:25,000
So the L maps from expressions into sets of strings.

25
00:05:26,000 --> 00:05:40,000
It's a function that maps one to the other, and if you haven't seen this notation before, this is a standard notation for describing functions. It just says that L is a function from things in this domain to this range.

26
00:05:40,000 --> 00:05:59,000
And similarly, the language of this expression is this set. And it becomes really useful for the compound expressions, because we say the language of this expression is equal to the language of A union with the language of B. And now you can see the recursion.

27
00:05:59,000 --> 00:06:25,000
First, we interpret A and B using L, and we take the union of the result. So now it's clear what's a set and what's an expression. And similarly here, the language of A can catenade with B, we are going to select elements from the language of these two expressions, and then we're going to form another set from those two sets.

28
00:06:25,000 --> 00:06:39,000
And finally, for iteration, the language of A star is equal to the union over the meaning of a bunch of expressions. A to the I is an expression. This is a piece of syntax, and we have to convert it to a set in order to take the union.

29
00:06:39,000 --> 00:07:06,000
And so now this is the proper definition of the meaning of regular expressions, where we've made the meaning function L explicit, and we've shown exactly how recursively we apply L to decompose the compound expressions into similar expressions that we compute the meaning of and then compute the sets from those from those separate smaller sets.

30
00:07:06,000 --> 00:07:32,000
So there are several reasons for using a meaning function. We just saw one of them, which is to make clear what is syntax and what is semantics in our definitions. Some parts of the definition are expressions, and some parts are the meanings or the sets. And the using L makes it clear that the arguments to L are the programs or the expressions, and the results are the sets, the outputs are the sets.

31
00:07:32,000 --> 00:07:55,000
But there are a couple other reasons for separating syntax and semantics. One is that it allows us to consider notation as a separate issue. That is, if we have syntax and semantics being different, then we can vary the syntax while we keep the semantics the same, and we might discover that some kinds of syntax are better than others for the problems that we're interested in or for the languages that we're interested in.

32
00:07:55,000 --> 00:08:16,000
And another reason for separating the two is that because expressions and meanings, because syntax and semantics, are not in one-to-one correspondence. And I actually illustrated this with regular expressions in a previous video, but I want to reiterate here that there are generally many more expressions than there are meanings.

33
00:08:16,000 --> 00:08:30,000
So that means there may be multiple ways to write an expression that means the same thing. I'd like to take a moment to illustrate why separating syntax from semantics is beneficial for notation.

34
00:08:30,000 --> 00:08:45,000
So everybody is familiar with our number system, so I can write numbers like 0, 1, 42, and 107. And they're very nice algorithms for describing how you add and subtract and multiply such numbers.

35
00:08:45,000 --> 00:09:01,000
But there are older systems of notation for numbers, things like the Roman numerals. I could have the number 1, I could have the number 4, the number 10, and say the number 40, I think, is written like that.

36
00:09:01,000 --> 00:09:18,000
And an issue with this number system, well, first of all, let me stress that these two have the same meanings. So the meanings of expressions in this language are the integers, and it's exactly the same in this language.

37
00:09:18,000 --> 00:09:37,000
So the idea, the meaning of these two systems are just the numbers. But the notation is extremely different. The number written in Roman numerals looks completely different from the number written in Arabic numerals. And the fact is that the Roman numerals are really painful to do addition and subtraction and multiplication.

38
00:09:37,000 --> 00:09:52,000
Back in ancient times, when this was a common system, it was not very well known how to do it, and very few people were actually good at doing arithmetic with this system because the algorithms were kind of complicated.

39
00:09:52,000 --> 00:10:11,000
And when we moved to the Arabic system, later, it was a big improvement because people, it was easier for people to learn how to do basic arithmetic with these kinds of numbers. And the only thing that changed between one system and the other was the system of notation.

40
00:10:11,000 --> 00:10:38,000
So notation is extremely important because it governs how you think and it governs the kinds of things you can say and these sorts of procedures that you will use. So don't underestimate the importance of notation. And this is one reason for separating syntax from semantics because we can leave the idea of what we're trying to do, the numbers alone, and play with different ways of representing them. And we might discover that some ways are better than others.

41
00:10:38,000 --> 00:10:48,000
The third reason I gave for separating syntax and semantics is that in many interesting languages, multiple expressions, multiple pieces of syntax, will have the same semantics.

42
00:10:48,000 --> 00:11:02,000
Now going back again to regular expressions, let's consider the regular expression zero star. Now there are many ways to write this same language, which is the language of all strings of zero, so strings of zeros of any length.

43
00:11:02,000 --> 00:11:23,000
So for example, I could also write that as zero plus zero star. Another way to write it is as epsilon plus zero zero star. And here you can see that this expression is all the strings of zeros of at least length one. And then we get the empty string from epsilon. So this is equal to zero star.

44
00:11:23,000 --> 00:11:41,000
And then just any combination of these things would also amount to an equivalent language, for example, that one, and so on. So there's actually an unbounded, unlimited number of ways I could write this language, but all of these mean exactly the same thing.

45
00:11:41,000 --> 00:12:02,000
And if you think about it, what this means is that in general, if I draw the two domains differently, and I think about different expressions over here and different distinct meanings over here, and the function L that maps between them, the function L is many to one.

46
00:12:02,000 --> 00:12:21,000
So there are points in this space where many different expressions or pieces of syntax map to the same meaning. And this is just a general characteristic of interesting formal languages.

47
00:12:21,000 --> 00:12:43,000
And this is actually extremely important in compilers because this is the basis of optimization. The fact that there are many different programs that are actually functionally equivalent, that's what allows us to substitute one program that runs faster than another. That's what allows us to replace one program with another if it runs faster and does exactly the same thing.

48
00:12:43,000 --> 00:12:51,000
So we couldn't do optimization. The reason we can do optimization is precisely because the meaning function is many to one.

49
00:12:51,000 --> 00:13:08,000
So meaning is many to one, and keep in mind, important point here is that it's never one to many. We don't want the opposite situation. If we have the opposite situation where L could map a single point to two different meanings, well, first of all, this would no longer be a function.

50
00:13:08,000 --> 00:13:22,000
But also it would mean that the meaning of certain expressions saying our programming language was not well defined. That when you wrote a program, it was actually ambiguous whether it meant this or it meant that. And that's a situation we don't like.

51
00:13:22,000 --> 00:13:32,000
So we expect our meaning functions to be many to one for non-trivial languages and we don't want them ever to be one to many.

52
00:13:32,000 --> 00:13:40,000
And that concludes today's video. Next time we're going to go back and continue with our discussion of lexical analysis.

