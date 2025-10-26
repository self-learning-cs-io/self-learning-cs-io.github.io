---
title: MIT6042J P87421ConditionalProbabilityDefinitionsVideo
---

1
00:00:00,000 --> 00:00:05,000
Conditional probability is an absolutely basic idea that we use all the time.

2
00:00:05,000 --> 00:00:11,000
It's the probability that some event occurs given certain information about it.

3
00:00:11,000 --> 00:00:19,000
For example, an insurance company wants to know what's the probability that you'll live for the next 10 years

4
00:00:19,000 --> 00:00:25,000
given your medical history or a typical investor wants to know what's the probability that this stock is going to rise

5
00:00:25,000 --> 00:00:30,000
given its stock price gyrations for the past month.

6
00:00:30,000 --> 00:00:40,000
There are people who actually think you can do that, the charredists, that not knowing anything about the nature of the company or the business that the stock is part of,

7
00:00:40,000 --> 00:00:50,000
that just by watching the price gyration you can make a better guess on what the stock will do tomorrow than you could otherwise.

8
00:00:50,000 --> 00:01:11,000
Another good example is for a system engineer what's the probability that the system is going to overload given the recent history of the rate at which requests have been coming in and finally is a joke that I like to think about is what's the probability that you're a cat owner given that you're sitting in the cat section of the angel memorial veterinary hospital.

9
00:01:11,000 --> 00:01:23,000
Okay, so let's look concretely at a very simple example of conditional probability that's meant to be a lustre of where we look at a die and rolling a fair die.

10
00:01:23,000 --> 00:01:31,000
Now, if I'm thinking about an ordinary fair die, I've got six outcomes that are equally likely, the outcomes are 1, 2, 3, 4, 5, 6.

11
00:01:31,000 --> 00:01:44,000
And if I ask what's the probability that in one role I roll a 1, well, it's going to be the number of outcomes involving my rolling a 1, divided by the total number of outcomes.

12
00:01:44,000 --> 00:01:50,000
It's 1 sixth, the probability of any given face of a six-sided fair die is 1 sixth.

13
00:01:50,000 --> 00:01:53,000
But suppose I give you some additional information.

14
00:01:53,000 --> 00:01:59,000
Knowledge about the role can change the judgment of probabilities.

15
00:01:59,000 --> 00:02:07,000
Suppose that I tell you that I rolled an odd number and now I want to know what's the probability that I rolled a 1.

16
00:02:07,000 --> 00:02:15,000
And the answer will now be that given that it's an odd number, the only possibilities are 1, 3, and 5.

17
00:02:15,000 --> 00:02:19,000
And so the probability has changed to 1, 3rd.

18
00:02:19,000 --> 00:02:23,000
Yeah, that should be a straightforward enough idea.

19
00:02:23,000 --> 00:02:36,000
Let's look at it, though, one way to understand conditional probability is as a kind of an experiment where first you try to roll an odd number and then you decide what final role you're going to make.

20
00:02:36,000 --> 00:02:39,000
Let's look at that tree if we were describing it that way.

21
00:02:39,000 --> 00:02:52,000
So the first branch of the tree that we use to build a probability space is to say, okay, among the six possible outcomes, what are the chances that we rolled an odd number?

22
00:02:52,000 --> 00:02:55,000
Well, it's 50-50 because there were three of each.

23
00:02:55,000 --> 00:03:07,000
So there's a half chance that yes, you rolled an odd number, in which case those are the possible outcomes or a half chance that no, you didn't roll an odd number and the possible outcomes then are 2, 4, and 6.

24
00:03:07,000 --> 00:03:12,000
Now, once you're here with 1, 3, and 5, let's ask whether you're rolled a 1.

25
00:03:12,000 --> 00:03:16,000
The probability that you did roll a 1, we've already agreed, is 1, 3rd.

26
00:03:16,000 --> 00:03:24,000
It's equally likely to be any one of those three outcomes, which means that it's 2, 3rds that you wind up rolling either a 3 or a 5.

27
00:03:24,000 --> 00:03:31,000
And likewise, here, the probability, if you didn't roll an odd number, that is you rolled an even number.

28
00:03:31,000 --> 00:03:40,000
The probability that next you'll roll a 1 is 0, or that you won't roll a 1 is probability 1.

29
00:03:40,000 --> 00:03:48,000
So this is a kind of standard way that we have of trying to build up a set of probabilities for outcomes.

30
00:03:48,000 --> 00:03:58,000
And if we look at this tree, well, first of all, we can use it to assign some probabilities because the probability of your rolling a 1 is 1, 6, as it should be.

31
00:03:58,000 --> 00:04:04,000
It's a half times a 3rd, which is the usual way we would calculate the probability of this outcome.

32
00:04:04,000 --> 00:04:08,000
By the way, we could calculate the probability of the outcome being 3 or 5.

33
00:04:08,000 --> 00:04:11,000
It would be a half times 2, 3rds, or 1, 3rd.

34
00:04:11,000 --> 00:04:20,000
And finally, the probability of rolling an even number would just be a half, a half times 1.

35
00:04:20,000 --> 00:04:22,000
Now, what's going on here?

36
00:04:22,000 --> 00:04:31,000
If you look at this number 1, 3rd, it is what we said was the probability of a 1 given that you rolled an odd number.

37
00:04:31,000 --> 00:04:34,000
So that's where this label came from.

38
00:04:34,000 --> 00:04:41,000
Likewise, this number 2, 3rds is the probability that you didn't roll a 1 given that you rolled an odd number.

39
00:04:41,000 --> 00:04:48,000
And finally, this number is the probability that you didn't roll a 1 given that you rolled an even number.

40
00:04:48,000 --> 00:04:50,000
And it's certain.

41
00:04:50,000 --> 00:04:52,000
All right? Let's do another example to get this idea.

42
00:04:52,000 --> 00:04:55,000
Let's go back to Monty Hall, which we've seen before.

43
00:04:55,000 --> 00:05:01,000
Remember how we have these probability labels on these branches, which we figured out?

44
00:05:01,000 --> 00:05:04,000
So if we look at this number a 3rd, what is it?

45
00:05:04,000 --> 00:05:11,000
Well, this is where the prize is at location 1, and the contestant has picked door 1.

46
00:05:11,000 --> 00:05:16,000
And that 1 3rd, we figured out that once the prize is at door 1, in fact,

47
00:05:16,000 --> 00:05:21,000
whatever the prize is, the probability that the contestant will pick 1 is 1, 3rd.

48
00:05:21,000 --> 00:05:28,000
This number 1, 3rd is the probability that the contestant will pick 1 given that the prize is at door 1.

49
00:05:28,000 --> 00:05:30,000
Yeah? Here's another third.

50
00:05:30,000 --> 00:05:39,000
This is similarly the probability that the contestant will pick door 2 given that the prize is at door 3.

51
00:05:39,000 --> 00:05:41,000
That's symmetric to this one.

52
00:05:41,000 --> 00:05:43,000
But here's something a little bit different. Here's a half.

53
00:05:43,000 --> 00:05:53,000
This is the probability that door 3 will be open by Carol, given that the prize is at 1, that's that branch,

54
00:05:53,000 --> 00:05:56,000
and the contestant picked 1.

55
00:05:56,000 --> 00:06:07,000
And when the prize is at 1 and the contestant picks 1, Carol, we said in our model, is equally likely to open the two possible doors that have codes that she's able to open.

56
00:06:07,000 --> 00:06:11,000
And so that's 1 half is this conditional probability.

57
00:06:11,000 --> 00:06:20,000
The probability that she'll open door 3 given, this, that we're in this location in the tree, given that the prize is at 1 and pick is at 1.

58
00:06:20,000 --> 00:06:24,000
So the point is simply that we were reasoning about conditional probability.

59
00:06:24,000 --> 00:06:31,000
In the very way, we began defining the tree model that we were using to define probability spaces in the first place.

60
00:06:31,000 --> 00:06:39,000
We were implicitly using conditional probabilities to label the probabilities that left each vertex of the tree.

61
00:06:39,000 --> 00:06:58,000
And in fact, formally speaking, what we were using was the product rule, which is that the probability of an a event occurs and a b event occurs is simply the probability that the a event, that's the first branch of the tree, times the probability of b given a.

62
00:06:58,000 --> 00:07:03,000
And that's the fundamental rule of conditional probabilities. That's the product rule.

63
00:07:03,000 --> 00:07:06,000
And it's something to be memorized.

64
00:07:06,000 --> 00:07:14,000
In fact, this product rule is not a carolary. It's really the definition of conditional probability.

65
00:07:14,000 --> 00:07:18,000
And so all of the previous discussion was motivation of the following definition.

66
00:07:18,000 --> 00:07:34,000
If a and b are events in a probability space, the probability of b given a is defined to be the probability that a and b occur, that is a intersection b, relative to the probability of a.

67
00:07:34,000 --> 00:07:37,000
So that's the formal definition.

68
00:07:37,000 --> 00:07:48,000
So this formal definition justifies the product rule by definition because you just multiply both sides by the probability of a and you get probability of a times the probability of b given a is the probability of the intersection.

69
00:07:48,000 --> 00:07:56,000
Notice that implicit in this definition is the probability of a better not b zero. So you can't condition on an event that has zero probability.

70
00:07:56,000 --> 00:08:02,000
Probability of b given a is only defined if probability of a is positive.

71
00:08:03,000 --> 00:08:13,000
If you have a tree that's of depth three, then you need a product rule for three consecutive choices and it generalizes in a straightforward way.

72
00:08:13,000 --> 00:08:28,000
Namely, the probability of a and b and c, the first branch is a and the second branch is b and the third branch is c, is the probability that you do a on the first branch times the probability that you do b on the second branch given that you did a on the first branch.

73
00:08:28,000 --> 00:08:35,000
And times the probability that you do c on the third branch given that you did a on the first and b on the second.

74
00:08:35,000 --> 00:08:49,000
And this product rule for three could in fact be proved simply by substitution using the product rule for two twice and of course it generalizes to any finite number of sets.

75
00:08:49,000 --> 00:09:04,000
It's useful to think another useful way to think about probability that may be more intuitive than the idea of choosing to whether or not to roll odd and then choosing to roll whether or not to roll a one.

76
00:09:04,000 --> 00:09:10,000
Usually what you think of as you roll the dice and then you're giving me some information about what that roll was.

77
00:09:10,000 --> 00:09:22,000
I don't think about the odds of rolling odd or not. I just tell you it's odd and now tell me what is the probability that among those odd outcomes it was one.

78
00:09:22,000 --> 00:09:30,000
So a way to formalize that is you can think of conditioning on an event a as defining a new probability function on the sample space.

79
00:09:30,000 --> 00:09:37,000
Once you're given that a occurred I can now think that all the probabilities of the sample of the outcomes have changed.

80
00:09:37,000 --> 00:09:48,000
So in this I'll define a new probability measure relative to a where all the outcomes that are not in a are going to be assigned probability zero because they can't happen given that a occurred.

81
00:09:48,000 --> 00:10:01,000
And all of the probabilities of outcomes of points in a just they get their probability relative raised in proportion to a because now a is going to be the whole probability space.

82
00:10:01,000 --> 00:10:17,000
Let's be a little bit more formal about that to be precise. We're going to define a new probability function probability sub a on the same sample space where the probability of an outcome is zero if the outcome is not in a and it's it's old probability relative on the same.

83
00:10:17,000 --> 00:10:29,000
Relativized to the probability of a if omega is in a so that's the definition of the probability with respect to a of omega it's a new probability measure on the same sample space.

84
00:10:29,000 --> 00:10:46,000
So to verify that this new thing is a probability space you have to verify that the sum of the outcomes of the outcome probabilities is one and that's a little exercise that I would encourage you to stop now and work out on a piece of paper because it's trivial but it's worth checking that you follow the definitions.

85
00:10:46,000 --> 00:10:51,000
The claim is simply that this new measure probability sub a is a.

86
00:11:16,000 --> 00:11:45,000
Hey will satisfy all of the rules of probability because it is a probability measure so for example I have the difference rule restated for conditional probabilities given that the this that probability sub a is a probability measure it satisfies the difference rule which means when I translated into a conditional probability.

87
00:11:45,000 --> 00:12:14,000
So I get a conditional probability statement I get that the probability of b minus c given a is equal to the probability of b given a minus the probability of b intersection c given a it's exactly the same as the standard difference rule except that I have made everything conditioned on a and so we automatically get all of these rules for conditional probability that we had holding for probability which will be helpful.

88
00:12:14,000 --> 00:12:19,000
So I have to think about proving them again.

