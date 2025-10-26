---
title: MIT6042J P99457MeanTimetoFailureVideo
---

1
00:00:00,000 --> 00:00:04,000
We're constantly asking how long we have to wait for things.

2
00:00:04,000 --> 00:00:14,000
And in the context of probability theory, it turns into the technical question called the expected time to failure or the mean time to failure.

3
00:00:14,000 --> 00:00:22,000
Some examples might be that an insurance company wants to know for a given policy holder or the expected time before that policy holder dies.

4
00:00:22,000 --> 00:00:32,000
A mechanical engineer wants to know the expected time before a button that's being pushed once per second is expected to fail.

5
00:00:32,000 --> 00:00:39,000
And I want to know when the part that my body shop has been waiting for is expected to come in.

6
00:00:39,000 --> 00:00:42,000
Okay.

7
00:00:42,000 --> 00:00:47,000
The mean time to failure problem we can formalize in terms of flipping coins.

8
00:00:47,000 --> 00:00:55,000
So we're going to flip a coin until a head comes up and we're going to think of a head as being a failure and a tail as a success.

9
00:00:55,000 --> 00:01:01,000
So let's assume the probability of getting ahead, the probability of failure is P.

10
00:01:01,000 --> 00:01:08,000
Again, this is not a fair coin. It's a coin that may be biased in either direction.

11
00:01:08,000 --> 00:01:16,000
And let's let F be the number of flips until the first head comes up, the number of flips until the first failure.

12
00:01:16,000 --> 00:01:20,000
And if we're counting as flips is time, it's the time to fail.

13
00:01:20,000 --> 00:01:29,000
So what we like to know is what's the expectation of F? What's the expected number of flips before a head comes up?

14
00:01:29,000 --> 00:01:33,000
Well, let's do some in order to calculate that expectation. We need to know some probabilities.

15
00:01:33,000 --> 00:01:40,000
So what's the probability that F equals one? Well, that's the same as saying that that's getting ahead on the first flip.

16
00:01:40,000 --> 00:01:46,000
It's the probability until you get an H that you get just an H on the first flip and that has probability P.

17
00:01:46,000 --> 00:01:52,000
What's the probability that F equals two? Well, that's the probability that you flip a tail and then a head.

18
00:01:52,000 --> 00:01:57,000
And that has probability Q times P because we're assuming the flips are independent.

19
00:01:57,000 --> 00:02:02,000
So it's the probability of a tail, which is Q times the probability of a head, which is P.

20
00:02:02,000 --> 00:02:10,000
Similarly, the probability of F equals three is the same as the probability of flipping tail, tail, head, and its Q squared pay.

21
00:02:10,000 --> 00:02:26,000
And of course, the probability density function of F, the number of steps until you flip a head at N, the probability that you have to flip N times before you get the first head is Q to the N minus one P.

22
00:02:26,000 --> 00:02:37,000
By the way, a random variable with whose probability density function has, is, is this value is called a geometric distribution. They come up all the time.

23
00:02:37,000 --> 00:02:51,000
All right, so what's the formula for the expectation of F? It's simply, of course, by definition. It's the expect, it's the sum over all the possible values of F, which in this case are integers N greater than zero, of N times the probability that F equals N.

24
00:02:51,000 --> 00:02:56,000
And we figured out that the probability that F equals N is Q to the N minus one times P.

25
00:02:56,000 --> 00:03:02,000
And now I'm going to observe that we really do know how to evaluate this sum easily enough.

26
00:03:02,000 --> 00:03:09,000
I'm going to factor out the P and it becomes a sum over N greater than zero, of Q to the N minus one times N.

27
00:03:09,000 --> 00:03:16,000
And then I can simplify matters if I replace N by N minus one. And then I get a Q to the N power.

28
00:03:16,000 --> 00:03:24,000
So this is equivalent to P times the sum over N greater than equal to zero of N plus one Q to the N.

29
00:03:24,000 --> 00:03:34,000
Now this is a familiar generating function. It's simply equal to one over one minus Q squared, as we've seen already.

30
00:03:34,000 --> 00:03:43,000
So in short, the expectation of F is P times one over square of one minus Q. Well, so let's pull them together there.

31
00:03:43,000 --> 00:03:50,000
Of course, one minus Q is P. So it's P times one over P squared or one over P.

32
00:03:50,000 --> 00:03:53,000
And we get this really very clean answer.

33
00:03:53,000 --> 00:03:59,000
The expected number of flips before you get ahead is one over the probability of a head.

34
00:03:59,000 --> 00:04:06,000
So for example, with a fair coin, where P is a half, the expected number of flips until you get the first head is two.

35
00:04:06,000 --> 00:04:12,000
It's one over a half. If you had a biased coin where the probability of getting a head was one in three,

36
00:04:12,000 --> 00:04:19,000
one third, then in fact, the expected number of flips until you got ahead was three.

37
00:04:19,000 --> 00:04:27,000
Okay. That's a nice clean answer, but we got it in this way that doesn't really give much intuition.

38
00:04:27,000 --> 00:04:36,000
So let's look at another naive way to derive the expected time to the first head without having to worry about generating functions.

39
00:04:36,000 --> 00:04:40,000
And well, that's sophisticated stuff about series, which is easy to forget.

40
00:04:40,000 --> 00:04:47,000
So let's look at the outcome tree that describes this experiment of flipping until you get the first head.

41
00:04:47,000 --> 00:04:53,000
So starting at the root, with probability P, you flip ahead immediately and you stop.

42
00:04:53,000 --> 00:05:00,000
Or with probability Q, you flip a tail. And then with probability P, you finally flip the head and stop.

43
00:05:00,000 --> 00:05:11,000
If you haven't flipped the head by the end of the first second step, then that is a possibility that you, with probability Q, flip the tail.

44
00:05:11,000 --> 00:05:20,000
And then there's a possibility that you stop after the third step with a head and so on. That's how this tree goes.

45
00:05:20,000 --> 00:05:25,000
Now, looking at the structure of this tree, it's an infinite tree, but it's very repetitive.

46
00:05:25,000 --> 00:05:32,000
In fact, if we call the tree B, then what we're seeing is that this whole subtree is a copy of B.

47
00:05:32,000 --> 00:05:39,000
So now, I have a nice recursive, but very finite description of this whole infinite tree.

48
00:05:39,000 --> 00:05:50,000
B is a tree that has a left branch of P that ends in a leaf, or a right branch with probability Q, followed by a repeat of the tree B.

49
00:05:50,000 --> 00:06:03,000
So now, I can apply total expectation to find the expectation of F. F is the expected number of steps I make in this tree until I finally make the left branch to an H.

50
00:06:03,000 --> 00:06:11,000
How do I figure out what the expected time in the tree is until I make that left branch of flipping ahead, finally?

51
00:06:11,000 --> 00:06:19,000
Well, using total expectation, what I can do is branch on whether or not the first flip is ahead.

52
00:06:19,000 --> 00:06:32,000
So the expectation of F, according to total probability expectation, is going to be the expectation of F given that the first flip is ahead times the probability P that it is ahead.

53
00:06:32,000 --> 00:06:44,000
And the other term is that it's the expectation of F given that the first flip is a tail times Q, the probability that the first flip is a tail.

54
00:06:44,000 --> 00:06:54,000
Well, let's look at, well, first of all, let's look at this term. What is the expected number of flips until you get ahead given that you got ahead? Well, it's one.

55
00:06:54,000 --> 00:07:08,000
So this term is easily taken care of. We understand that one. What about this term? This is the expected number of flips until you get the first tail.

56
00:07:08,000 --> 00:07:31,000
Sorry, it's the expected number of flips until you get the first head given that your first step was a tail. Well, what that means is that we are here after the tail and we're asking, what's the expectation of F, the number of flips that you get starting at B when you do one flip that takes you to the start of B again?

57
00:07:31,000 --> 00:07:51,000
And the answer is obviously one plus the expected number of flips in B, which is expected, expectation of F. In short, this term, the expectation of F given that the first flip is a T is a tail is simply one plus the expected number of flips that we're trying to figure out.

58
00:07:51,000 --> 00:08:08,000
Well, look at this. I have a very simple arithmetic formula now. Expectation of F is one times P plus one plus F times Q. There it is. And now I can solve for E of F. Well, just taking a quick look at this. This is going to be Q.

59
00:08:08,000 --> 00:08:29,000
This is going to yield a Q term and P plus Q is one. And this is going to be Q times E of F. And there's an E of F there. If I pull the E of F over, I'm going to do a little arithmetic. I'm going to leave the rest to you and realize again that the answer is what we had before. The expectation of F is equal to one over P.

60
00:08:29,000 --> 00:08:45,000
So let's do one more. Almost silly example for fun to remember what the significance of one over P is. Suppose I'm thinking about the space station mirror. Now it's spinning around. And there's a lot of garbage out there that it's likely to hit a lot of space junk.

61
00:08:45,000 --> 00:08:55,000
And suppose that based on our previous statistics and estimations of the small sort of small stuff that has been hitting me or that it could survive.

62
00:08:55,000 --> 00:09:12,000
That we estimate that there's about a one in 150,000 chance that in any given hour, it's going to run into some intolerable collision with space junk or a meteor that's going to destroy it.

63
00:09:12,000 --> 00:09:27,000
So suppose the space station mirror has a one in 150,000 chance of destruction in any given hour. So how many hours do we expect until destruction? Well, it's one over 150,000 or 150,000 hours which trans...

64
00:09:27,000 --> 00:09:49,000
So much facility space station examples. Let's wrap up with an intuitive argument that could be made rigorous, but I'm not going to because I think it's clearer just left in this informal way that makes it intuitive why you would expect that of course the expected time to failure is one over the probability of failing on a given flip.

65
00:09:49,000 --> 00:10:01,000
Well, how many failures do we expect in one try? Well, by definition, it's the expectation of getting ahead on the first flip, it's P.

66
00:10:01,000 --> 00:10:16,000
Okay, now if you flip n times, you expect to get n times as many failures as you'd expect in one try. So the expected number of fails in n tries is n times P.

67
00:10:16,000 --> 00:10:31,000
So it's an intuitive argument. In fact, it's the rigorously correct argument. Remember that if we flip n times, we're counting the number of heads in n flips. That's a binomial distribution. We already figured out in a couple of ways that its expectations is nP, but never mind that.

68
00:10:31,000 --> 00:10:44,000
It's just sort of, I think it's intuitively clear that if you expect P heads in one try and you do n tries that are all independent, you're going to expect to get n times P failures. Okay, our heads.

69
00:10:44,000 --> 00:11:03,000
Now, what's the expected number of tries between failures? Well, if you think about that, I've done n tries and I've got nP failures. So if I divide the number of tries by the number of failures, that by definition is the average time between the failures.

70
00:11:03,000 --> 00:11:18,000
So I divide the number of tries by the number of fails, which by definition is the average number of tries between failures and it's equal to n over nP, which is equal to 1 over P.

71
00:11:18,000 --> 00:11:23,000
And that's an argument that I hope you will remember.

