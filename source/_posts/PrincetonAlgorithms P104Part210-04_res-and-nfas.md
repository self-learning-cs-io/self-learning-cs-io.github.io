---
title: PrincetonAlgorithms P104Part210 04_res And Nfas
---

1
00:00:00,000 --> 00:00:09,000
Before we can get to the algorithm, we have to consider another abstract concept, the NFA.

2
00:00:09,000 --> 00:00:13,000
We'll take a look at the NFAs now.

3
00:00:13,000 --> 00:00:20,000
First of all, there's a duality, well-known duality between regular expressions in DFA.

4
00:00:20,000 --> 00:00:24,000
DFA is a discrete finite automaton.

5
00:00:24,000 --> 00:00:29,000
That's an abstract machine from theoretical computer science.

6
00:00:29,000 --> 00:00:36,000
Which is a very simple idea, it's a state machine for recognizing whether a given string is in a given set.

7
00:00:36,000 --> 00:00:42,000
And if you're not familiar with those, they're very easy to understand and we'll look at some examples.

8
00:00:42,000 --> 00:00:50,000
In a little summary from basic theoretical computer science, there's a very important theorem called cleanys theorem

9
00:00:50,000 --> 00:00:55,000
that was developed to actually hear Princeton in the 30s.

10
00:00:55,000 --> 00:01:04,000
And it says that for any discrete finite state automaton, there exists a regular expression that describes the same set of strings.

11
00:01:04,000 --> 00:01:10,000
And equivalently, for any regular expression, there's a DFA that recognizes the same set of strings.

12
00:01:10,000 --> 00:01:13,000
And this is just an example.

13
00:01:13,000 --> 00:01:17,000
And if you have seen this sort of thing, it'll be familiar.

14
00:01:17,000 --> 00:01:22,000
And if you have it, you will understand better as we get into it.

15
00:01:22,000 --> 00:01:27,000
So a discrete finite state machine is a machine that has states that are labeled.

16
00:01:27,000 --> 00:01:32,000
And it has transitions from state to state that are labeled with characters.

17
00:01:32,000 --> 00:01:39,000
And the way that it works is if it's in a state and it reads again, for every state, it's well defined.

18
00:01:39,000 --> 00:01:44,000
If the next character is zero or one, there's another state to go to.

19
00:01:44,000 --> 00:01:50,000
So for example, at state zero, if you see a zero, you stay in state zero, if you see a one, you go to state one.

20
00:01:50,000 --> 00:01:53,000
In state one, if you see a zero, you stay in state one.

21
00:01:53,000 --> 00:01:56,000
If you see a one, you go to state two and so forth.

22
00:01:56,000 --> 00:02:01,000
So at every state, read a character and go to the well defined next state.

23
00:02:01,000 --> 00:02:06,000
That's a discrete, a deterministic finite state automaton.

24
00:02:06,000 --> 00:02:09,000
And so that's the machine.

25
00:02:09,000 --> 00:02:14,000
You start it up on a string and it reads all the characters in the string.

26
00:02:14,000 --> 00:02:28,000
And then if it ends up in a state that's so-called terminal state, and started on the start state, terminal state is just indicated by this exit error on this example.

27
00:02:28,000 --> 00:02:33,000
It ends up in the right state. You say that it recognizes the set of string.

28
00:02:33,000 --> 00:02:38,000
And so that's a way to determine if a given string is in a specified set.

29
00:02:38,000 --> 00:02:41,000
The machine specifies the set.

30
00:02:41,000 --> 00:02:48,000
In an RE, we specify the set by writing characters and stars and meta characters and parentheses.

31
00:02:48,000 --> 00:02:55,000
And this regular expression recognizes the same set of strings.

32
00:02:55,000 --> 00:02:59,000
Describes the same set of strings that's recognized by this DFA.

33
00:02:59,000 --> 00:03:05,000
I'm cleaning this theorem show that it's always possible to construct such a machine.

34
00:03:05,000 --> 00:03:13,000
So that gives a basic plan for developing a pattern matching implementation.

35
00:03:13,000 --> 00:03:24,000
And this is developed by Ken Thompson that Bell Labs, one of the developers of UNIX, and this facility was an important part of early UNIX.

36
00:03:24,000 --> 00:03:30,000
Developed this idea based on the well known theorem from theoretical computer science.

37
00:03:30,000 --> 00:03:40,000
It's let's try to build a machine the same way as we did for Knuthmores Pratt, where we have no backup in the text input string.

38
00:03:40,000 --> 00:03:48,000
So we just got a finite state machine, but Knuthmores Pratt, we built a machine for recognizing the one string.

39
00:03:48,000 --> 00:03:53,000
How about building one for multiple strings? And that would give us a linear time guarantee.

40
00:03:54,000 --> 00:03:59,000
So the underlying extraction is a deterministic FSA or DFA.

41
00:03:59,000 --> 00:04:11,000
And the basic plan is to just go ahead and take your pattern that describes a set of strings and use that to build a DFA.

42
00:04:11,000 --> 00:04:17,000
And then simulate the DFA with the text as input, same way we did for Knuthmores Pratt.

43
00:04:17,000 --> 00:04:21,000
And if it accepts, we say we have a match, if it rejects, we don't have a match.

44
00:04:22,000 --> 00:04:39,000
This is a fine plan, but it's got a flaw. The bad news is that the plan is infeasible because the number of states in the DFA might be exponential in the length of the R-R.

45
00:04:40,000 --> 00:04:52,000
So it's got too many states, the proof of cleanies theorem, the standard proof of cleanies theorem, involves exponential number of states.

46
00:04:52,000 --> 00:04:57,000
And it's not that difficult to prove if you're interested, be sure to look it up.

47
00:04:57,000 --> 00:05:04,000
But for practical standpoint, too many states can't use that as the basis for our algorithm.

48
00:05:05,000 --> 00:05:09,000
But there's an easy revision. And again, this gets back.

49
00:05:09,000 --> 00:05:16,000
It'll give us a quadratic time guarantee in real life, it's usually linear.

50
00:05:16,000 --> 00:05:25,000
And all we do is change the abstraction to use a non-deterministic finite state machine and an NFA rather than a DFA.

51
00:05:26,000 --> 00:05:43,000
So in the same basic plan, we're going to build an NFA. It's a different kind of machine, but actually it's also the case that, for any regular expression, we can build an NFA.

52
00:05:43,000 --> 00:05:51,000
So in vice versa, cleanies theorem can extend to this. And so we're going to simulate the NFA with the text as input.

53
00:05:51,000 --> 00:05:57,000
And so what do we mean by non-deterministic finite state machine? That's where we have to talk about next.

54
00:05:57,000 --> 00:06:03,000
And we'll just do it with this example that we'll use throughout this lecture.

55
00:06:03,000 --> 00:06:09,000
So it's very similar to the DFA that we had before.

56
00:06:09,000 --> 00:06:20,000
Now we're going to put the characters in the states. And actually the kind of NFA that we're going to build, we're going to have one state for every character in the regular expression.

57
00:06:21,000 --> 00:06:27,000
So this is an NFA corresponding to this regular expression.

58
00:06:27,000 --> 00:06:35,000
We always enclose the regular expressions in parentheses just to make everything work.

59
00:06:35,000 --> 00:06:47,000
And then we've got this regular expression here, A star B or A C D, then we're going to show how to build this NFA.

60
00:06:48,000 --> 00:06:52,000
And then I've simulated it to recognize the regular expression.

61
00:06:52,000 --> 00:07:01,000
And how is it different than a DFA? So there's a character in every state. And if the characters it text character, it's the same as before.

62
00:07:01,000 --> 00:07:04,000
We read that text character and move to the next state.

63
00:07:04,000 --> 00:07:12,000
But it's more general kind of machine because states also have what's called epsilon transition.

64
00:07:12,000 --> 00:07:19,000
And with an epsilon transition, the machine is allowed to change the state without scanning any text.

65
00:07:19,000 --> 00:07:26,000
So at the beginning, the machine can go from 0 to 1 to 2 back to 1.

66
00:07:26,000 --> 00:07:33,000
Sorry, 2 to 3 back to 2. Or it could go from 0 to 1 over to 6.

67
00:07:33,000 --> 00:07:39,000
There's lots of places the machine could go without scanning any text character.

68
00:07:39,000 --> 00:07:44,000
But we do have the black match transitions that scan text characters.

69
00:07:44,000 --> 00:07:51,000
And so those are the rules the machine operates by. And the final rule is when does it accept?

70
00:07:51,000 --> 00:08:02,000
When does it decide a string is in the pattern? It accepts if there's any sequence of transitions that scans all the text characters and and in the except case.

71
00:08:02,000 --> 00:08:09,000
It's a way of specifying an infinite set of strings. But it's got this non-determinism.

72
00:08:09,000 --> 00:08:13,000
It's not always determined what the machine will do next.

73
00:08:13,000 --> 00:08:17,000
It's a little bit of a mind blowing concept in theoretical computer science.

74
00:08:17,000 --> 00:08:27,000
But this particular example actually shows how such a concept can be made concrete and actually give us a widely useful algorithm.

75
00:08:27,000 --> 00:08:37,000
One way to think of a non-deterministic machine is a machine that has superpowers and can guess the proper sequence of state transitions to get to the end.

76
00:08:37,000 --> 00:08:50,000
Get to the except state. Another way to think of it is the sequence is if you provide a particular sequence, that's a proof that the machine accepts the text.

77
00:08:50,000 --> 00:08:57,000
And so this is a real machine. We don't have real machines that can guess the right answer.

78
00:08:57,000 --> 00:09:09,000
But it's a completely well specified abstract machine and we can write a program to simulate its operation. And that's what we're going to do.

79
00:09:09,000 --> 00:09:23,000
So let's just make sure that everyone's got the concept down. So say we have the question is for a followed by BD. Is that accepted by this NFA down here?

80
00:09:23,000 --> 00:09:30,000
Any answer is yes because there is a sequence of legal transitions that ends up in state 11.

81
00:09:30,000 --> 00:09:42,000
So in this case we'll take an epsilon transition from 0 to 1 to 2. And then we've got 4A. So we'll chew up 4A's 1.

82
00:09:42,000 --> 00:09:56,000
Sorry, 1. And then go back 2 and then go back 3 and then go back 4. And then we'll be in state 3. And then at that point we'll decide to take this epsilon transition.

83
00:09:56,000 --> 00:10:13,000
Well, assume the machines in this size take this one. Then it recognizes the B and moves to state 5. And then at state 5 it's no place to go but 2 state 8.

84
00:10:13,000 --> 00:10:31,000
And then it takes the epsilon transition to state 9 and recognizes the D and it takes it out to 10 and 11. So there is a sequence of state transitions that get to 11 and recognizes all the characters in the string. So therefore it's matched.

85
00:10:31,000 --> 00:10:46,000
So it's true that there are sequences that the machine might guess and go the wrong state or stall doesn't matter as long as there's some sequence. And we're going to assume that the machine always guesses the right one.

86
00:10:46,000 --> 00:11:04,000
So for example, if the machine just recognized 3A's 1, 2, 3 and then went to state 4 it would get stuck because there's no way for it to get out of state 4 because state 4 is looking for a B and it's sitting on an A and so forth.

87
00:11:04,000 --> 00:11:13,000
So there's definitely things that the machine could do to be wrong but we don't care as long as there's some way for it to get through.

88
00:11:13,000 --> 00:11:33,000
And then what about if it's a string that's not in the language recognized by the state by the machine. Well, so we have to argue about all possible sequences and prove that no sequence of legal transition as transitions ends in state 11.

89
00:11:33,000 --> 00:11:52,000
And that seems to be a fairly complicated sort of argument. So in this case the machine could recognize a bunch of A's and then go to state 4 but again there's no B so there's no way it's going to get out of state 4.

90
00:11:52,000 --> 00:12:03,000
And so you can make a general argument like looking at the machine, any string that it recognizes has to end in D and this one doesn't end in D.

91
00:12:03,000 --> 00:12:19,000
But that's a much more complicated thing than we're talking about is to try to come up with a simple machine that will decide whether or not a string is in the language that it's specified.

92
00:12:19,000 --> 00:12:31,000
So the question, the question that we have is we have this non-deterministic machine how are we going to decide whether a given string is in the language that it recognizes.

93
00:12:31,000 --> 00:12:39,000
So for deterministic machines like we use for Knuth-Morris Pratt it's very easy because that every time there's only one possible transition.

94
00:12:39,000 --> 00:12:49,000
But for non-deterministic if you're in some states there's multiple ways to go and you have to figure out the right transition.

95
00:12:49,000 --> 00:13:02,000
But actually the situation isn't so bad. What we can do is to simulate the NFA is just make sure that we consider all possible transition sequences.

96
00:13:02,000 --> 00:13:09,000
And that's what our algorithm for regular expression pattern matching is going to be based on that's what we'll look at next.

