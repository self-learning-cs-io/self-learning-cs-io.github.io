---
title: MIT6042J P110482StationaryDistributionsVideo
---

1
00:00:00,000 --> 00:00:10,000
So some of the standard questions that we've examined already about random graphs are the probability of getting from one place to another or the expected time to get from one place to another.

2
00:00:10,000 --> 00:00:16,000
But a different kind of question that comes up in a fundamental way is the probability of being someplace.

3
00:00:16,000 --> 00:00:18,000
So let's examine that.

4
00:00:18,000 --> 00:00:25,000
Here is the graph with states blue, orange, and green that we've seen before.

5
00:00:25,000 --> 00:00:36,000
And suppose that I start at state B and I ask what's the probability of being at each of these states after one step?

6
00:00:36,000 --> 00:00:47,000
So to start with, I'm interested in Pb, P, O, and Pg, which is the probability of being at state B, the probability of being at state O and the probability of being at state G.

7
00:00:47,000 --> 00:00:57,000
The sum of the probabilities is going to be 1. And initially when I tell you that I'm at state B, it means the probability of being at B is 1 and the other 2 is 0.

8
00:00:57,000 --> 00:01:15,000
And I'm interested in the way that these probabilities update after one step, if P prime B is the probability of being in state B after one step and P prime 0, O is the probability of being in the orange state one step later and likewise for green, what are these probabilities?

9
00:01:15,000 --> 00:01:26,000
Well, it's easy to see just reading off this graph that the only place you're at is B. So the only way to get probability of being somewhere is by looking following an edge out of B.

10
00:01:26,000 --> 00:01:37,000
So the probability of being at one step at the orange vertex is a quarter and it's likewise a quarter for being at the green state and it's a half for staying at the blue state.

11
00:01:37,000 --> 00:01:48,000
So what we can say is that the updated probabilities of being at these different states is a half a quarter and a quarter as we've just reasoned.

12
00:01:48,000 --> 00:02:02,000
Okay, let's keep going. Given that the probability that I'm at the state's blue orange and green are given by this vector of probabilities, what's the distribution after two steps?

13
00:02:02,000 --> 00:02:16,000
So let P double prime B be the probability of being at state B after two steps starting from B. Well, the way we can figure that out is by using conditional probabilities.

14
00:02:16,000 --> 00:02:26,000
Let's look at the example of the probability calculating the probability of being in the orange state two steps after you've started at the blue state.

15
00:02:26,000 --> 00:02:36,000
Here is the probabilities of being at the different states after one step. How do I get to the orange state? Well, I can get to the orange state from the blue state.

16
00:02:36,000 --> 00:02:52,000
And so the probability of being in the orange state after two steps is the probability of being at the blue state after one step times the probability that I take this edge to the orange state.

17
00:02:52,000 --> 00:03:03,000
That is, it's the probability of going from B to O given that I'm at B times the probability of being in B after one step.

18
00:03:03,000 --> 00:03:18,000
This then is the probability of being in O after two steps. And likewise, the probability of being at O, another component of the probability of being at O is that if you're at O and what's the probability of going from O to O,

19
00:03:18,000 --> 00:03:31,000
and that is this one third times the probability of being at O at O, which is a quarter. And the final case using again the law of total probability breaking it up into cases.

20
00:03:31,000 --> 00:03:43,000
The third way that I can get to the orange state on step two is by being at the green state on step one following the green to O edge of which there isn't any.

21
00:03:43,000 --> 00:03:49,000
So that's going to be probability zero times the probability of being at the green state, which is a quarter, but it won't matter.

22
00:03:49,000 --> 00:04:01,000
So let's just fill in these amounts. Looking at the first term, the probability of going from B to O when you're at B is simply the probability of this edge.

23
00:04:01,000 --> 00:04:12,000
It's a quarter. And likewise, the probability of going from O to O given that you're at O is the probability of this edge, namely a third.

24
00:04:12,000 --> 00:04:22,000
So we can fill that term in and finally the probability of going from G to O is zero given that you're at G because there isn't any vertex there.

25
00:04:22,000 --> 00:04:33,000
And then you fill in those probabilities and do the arithmetic. You come out with a 524th probability of being in the orange state after two steps.

26
00:04:33,000 --> 00:04:42,000
Well, the same calculation you can figure out what's the probability of being at the blue state or the green step after two steps. And there's the answer.

27
00:04:42,000 --> 00:04:54,000
There's a 50, 50 chance of being in the blue state after two steps 524th as we saw at the orange state and the rest of it is 724th is the probability of being at the green state.

28
00:04:55,000 --> 00:05:04,000
Okay, so what's going on in general? And we can explain how to do these calculations by using a little bit of linear algebra.

29
00:05:04,000 --> 00:05:23,000
So let's define the edge probability matrix of a random walk graph is just the adjacency matrix of the graph, except that instead of using zeros and ones to indicate whether an edge is not present or present, I'll use in the in the ij position of the matrix.

30
00:05:23,000 --> 00:05:30,000
The probability of the edge that goes from i to j if there is an edge in zero if there isn't any edge.

31
00:05:30,000 --> 00:05:44,000
Let's look at an example. So here is the way we fill in an abstractly for our three state graph. It'll be a three by three matrix with the probabilities of the successive edges in the corresponding position.

32
00:05:45,000 --> 00:06:02,000
So this is the position in the b b coordinate is the probability of the edge from b to b the o b coordinate if you think of the columns as labeled blue orange green and the rows as labeled blue orange green.

33
00:06:02,000 --> 00:06:09,000
This is the orange blue coordinate and it's the probability of the edge from zero to b.

34
00:06:09,000 --> 00:06:22,000
Let's fill in the first row which was this is just read directly off the graph. It was the edges out of b that went from b to b from b to o and from b to g and it had those weights.

35
00:06:22,000 --> 00:06:32,000
If I fill in the rest of it, I get the edge probability matrix for our simple three state graph and there it is.

36
00:06:32,000 --> 00:06:45,000
This last one shows the fact that there is a certain edge from green to blue. The only place you can go from green is to blue and you can't go to either orange or green in one step.

37
00:06:45,000 --> 00:06:59,000
Why are we bringing up the matrix? Well, if you looked at the way we updated the state to go from the one step distribution to the two step distribution, it was really a matrix multiply.

38
00:06:59,000 --> 00:07:22,000
If you have the probabilities of being in the successive states b, o and g and you do a matrix vector matrix multiplication using the probability matrix of the graph, you get the updated vector of distributions.

39
00:07:22,000 --> 00:07:29,000
That's easy to check just from the definitions and from the definition of vector times matrix which I assume you're familiar with.

40
00:07:29,000 --> 00:07:45,000
Now we can ask what's the distribution after t steps starting from some particular given distributions starting in state b or starting at any possible distribution of probabilities to the different states.

41
00:07:45,000 --> 00:07:56,000
The way we can figure that out, so I'm interested in the probability of being in o after t steps g after t steps and b after t steps say starting from state b.

42
00:07:56,000 --> 00:08:03,000
What happens also as t approaches infinity? These are two basic questions that we're going to be asking.

43
00:08:03,000 --> 00:08:19,000
First of all, how do you calculate starting at a given distribution p, b, p, o, p, g where you're going to be after t steps? Well, you're just continually updating which means multiplying by m t times.

44
00:08:19,000 --> 00:08:26,000
The distribution after t steps is gotten by taking the initial distribution times the teeth power of m.

45
00:08:26,000 --> 00:08:48,000
Now this is actually already useful computationally because it means that since you can compute a matrix power by successive squareings, you actually only need about log of t matrix multiplications in order to be able to figure out what's the distribution of probabilities after t steps of the t steps.

46
00:08:48,000 --> 00:09:02,000
Then the crucial concept that we want to examine and we'll make a lot of use of in the next video when we talk about a page rank is the idea of a stationary distribution.

47
00:09:02,000 --> 00:09:13,000
So a stationary distribution means that once you're in the stationary distribution, it's stable. You're going to say stay in that distribution.

48
00:09:13,000 --> 00:09:24,000
You're not going to be in any particular state, but you'll have a vector of probabilities of being in the different states. And one step later, that vector is not going to change.

49
00:09:24,000 --> 00:09:36,000
So what it means is that the next step distribution is the same as the current distribution. What's the stable? What's the stationary distribution here? Well, the way we're going to have to calculate that is here's how you update.

50
00:09:36,000 --> 00:09:44,000
This is the result of the matrix of the vector matrix multiplication, but let's just spell it out in terms of the conditional probabilities.

51
00:09:44,000 --> 00:09:59,000
After one step, if the original distribution is Pb, P o, P g, then the new probability of being in state B, the only way you can get there is by following the edge from B to B with probability of half.

52
00:09:59,000 --> 00:10:11,000
And that's times the probability of being at B. And the other way you can get to B is by being at the green state, and then one step later, you're certain to be at B.

53
00:10:11,000 --> 00:10:19,000
So that adds a contribution of one times Pg. Likewise for the updated probability of being at the orange state and the green state.

54
00:10:19,000 --> 00:10:28,000
And what we want is that these updated probabilities are the same as the ones that I'm starting with. That's the definition of stability.

55
00:10:28,000 --> 00:10:48,000
You update the vector Pb, P o, P g, and you get the same vector. That's what makes it stable. And of course, a side constraint, since you can always solve a system of equations like this by letting all the P's be zero, which is degenerate, we add the constraint that the sum of the probabilities of being in the states has to be one.

56
00:10:48,000 --> 00:11:06,000
Well, if we solve the simple three by three system of equations, then it turns out that the stable distribution is there's an eight fifteenth chance of being in state B, a three fifteenth chance of being in state orange, and a four fifteenth state chance of being in state green.

57
00:11:06,000 --> 00:11:21,000
And you should check that yourself by asking, what's the probability of being in Pb after one step given these probabilities, and I'm not going to talk you through that, but just to verify and imprint the idea of stability.

58
00:11:21,000 --> 00:11:28,000
That's one that's worth stopping the video for a moment to check and do a little arithmetic with a pencil and paper.

59
00:11:28,000 --> 00:11:53,000
Okay, so in general, what we're going to do is we're trying to find the stationary distribution vector, call it s bar for vector, and we get this by solving the vector matrix equation that the distribution vector times the edge probability matrix is equal to that same distribution vector.

60
00:11:53,000 --> 00:12:11,000
We want to solve this system of equations if there are n states, then this is an n by n system of equations with an additional constraint that we want the norm of the stable vector to be one because that's to avoid the degenerate zero solution.

61
00:12:11,000 --> 00:12:24,000
Well, there are some problems with stationary distributions that we want to think about. First of all, what happens in this example where you have just two states and the probability of being the first state and one and the second state is zero?

62
00:12:24,000 --> 00:12:40,000
Well, if you update that state, what happens is you go to the, you just go to the second state with probability one, and you can keep doing that, and there may be a stable distribution here, but this particular pattern doesn't converge to it as you go through top.

63
00:12:40,000 --> 00:12:59,000
As you go through time, half the time you're at every other step, state one and every other step, you're at state zero. But you never get to a stable distribution where step after step, you're at equal probability of being at these two places.

64
00:12:59,000 --> 00:13:10,000
So I'm assuming here that this is a certain edge, and that's a certain edge, it has to be, there's only one edge out. So a stable distribution would be a half a half, but this thing doesn't converge to it.

65
00:13:10,000 --> 00:13:24,000
Okay, here's a slightly more complicated example where again, assume that all the edges are equally likely. There's exactly two edges out of each of these vertices. So each edge has way to half.

66
00:13:24,000 --> 00:13:51,000
And the problem with this graph is that when you ask what's the stable distribution, and if, well, if you look at it, if you assume that the probability of being in the middle is zero, and the two places that you get stuck at have probability p and one minus p, then that's stable because once you're at this state with probability p, you're following the one certain edge that goes back around to this vertex.

67
00:13:51,000 --> 00:14:03,000
And therefore there's probability of p of being there one step later, and likewise probability q of one step later. So the split between p and q is a stable distribution for this thing with probability zero and zero there.

68
00:14:03,000 --> 00:14:13,000
And of course, p and q can be any real numbers between zero and one. So there's actually an uncountable number of stable distributions for this graph.

69
00:14:13,000 --> 00:14:30,000
The problem here is it's not strongly connected, and that turns out to be a sufficient condition that it's got a single stable distribution whenever it's strongly connected.

70
00:14:30,000 --> 00:14:42,000
So, I don't know, we can ask the question, is there always a stable a stationary distribution for any random graph? Well, if the graph is finite, yes, there's guaranteed to be a stationary distribution.

71
00:14:42,000 --> 00:14:56,000
But is it unique? Well, sometimes, sometimes not. If the graph is strongly connected, it will be unique, but we've seen examples where in the previous slide where it's not unique. In fact, it could be uncountably many.

72
00:14:56,000 --> 00:15:14,000
And another crucial question is does a random walk approach the stable distribution no matter how you start? And that first example was one where you went between the first state and the second state and oscillated, and it never converged on the stable distribution of a half and a half.

73
00:15:14,000 --> 00:15:36,000
In general, it's nice when you can say that no matter how you start, after a while things stabilize and you wind up at the unique stable distribution. So sometimes it'll be the case that every distribution, every initial distribution will eventually converge on the stable one or the stationary one, sometimes not.

74
00:15:36,000 --> 00:16:00,000
And then another crucial question will be how quickly does this convergence happen? If we start off at some arbitrary probability distribution or some particular state, how long does it take before by and large the probabilities that were in the different states has become pretty stationary? And the rate at which that happens again varies depending on the graph.

