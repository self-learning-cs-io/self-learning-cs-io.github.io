---
title: MIT6042J P109481RandomWalksVideo
---

1
00:00:00,000 --> 00:00:05,000
Random walks provide probabilistic models for a bunch of settings.

2
00:00:05,000 --> 00:00:07,000
In fact, we've seen a couple already.

3
00:00:07,000 --> 00:00:09,000
So let's examine what they are in general.

4
00:00:09,000 --> 00:00:13,000
So the setup for random walk is that you have a digraph.

5
00:00:13,000 --> 00:00:20,000
And we can also often think and talk about the digraph as though it was a state diagram for a machine with states.

6
00:00:20,000 --> 00:00:25,000
So here's a three-state digraph, blue, orange, and green.

7
00:00:25,000 --> 00:00:36,000
And the part that becomes probabilistic is that we think of the process of which edge to follow when you're at a given state is made probabilistically.

8
00:00:36,000 --> 00:00:48,000
And the only rules are that we're going to assign probabilities to the edges in a way like this, where, for example, what I'm telling you is there's a one-third probability that I'll follow the edge from O to O,

9
00:00:48,000 --> 00:00:53,000
and a two-thirds probability that I'll follow from the edge from O to green.

10
00:00:53,000 --> 00:00:58,000
And the rule is simply that the sum of the probabilities on the outgoing edges has to sum to 1.

11
00:00:58,000 --> 00:01:01,000
So let's fill in the rest of the graph in a legal way.

12
00:01:01,000 --> 00:01:09,000
So here we have B with a half probability of going from B to B, a quarter from B to O, and a quarter from B to G.

13
00:01:09,000 --> 00:01:15,000
And the green state is certain in one step if you're at green to go to blue next.

14
00:01:15,000 --> 00:01:20,000
There's only one edge out. It has probability 1.

15
00:01:20,000 --> 00:01:24,000
Now, Kim was ruined. It can be seen as an example of this kind of a random walk.

16
00:01:24,000 --> 00:01:30,000
The states were the amount of money that you had ranging from zero when you're bankrupt to T when you've reached your target.

17
00:01:30,000 --> 00:01:35,000
And N is the start state, which is your initial stake.

18
00:01:35,000 --> 00:01:41,000
The green edges are weighted with the probability of P of winning a bet.

19
00:01:41,000 --> 00:01:49,000
So we have transitions from K to K plus 1 for K less than T of probability P.

20
00:01:49,000 --> 00:01:55,000
And likewise, the red edges are weighted with the probability of losing a bet Q or 1 minus P.

21
00:01:55,000 --> 00:02:03,000
So there is a diagram for a state machine that describes the gambler's ruined problem

22
00:02:03,000 --> 00:02:06,000
as a probabilistic walk on a graph.

23
00:02:06,000 --> 00:02:23,000
And the typical kind of question that we would ask about a random walk on a graph would be, what's the probability of reaching T the target before reaching zero bankrupt given that you're starting at some state N?

24
00:02:23,000 --> 00:02:39,000
So in walks come up in a bunch of quite different settings. For example, in physics, a Brownian motion is the random motion of a particle that's being buffeted by atomic forces.

25
00:02:39,000 --> 00:02:47,000
And it's modeled by saying that this particle can move in any direction in three space and chosen uniformly at random.

26
00:02:47,000 --> 00:02:53,000
And the theory of Brownian motion, it had been observed first without being understood.

27
00:02:53,000 --> 00:03:00,000
Einstein was the first one to come up with a random walk model and corresponding theorems about the behavior of particles under Brownian motion.

28
00:03:00,000 --> 00:03:14,000
In fact, that was one of the main components of his Nobel Prize. He wasn't given a Nobel Prize for relativity at the time because it had not yet been firmly proven, although it was widely celebrated.

29
00:03:14,000 --> 00:03:28,000
In other cases, in finance, we've already seen how gamblers ruin reflects or seems to reflect the biased random oscillation of price of stock prices over time.

30
00:03:28,000 --> 00:03:46,000
And we will see at the end of this set of videos an application of random walks on a graph to model web search and clustering of a focus on vertices in a diagram.

31
00:03:46,000 --> 00:03:56,000
So the general kinds of questions that come up when you're talking about random walks on graphs are illustrated by this simple three state example with blue, orange and green.

32
00:03:56,000 --> 00:04:04,000
We might ask, for example, starting at state B, what's the probability of reaching state O in seven steps?

33
00:04:04,000 --> 00:04:09,000
And now it would be easy enough to calculate in this small example, but it would be a typical question.

34
00:04:09,000 --> 00:04:15,000
A more interesting general question would be, what's the average number of steps that it takes to get from B to O?

35
00:04:15,000 --> 00:04:33,000
I mean, you could with one problem with probably a quarter, you go there in one step, but with probability an A if you go there in three steps and so on, you can calculate again explicitly and easily enough what the average number of steps from B to O is in this simple example.

36
00:04:33,000 --> 00:04:44,000
And we will shortly remark about general ways to solve that problem. And finally, you can ask a gambler's ruin type question, what's the probability of starting at B of getting to G before O?

37
00:04:44,000 --> 00:05:02,000
Well, in this trivial example, you can just read off the answer you are going to get to G before O with 5050 probability because from B you have to go one place or the other with equal probability.

38
00:05:02,000 --> 00:05:10,000
But in general, this becomes a more interesting and complicated question, which you can solve by methods that we're about to lay out.

39
00:05:10,000 --> 00:05:30,000
Let me just remind you that we've already seen an interesting and illustrative example of random walk on a graph. When we were looking at coin tosses, the problem for example of if I toss a fair coin and I wait for three consecutive tosses that form the pattern HTH or the pattern TTH.

40
00:05:30,000 --> 00:05:46,000
And I want to know what's the probability of winning because HTH comes before TTH. I can model that with an infinite tree diagram using our tree method for forming probability spaces.

41
00:05:46,000 --> 00:06:01,000
But the tree was very recursively defined. Subtrees were isomorphic to the original tree, which allowed us in fact to come up with a finite description of the infinite tree that amounted to a finite state machine or a finite graph.

42
00:06:01,000 --> 00:06:13,000
So let's look at that example in more detail. If I'm trying to model the coin flipping thing, like we start off in a state where the previous two flips don't exist. I haven't flipped anything yet.

43
00:06:13,000 --> 00:06:25,000
The state is going to record the values of the previous two flips. And with no prior flips, there's a 50-50 chance that the first flip will be H in which case I'm in the state with just an H and nothing preceding.

44
00:06:25,000 --> 00:06:40,000
Or there's a 50-50 chance I flip a T in which case I'm in the state in which there's been a T and nothing previous. But I can already say something then about the probability of tossing HTH before TTH, namely the probability of winning.

45
00:06:40,000 --> 00:06:57,000
Probability of winning is of course the probability of winning given that I start at the start state with no prior flips. But the probability that I win starting here is simply the probability that I win at starting at the state nothing H.

46
00:06:57,000 --> 00:07:24,000
Or the probability that I win at the state started nothing T with the two probabilities weighted equally since this is a fair coin. And there's a 50-50 chance of going each way. That is the probability of winning given no prior tosses is half the probability of winning if the first toss is an H plus half the probability of winning if the first tosses at T. This is just an application of the law of total probability.

47
00:07:24,000 --> 00:07:43,000
So continuing in this way, let's expand more of the diagram. So suppose that I have tossed ahead and then after that I toss ahead and I go to state HH or I toss at T and I go to state HT. So here I'm just recording the previous two flips with the most recent one on the right.

48
00:07:43,000 --> 00:08:05,000
Okay, this structure of the state diagram tells us that if I want to know what the probability of winning given that I flipped exactly one head at the start the probability is simply by again total probability the probability of winning from HH weighted by a half and the probability of winning from HT weighted by a half.

49
00:08:05,000 --> 00:08:16,000
And I wind up again with a simple linear equation that connects the probability of winning in one state with the probability of winning in the states that it goes to.

50
00:08:16,000 --> 00:08:34,000
Let's continue and do another example. So likewise if I expand what happens after I flip a T or an H after having flipped the first head I get a corresponding equation that the probability of winning after a single tail is the same as the probability of winning.

51
00:08:34,000 --> 00:08:49,000
With a tail followed by an H or a tail followed by a tail. This is a more interesting part of the diagram. We're suppose that my past two flips have been two H's. Well if I flip an H again then I'm back in state where the previous two flips were H's.

52
00:08:49,000 --> 00:09:02,000
Or if I flip a T then I'm in the state of HT where the previous flips were an H and a T in that order. And that tells me if I want to know about the probability of winning given HH.

53
00:09:02,000 --> 00:09:20,000
Now it's the probability of winning given HH plus the probability of winning given HT. And again it's a linear equation connecting up the probability of winning in one state with the probability of winning in other states possibly itself but there's no circularity here.

54
00:09:20,000 --> 00:09:23,000
It's just a system of linear equations.

55
00:09:23,000 --> 00:09:35,000
Well there's what the whole diagram looks like in particular once you've flipped HT if you then flip an H you've won because you got to HTH first and you stay in the Wednesday forever.

56
00:09:35,000 --> 00:09:44,000
Or alternatively once you flip TT if you flip an H you've lost because TT has come up first if you flip a T again you stay and stay TT.

57
00:09:44,000 --> 00:09:51,000
And what we can say is the probability of winning if you're in the win state is one and the probability of winning if you're in the lose state is zero.

58
00:09:51,000 --> 00:10:07,000
And overall I simply have this system of linear equations for the probability of winning in one state given other states and I can solve these linear equations to find the probability of winning in the start state which is simply the probability of winning.

59
00:10:07,000 --> 00:10:34,000
So looking back at our questions for random walks where we ask whether the probability of reaching all in seven steps starting at B what's the probability of that what's the average number of steps to go from B to O what's the probability of reaching G before O starting at B in every case these questions can be formulated simply as solving systems of linear equations whose structure directly reflects the structure of the diagram.

