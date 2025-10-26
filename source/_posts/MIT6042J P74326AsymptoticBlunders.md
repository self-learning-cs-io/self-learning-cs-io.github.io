---
title: MIT6042J P74326AsymptoticBlunders
---

1
00:00:00,000 --> 00:00:11,000
Let's take a quick look at some blunders that people regularly make in dealing with asymptotic notation, in particular with big O notation, which tends to confuse people.

2
00:00:11,000 --> 00:00:29,000
So the most important thing to remember is that this notation, something equals O of something else, one over X equals O of one, say, is actually to be understood as just a not such attractive notation.

3
00:00:29,000 --> 00:00:42,000
This leading notation for a binary relation between two functions. This is supposed to be a function there, and this is saying that there's a relation between the growth rates of these two functions.

4
00:00:42,000 --> 00:00:51,000
O of F is not quantity, and you mustn't treat it as such. So for example, and the equality, of course, is not an equality.

5
00:00:51,000 --> 00:01:09,000
Once upon a time, we tried to get the equality replaced by an epsilon, which makes much better sense. That is a membership symbol, but there was a sense that this notation was so deeply embedded in the mathematical culture, multiple mathematical communities that there was no way we were going to change it.

6
00:01:09,000 --> 00:01:23,000
In particular, a confusion where you think that that equality sign means some kind of inequality is to write instead of F equals O of G, well, if F equals O of G by symmetry, O of G or to equal F, don't write that.

7
00:01:23,000 --> 00:01:37,000
The reason is that it's a recipe for confusion. Because look at this. I know that X is O of X trivially, which would suggest that O of X is equal to X if you believe in symmetry and you think of O of X as being quantity.

8
00:01:37,000 --> 00:01:56,000
Well, remember though, the 2X is also equal to O of X by definition of all. So what we wind up with is combining 2X equals O of X with O of X equals X as I get 2X is equal to this thing is equal to X. I conclude the 2X is equal to X, which is absurd. So that's nonsense.

9
00:01:56,000 --> 00:02:09,000
It's the kind of trouble that you can get into if you start thinking of this equality as meaning equality between 2 quantities as opposed to just being a part of the name of a relation.

10
00:02:09,000 --> 00:02:23,000
Another mistake that people make is less serious, but it's sloppy is to think that a big O corresponds to a lower bound. So that people will say things like F is at least O of N squared.

11
00:02:23,000 --> 00:02:37,000
Well, again, at least O of N squared is starting to treat O of N squared like a quantity. You could say that F is equal to O of N squared, but that means that N squared is an upper bound on F to within a constant factor after a certain point.

12
00:02:37,000 --> 00:02:58,000
If you want to say intuitively that N squared is a lower bound on F, then what you have to do is say that N squared is O of F. And that is a proper use of O of F of getting a lower bound on a function by saying that the lower bound is O of the function.

13
00:02:58,000 --> 00:03:15,000
Another example of the kind of nonsense that you say this is a stretch, but let's look at it as a reminder of things not to do. I'm going to prove to you that the sum from I equals 1 to N of I, that is that 1 plus 2 plus 3 up to N is O of N.

14
00:03:15,000 --> 00:03:29,000
Now, of course, it's not. We know that the sum of the first N integers is N times N plus 1 over 2, which is O of N squared, theta of N squared actually. So I'm going to prove something false. Watch carefully how I do it. Here's the false proof.

15
00:03:30,000 --> 00:03:47,000
Let's first of all notice that any constant is O of 1. So 0 is O of 1. 1 is O of 1. 2 is O of 1. And so any constant is any constant function is O of the constant function. 1. OK, that's true.

16
00:03:47,000 --> 00:03:58,000
So that means that each I in this sum I is a number. So that means it's, you know, it might be 1, it might be 2, it might be 3, it might be 50, whatever it is, it's O of 1.

17
00:03:58,000 --> 00:04:15,000
And that means that I could think of this sum from I equals 1 to N is O of 1 plus O of 1 plus O of 1. And that's of course N times O of 1, which is O of N. Now there's all kinds of weird arithmetic rules and things being used here. None of which are justified.

18
00:04:15,000 --> 00:04:31,000
But you, it's just a heads up. You do see stuff like this from inexperienced students. And I hope that you won't fall into this kind of a sloppy trap. O of something is not a quantity. It's part of the name of a relation.

