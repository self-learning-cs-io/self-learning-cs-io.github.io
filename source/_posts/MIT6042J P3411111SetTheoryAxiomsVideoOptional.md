---
title: MIT6042J P3411111SetTheoryAxiomsVideoOptional
---

1
00:00:00,000 --> 00:00:12,000
Let's take a quick look at the axioms of Zermelo-Frankl's set theory with choice.

2
00:00:12,000 --> 00:00:26,000
So, the axioms of ZFC define the standard theory of sets, which is now accepted by most mathematicians as a reliable

3
00:00:26,000 --> 00:00:32,000
and simple basis for developing and justifying all of mathematics.

4
00:00:32,000 --> 00:00:39,000
Among the axioms, maybe a simple one to understand, and really the motivation for this short video is twofold.

5
00:00:39,000 --> 00:00:46,000
One is practice with writing predicate formulas, and the other is to think a little bit more about self-application.

6
00:00:46,000 --> 00:00:56,000
So, one of the basic axioms of set theory is called extensionality, which is capturing the idea that a set is determined by its members.

7
00:00:56,000 --> 00:01:05,000
So, let's consider the assertion that two sets x and y have the same elements, which we could write as a predicate formula in set theory as for all x,

8
00:01:05,000 --> 00:01:12,000
x is a member of y if and only if x is a member of z. Now, we could use this as a definition of equality.

9
00:01:12,000 --> 00:01:23,000
It's what we mean by y and z are equal, but we don't really need to even introduce equality as a basic part of the language and add axioms about how it behaves.

10
00:01:23,000 --> 00:01:34,000
There's one axiom that covers things adequately, and that is that if two sets have the same members, then they are members of the same sets.

11
00:01:34,000 --> 00:01:47,000
So, if both the members of x and y are the same, then x and y are members of exactly the same things, which we could say this way, for every x, y is an x if and only if z is an x.

12
00:01:47,000 --> 00:01:56,000
So, that is one of the basic axioms of set theory, maybe the starting one.

13
00:01:56,000 --> 00:02:15,000
Another one is the power set axiom, which simply says that every set has a power set. How would you say that in the language of predicate set theory? Well, you'd say that for every x, there is a p, which is going to be the power set of x, such that for every set s, s is a subset of x if and only if s is a member of p.

14
00:02:15,000 --> 00:02:22,000
Remember, we know how to express s is a subset of x in the language of predicate calculus, mentioning only membership.

15
00:02:22,000 --> 00:02:33,000
So, this is a good axiom that says yes, there is a set p consisting of precisely the subsets of x. That set p is called the power set of x.

16
00:02:33,000 --> 00:02:57,000
When you're trying to deal with the Russell's paradox kind of issue where you define a set of elements or a collection of sets that satisfy some property, the safe conservative version of saying that a set of elements that satisfy some property really is a set of collection of elements that satisfy some property really is a set.

17
00:02:57,000 --> 00:03:17,000
The comprehension axiom is a simple version of an axiom that allows you to do that. So, basically, it says that if s is a set and p of x is an arbitrary predicate of set theory, which might in fact be one of these dangerous things like x is not a member of x.

18
00:03:17,000 --> 00:03:39,000
Nevertheless, if you look at those elements in the set s that satisfy p of x, that's a set. In other words, the set of x in s such that p of x is a set, it means that any definable collection of elements within a set also form a proper subset.

19
00:03:39,000 --> 00:04:02,000
And the reason why this matters is remember if I just talked about not the set of x in a particular set s that satisfy p of x. If I just talked about the collection of x is that satisfy p of x, that's when I start getting into Russell's paradox areas when I declare that the set of x such that p of x is a set for unrestricted p of x.

20
00:04:02,000 --> 00:04:14,000
But all I need to do is put a bound on the elements that x ranges over, that x is a member of some particular set, then it's safe to take all of those x's that say.

21
00:04:14,000 --> 00:04:26,000
And here is a formula that's asserting foundation for every x if x is not empty, that implies that there is a y such that y is membership minimal in x.

22
00:04:27,000 --> 00:04:42,000
Well, what is the foundation got to do with membership? Well, the foundation actually will very quickly let us conclude that no set is a member of itself. How does that work? Well, suppose that you are interested in some set and you'd like to verify that this set can't be a member of itself.

23
00:04:42,000 --> 00:04:50,000
Well, let r be the set consisting of just this set s that you're interested in. r is the singleton s. It's only element in s.

24
00:04:50,000 --> 00:05:02,000
Well, r is not empty and by the foundation axiom it must have a membership minimal element. Now, suppose that s is an s we're going to reach a contradiction.

25
00:05:02,000 --> 00:05:16,000
The claim is that r has no membership minimal element and that violates the foundation axiom so you can't have s as a member of s. Why does this follow? Well, look, r is supposed to have a membership minimal element. Well, r has only got one element.

26
00:05:16,000 --> 00:05:33,000
So if it's got any membership element, it's got to be s. But s can't be membership minimal because s is in r and it's got and which means that s has an element in r in it.

27
00:05:33,000 --> 00:05:45,000
So s is not r minimal and the foundation axiom then immediately implies that you can't have s be a member of s. s is not minimal membership minimal in r.

28
00:05:45,000 --> 00:05:58,000
And this argument extends in a nice way to a member of a member of a member and will throw a feedback on one question about that actually shortly.

29
00:05:59,000 --> 00:06:23,000
So looking at the foundation axiom in the conclusion that no set is a member of itself, what we can immediately conclude is that first of all, the collection of all sets can't be a set because if all sets, if the collection of all sets was a set, then it would be a member of itself, not forbidden by the s can't be a member of s.

30
00:06:23,000 --> 00:06:34,000
So the second thing it tells us is remember the said w from Russell's paradox w was the collection of those sets which are not members of themselves.

31
00:06:34,000 --> 00:06:44,000
Well, now we've just figured out that this is all sets because no set is a member of itself. So the sets that are not members of themselves is everything.

32
00:06:44,000 --> 00:06:55,000
That's why w is not a set and not a member of itself, which explains finally how the foundation axiom resolves of the Russell paradox.

