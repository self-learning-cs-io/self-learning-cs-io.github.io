---
title: MIT6042J P90427MontyHallProblemVideo
---

1
00:00:00,000 --> 00:00:09,000
Now conditional probability will let us explain a lot of the confused arguments that people brought up about Monty Hall.

2
00:00:09,000 --> 00:00:17,000
And we'll see that it is a little bit confusing and where there are some correct or sounding arguments that give you the wrong answer.

3
00:00:17,000 --> 00:00:31,000
So let's go back and look at our Monty Hall tree that allowed us to derive the sample space and probability space for the whole process of the price being placed in the contest and picking a door and carol opening a door.

4
00:00:31,000 --> 00:00:38,000
Now this tree was way more complicated than we needed if all we were trying to do was figure out the probability of winning if you switch.

5
00:00:38,000 --> 00:00:47,000
But having the tree will allow us to discuss a whole bunch of other events in their probabilities that will get us a grip on some of the arguments that gave the wrong answer.

6
00:00:47,000 --> 00:00:57,000
So let's look at the event first of all that the goat is at 2. Now this is the branch where the prize is at 2 and so on all the other branches the goat is at 2.

7
00:00:57,000 --> 00:01:09,000
Which means that we have these eight of the 12 outcomes in the event goat is at 2.

8
00:01:09,000 --> 00:01:16,000
Now let's also look at the event that the prize is at 1. That's just this branch of the tree.

9
00:01:17,000 --> 00:01:40,000
So one of the arguments is that when the contestant is at the point where they've seen that the open door and they're trying to decide whether a stick or a switch they know that the goat is at door 2 say without loss of generality that that was the door that they got to look at behind with that carol open.

10
00:01:40,000 --> 00:02:01,000
And so we want to ask the probability given that he picked one. What's the probability that the prize is at 1 given that the goat is at 2. That means that if you're at door 1 then you should stick if that probability is high and otherwise you shouldn't stick.

11
00:02:01,000 --> 00:02:21,000
So we can look at this event the prize at 1 given the goat at 2. And what we can see is that it's taking up exactly half of the outcomes for goat at 2 and the same kind of outcomes red ones and green ones the red ones of the worth 18th and green ones of worth at 9th in probability.

12
00:02:21,000 --> 00:02:45,000
And that implies that the probability that the prizes at 1 given that the goat is at 2 is half it really is. And that's the argument that people were saying they said look when the contestant sees that the goat is at door 2 and they're trying to decide whether the goat the prizes at the door is at door 1 or at the other door and it's equally likely.

13
00:02:45,000 --> 00:03:04,000
And so it doesn't matter whether they stick or switch. That's a correct argument but it's not calculating the probability of the stick strategy winning. Why? Well, because there's more information that's available than goat is at 2.

14
00:03:04,000 --> 00:03:25,000
The contestant not only knows that the goat is at 2 and trying to figure out the probability that the prize is at 1 but the contestant knows what door he picked. So let's suppose that the contestant did pick door 1 and learned that the goat was at door 2. That's a different event. If the blue one is marked off at other places where the contestant picks 1.

15
00:03:25,000 --> 00:03:50,000
This is where the door is picked is 1 and here's 1 and here's 1. This one splits into one event. This one splits into one event but this choice of one splits into two outcomes. And so when we look at the event that both the goat is at 2 and the contestant picked 1 which is what the contestant really knows when they get to see that there's a goat at door 2.

16
00:03:50,000 --> 00:04:04,000
We wind up with the overlap of just three outcomes, two outcomes that have probability 1-8 and one outcome that has probability 9th.

17
00:04:04,000 --> 00:04:21,000
The result is that the probability that the prize is at 1 given that you picked 1 and the goat is at 2. So this is the event goat at 2 and picked 1. These three outcomes.

18
00:04:21,000 --> 00:04:38,000
The prize is at 1 is these two outcomes which are each worth an 18th and this is an outcome that's worth a 9th. So the prize at 1 outcomes amount to half of the total probability of this event goat at 2 picked at 1.

19
00:04:38,000 --> 00:04:49,000
So again the probability that the prize is at 1 given that the contestant picked 1 and saw the goat at 2 is a half also. That's confusing.

20
00:04:49,000 --> 00:05:00,000
So it seems as though the contestant may as well stick because at the point that he has to decide whether to stick or switch and he sees where the goat is and he knows what door he's picked.

21
00:05:00,000 --> 00:05:14,000
It's 50-50 whether he should stick or switch. The probability that the prize is at door 1 that he picked is a half. So it really doesn't matter if he stays there if he decides to switch to the unopened door.

22
00:05:15,000 --> 00:05:32,000
But wait a minute. It's not right because the contestant not only knows what door he picked not only knows that there's a goat behind a given door that Carol has opened but he knows that Carol has opened that door.

23
00:05:32,000 --> 00:05:37,000
That's how he got to know that the goat was there. So let's go back and look at the tree.

24
00:05:37,000 --> 00:05:45,000
What basically the previous two arguments are conditioning on the wrong events. It's a typical mistake and one that you really have to watch out for.

25
00:05:45,000 --> 00:05:56,000
So if you use the correct event what we're looking at is the contestant knows that they've picked door 1. That's the outcomes of picked door 1 or marked here.

26
00:05:56,000 --> 00:06:09,000
In addition the contestant will get to know for example in a play of the game that Carol has opened door 2. Carol opening door 2 is quite a different event from the goat being a 2.

27
00:06:09,000 --> 00:06:22,000
This is a picture of the outcomes in Carol opening door 2 and we're interested in the intersection of them. That is just this guy that's in both and this guy that's in both. There they are.

28
00:06:22,000 --> 00:06:36,000
So what we can do is identify that the event that you picked one and that Carol opened door 2 consists simply of two outcomes, one worth and 18th and one worth a 9th.

29
00:06:36,000 --> 00:06:43,000
Now of these two outcomes which one has the prize at one? Well only that one. Remember the first component here is where the prize is.

30
00:06:43,000 --> 00:07:02,000
And so the prize at one event among the given picked one and open to is just this red outcome. Now the red outcome has probably one 18th and the green outcome has probability that's twice as much.

31
00:07:02,000 --> 00:07:18,000
So that means that relative to this event the probability that the prize is at one given that you picked one and open to is actually one 18th over one 18th plus one 9th or one 3rd.

32
00:07:18,000 --> 00:07:34,000
So given that you picked one and you get to see what Carol did the probability that the prize is at the door you picked is only one third which means that if you stick you only have a one third chance of winning you should switch.

33
00:07:34,000 --> 00:07:55,000
And if you do you'll have a two third probability of winning. So when we finally condition on everything that we know which is the contestant knows what door he picked and what door Carol opened then we discover that correctly as we deduced previously that the probability of switching wins is two thirds.

34
00:07:55,000 --> 00:08:16,000
So we're not trying to read the right of the fact that the probability of switching wins is two thirds we're trying to illustrate a very basic blunder that you have to watch out for which is when you're trying to reason about some situation and you condition on some event that you think summarizes what's going on if you don't get the conditioning event right you're going to get the wrong answer.

35
00:08:16,000 --> 00:08:39,000
So it's easy to see how many people got confused and in fact finding the right event can be tricky. When in doubt the four step method with constructing the tree where you're not even thinking about conditional probabilities but you're just examining the individual outcomes is a good fallback to avoid these kinds of confusing situations.

