---
title: CS143 P37Week407 02 First Sets
---

1
00:00:00,000 --> 00:00:08,000
In the next few videos, we're going to talk about how to construct LL1 parsing tables.

2
00:00:08,000 --> 00:00:15,000
And in this particular video, we're going to begin by looking at how we build something called first sets.

3
00:00:15,000 --> 00:00:20,000
Before we get into the main topic of this video, which is something called first sets,

4
00:00:20,000 --> 00:00:28,000
we need to say a little bit about how we're going to construct parsing tables or what the conditions are for constructing LL1 parsing tables.

5
00:00:28,000 --> 00:00:31,000
And so we're interested in knowing we're building a parsing table.

6
00:00:31,000 --> 00:00:41,000
And we want to know for a given non-terminal A, this is the leftmost non-terminal, and a given input symbol, the next input symbol T,

7
00:00:41,000 --> 00:00:50,000
we want to know under what conditions we will make them move A goes to alpha, will replace A, the non-terminal by the right-hand side alpha.

8
00:00:50,000 --> 00:00:55,000
And that means that the entry and the A, T entry and the table would be alpha.

9
00:00:55,000 --> 00:00:59,000
And there are two situations in which we would like to do this.

10
00:00:59,000 --> 00:01:05,000
So the first one is if alpha can derive T in the first position.

11
00:01:05,000 --> 00:01:09,000
That means at beginning with alpha, there is some derivation.

12
00:01:09,000 --> 00:01:18,000
Some sequence of moves could be zero or more moves that will result in a T appearing in the first position of the string that's derived.

13
00:01:18,000 --> 00:01:27,000
And if there is such a derivation, then using the move A goes to alpha at this point when T is the next input symbol would be a good idea.

14
00:01:27,000 --> 00:01:36,000
Because then we would be able to match the T. Eventually alpha could generate the T, and then we'd be able to match the T and then continue with our parsing of the rest of the input.

15
00:01:36,000 --> 00:01:44,000
So in this situation, when alpha can generate a T in the first position, we say that T is an element of the first of alpha.

16
00:01:44,000 --> 00:01:57,000
T is one of the things, there may be more things, but T is at least one of the things that alpha can produce in the very first position, one of the terminals, I should say, that alpha can produce in the very first position.

17
00:01:57,000 --> 00:02:14,000
Now there's another situation, slightly more complicated situation, in which we might want to make the move, or we would want to make the move, that if we see A is the left most non-terminal, and T is the next input that we'd like to replace A by A goes to alpha.

18
00:02:14,000 --> 00:02:33,000
And the situation here that we're going to consider is what if alpha cannot derive T. So alpha cannot in any sequence of moves derive T. So in fact, what does that mean? That means T is not going to be in the first of alpha.

19
00:02:34,000 --> 00:02:42,000
And our next input symbol is T, we're still looking at the situation where we have A is the left most non-terminal, and T is the next input symbol.

20
00:02:42,000 --> 00:02:55,000
Now this doesn't sound very promising, because we have an input symbol T that we want to match, and the left most non-terminal that we've got up next, that we have to do a derivation for, can't generate the T.

21
00:02:55,000 --> 00:03:08,000
But it turns out that it's not hopeless, that we actually may still be able to parse the string, even in that situation, provided that alpha can go to epsilon.

22
00:03:08,000 --> 00:03:20,000
So if alpha can derive epsilon, if alpha can go away completely, and we can basically erase the alpha, then it could be that some other part of the grammar can come in and match the T.

23
00:03:20,000 --> 00:03:32,000
So in what situation would that be? We'll hear the conditions. So if A goes to alpha as a production, and alpha can go to epsilon via zero or more moves, so alpha can eventually be completely wiped out.

24
00:03:32,000 --> 00:03:45,000
And if T can come immediately after A in the grammar, so there has to be a derivation for this to make sense. There should be a derivation where we are using the A.

25
00:03:45,000 --> 00:03:53,000
Okay, where the A is an important piece of the derivation, you know, from the start symbol. And what comes immediately after the A is the next input symbol that we're expecting.

26
00:03:53,000 --> 00:04:06,000
So in this situation, if we could get rid of the A, then by having a go to epsilon, then we would still be on track, because potentially some other piece of the grammar could come in and match the T.

27
00:04:06,000 --> 00:04:21,000
Alright, so in that case, we would say what do we have to test for, under what conditions can we do it? Well, we want to be able to do this if T can come after A in the grammar, and we say that T is in the follow of A.

28
00:04:21,000 --> 00:04:30,000
T is one of the things that can come after A in the grammar. Now this is an important point in a place where people sometimes get confused.

29
00:04:30,000 --> 00:04:41,000
And so I want to emphasize this. Notice that we're not talking about A deriving T. A does not produce T. T appears in a derivation after A.

30
00:04:41,000 --> 00:04:49,000
Okay, so the A and the T here doesn't have anything to do with what A produces. This has to do with where A can appear in derivations.

31
00:04:49,000 --> 00:04:55,000
Alright, so if the T can come after the A in a derivation, then we say the T is in the follow of A.

32
00:04:55,000 --> 00:05:04,000
Alright, so in this video, we're going to focus on only this first part, the first sets. In the next video, we'll look at the follow sets.

33
00:05:04,000 --> 00:05:13,000
And then in the video after that, we'll talk about how to put it all together to build this parsing table.

34
00:05:13,000 --> 00:05:19,000
Alright, let's focus now on our main topic for this video, the computation of first sets.

35
00:05:19,000 --> 00:05:34,000
So here's first of all, we have to have a definition of what a first set is. And so we're going to say for an arbitrary string, this is actually X here as a string, could be a single terminal, it could be a single non-terminal, or it could be a string of grammar symbols.

36
00:05:34,000 --> 00:05:44,000
Alright, and if that X can derive T in the first position through some sequence of moves, then we say that T, T as a terminal here, is in the first of X.

37
00:05:44,000 --> 00:05:50,000
Okay, so all the possible terminals that can be derived in the first position, it will be in the first of X.

38
00:05:50,000 --> 00:06:00,000
Now, for technical reasons that will become clear in a minute, we also need to keep track of whether X can produce Epsilon.

39
00:06:00,000 --> 00:06:11,000
Alright, so even though Epsilon is not a terminal symbol, if X can go to Epsilon via zero or more steps, then we'll say that Epsilon is in the first of X.

40
00:06:11,000 --> 00:06:25,000
Now this turns out to be needed, we need to keep track of whether X, whether things can produce Epsilon in order to compute all the terminals that are in the first set of a giving grammar symbol.

41
00:06:25,000 --> 00:06:33,000
Alright, so now here's a sketch of the algorithm. So first of all, for any terminal symbol, well the only thing the terminals can produce are themselves.

42
00:06:33,000 --> 00:06:39,000
So every terminal symbol, and here I should just say T as a terminal.

43
00:06:39,000 --> 00:06:48,000
So for every terminal symbol, it is in its first set just consists of the, the site containing only that terminal.

44
00:06:48,000 --> 00:06:53,000
Alright, so now let's consider a non-terminal X. Okay, so here X is a non-terminal.

45
00:06:53,000 --> 00:07:02,000
And what it can be, the conditions when Epsilon is in the first of X. Well, if there's a Epsilon production, if X goes immediately to Epsilon,

46
00:07:02,000 --> 00:07:09,000
then obviously X can produce Epsilon, Epsilon should be in the first of X. But also if X can produce any other right hand side.

47
00:07:09,000 --> 00:07:17,000
Alright, where everything on the right hand side can go to Epsilon. Well, then the whole right hand side can go to Epsilon.

48
00:07:17,000 --> 00:07:30,000
So in that case, also Epsilon is in the first of X. And notice that this will only happen if these, it can only potentially happen if all of the AIs here are non-terminal symbols themselves.

49
00:07:30,000 --> 00:07:37,000
Obviously, if there's any terminal symbol on the right hand side, then that production can never go completely to the empty string.

50
00:07:37,000 --> 00:07:46,000
Okay, we'll always produce at least that, that terminal. But if every non-terminal on the right hand side can produce Epsilon, meaning Epsilon is in the first of all those non-terminal,

51
00:07:46,000 --> 00:07:55,000
and there are no terminals on the right hand side, then Epsilon will be in the first of X.

52
00:07:56,000 --> 00:08:04,000
Alright, and there's one other situation, and here's where we make use of the fact that we're keeping track of where Epsilon can be produced.

53
00:08:04,000 --> 00:08:14,000
Alright, so let's say that we have a production like this, okay, and let's say the first N symbols, A1 through A and here, can all go to Epsilon.

54
00:08:14,000 --> 00:08:30,000
So this can all disappear, okay, and be replaced by the empty string. Well, what does that mean? So if we have a derivation like this, okay, where, and then through some number of moves, it goes to alpha.

55
00:08:30,000 --> 00:08:37,000
Well, that means that X can, through a bunch of moves here, derive alpha itself, okay.

56
00:08:37,000 --> 00:08:46,000
So X can go to alpha by wiping out all of the AIs, and I forgot to put the alpha here on the end. There should be an alpha after A's event there.

57
00:08:46,000 --> 00:08:53,000
Okay, and what does this mean? Well, this means that anything that is in the first of alpha is going to also be in the first of X.

58
00:08:53,000 --> 00:09:06,000
Alright, so if any prefix of the right hand side can disappear, then the remaining suffix, the alpha, it doesn't matter what the alpha is, is left, then the first of alpha will be a subset of the non-terminal.

59
00:09:06,000 --> 00:09:13,000
So that is the definition of the non-terminal on the left hand side X in this case. Alright, okay.

60
00:09:13,000 --> 00:09:23,000
Alright, so that is a definition of first sets and how you compute them, okay, and we have to compute them for the terminals and for the non-terminals.

61
00:09:23,000 --> 00:09:35,000
Alright, that's what these second two rules here cover the non-terminals. And just notice, as I mentioned here at the beginning, that this is well defined for any other grammar sequences.

62
00:09:35,000 --> 00:09:47,000
So if any other string in the grammar as well, if I know how to compute it for terminals, I know how to compute it for non-terminals, then I can compute it for arbitrary strings in the grammar as well.

63
00:09:47,000 --> 00:09:55,000
Alright, so now let's do an example. Let's take a look at this grammar and let's see if we can compute the first set.

64
00:09:55,000 --> 00:10:05,000
So let's start with the easy stuff. Let's do the terminal symbols. Alright, so for the terminals, it's really, you know, extremely straightforward.

65
00:10:05,000 --> 00:10:18,000
The first of plus is plus. The first of times is just times every terminal is in a, as it's first set, the first set of every terminal is just the second-taining that terminal.

66
00:10:18,000 --> 00:10:31,000
And so on for the others. And this is not worth writing out. So it'll be the first of open-paren will be just open-paren, the first of closed-paren will be just closed-paren.

67
00:10:31,000 --> 00:10:41,000
And I think that is all, no way, you have to do int as well. Okay. Alright, so these are the first sets for the terminal symbols.

68
00:10:41,000 --> 00:10:53,000
And now let's look at something more interesting. Let's talk about the first of the non-terminal symbols. So what about the first of e?

69
00:10:53,000 --> 00:11:04,000
Well, if we look at the production for e, let's remember our rules. So we know that anything that's in the first of t will also be in the first of e.

70
00:11:04,000 --> 00:11:14,000
So the first of t is a subset of the first of e. Okay. So in order to know what the first of e is, we have to know what the first of t is.

71
00:11:14,000 --> 00:11:25,000
At least to know part of the first of e, we have to know the first of t. So let's move on then to first computing the first of t. Let's try to get that set.

72
00:11:25,000 --> 00:11:34,000
Now, the first of t is actually pretty easy because if we look at the production for t, we can see that they produce terminals in the first position.

73
00:11:34,000 --> 00:11:42,000
Alright, so the only possibility in the only possibilities in the first of t are open-paren and int.

74
00:11:42,000 --> 00:11:51,000
And since there are only two productions for t and both of them have a terminal in the very first position, there's no other terminal symbols that could be produced in the first position by t.

75
00:11:51,000 --> 00:12:00,000
So we can just read off the first of t directly from the grammar and see open-paren and int.

76
00:12:00,000 --> 00:12:10,000
Okay. Now, let's return to thinking about the first of e. So remember there was another case that we have to keep track of or we have, sorry, that we have to consider.

77
00:12:10,000 --> 00:12:17,000
So it could be, so I could clearly everything in the first of t is in the first of e. Alright. And we've already noted that down.

78
00:12:18,000 --> 00:12:24,000
But if t can go to epsilon, then things that are in the first of x could also be in the first of e.

79
00:12:24,000 --> 00:12:32,000
But now we've computed the first of t and we see that epsilon is not in there. The first of t always generates at least one terminal symbol.

80
00:12:32,000 --> 00:12:40,000
And so there will never be a situation in which x can contribute to the first of e because t is always guaranteed to generate at least one terminal.

81
00:12:40,000 --> 00:12:47,000
So in fact this subset that we wrote up here is not a subset at all, it's an equality. The first of t and the first of e are equal.

82
00:12:47,000 --> 00:12:55,000
So the first of e is also open-paren and int. Alright. So now let's take a look at the first of x.

83
00:12:58,000 --> 00:13:05,000
Okay. So the first of x, well, clearly pluses in the first of x because one production for x produces a plus immediately in the first position.

84
00:13:05,000 --> 00:13:12,000
So we can just add plus to the first of x. And then x has an epsilon production. So it can also go to epsilon.

85
00:13:12,000 --> 00:13:24,000
So that means that epsilon is also in the first of x. And what about the first of y? Well, the first of y, it's a similar structure to the production of the first of y.

86
00:13:24,000 --> 00:13:29,000
We see we have one production here in the previous terminal in the first position and that's times.

87
00:13:29,000 --> 00:13:35,000
So the first of y has times in it. And then y also has an epsilon production. Why can go directly to epsilon?

88
00:13:35,000 --> 00:13:45,000
So epsilon is also in the first of y. Alright. And that's actually it for this grammar. These are the complete first sets for all the symbols of the grammar.

89
00:13:45,000 --> 00:13:52,000
The terminals just have for themselves in their first sets and then the non-terminals we computed have these sets.

90
00:13:52,000 --> 00:14:00,000
So that concludes our discussion of first sets. And in the next video, we're going to take a look at computing follow sets.

