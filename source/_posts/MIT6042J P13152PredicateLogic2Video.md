---
title: MIT6042J P13152PredicateLogic2Video
---

1
00:00:00,000 --> 00:00:12,320
So now we're going to talk about the concepts of validity and satisfiability, which take on

2
00:00:12,320 --> 00:00:16,240
some extra interest in the context of predicate calculus.

3
00:00:16,240 --> 00:00:22,080
So let's remember for propositional validity, if you have a propositional formula with variables

4
00:00:22,079 --> 00:00:29,919
taking the truth values ranging over true and false, then a formula is valid when it's true

5
00:00:29,919 --> 00:00:36,399
for all possible truth values. So here's an example that P implies Q or Q implies P,

6
00:00:36,960 --> 00:00:43,599
and you can check that for the four possible environments of P and Q values, true false values

7
00:00:43,600 --> 00:00:52,320
of P and Q this or will come out to be true. Well, for predicate formulas, there's a bunch of

8
00:00:52,320 --> 00:00:58,240
things that I need to give value to that are more complicated than just truth values. In particular,

9
00:00:58,800 --> 00:01:06,640
I will say that a predicate calculus formula is valid when it's true for all possible domains of

10
00:01:06,640 --> 00:01:12,480
discourse that the variables range over is a technicality that it has to be non-empty, but aside

11
00:01:12,480 --> 00:01:18,400
from that all possible domains. And whenever you have a predicate mentioned in the formula,

12
00:01:20,079 --> 00:01:24,719
in order to know whether the formula is true or not, I need to know what that predicate means.

13
00:01:25,280 --> 00:01:31,200
So a formula is valid if it comes out true no matter what the predicate means. Let's look at a

14
00:01:31,200 --> 00:01:37,760
concrete example to get a grip on this. Here is a valid formula of predicate calculus. It's mentioning

15
00:01:37,760 --> 00:01:47,120
a predicate's P and Q. It's of the form of a proposition because it's saying something about every

16
00:01:47,120 --> 00:01:53,920
possible z in the domain and every possible x in every possible y. The only thing that we need

17
00:01:53,920 --> 00:01:57,840
to know to make sense out of this formula to figure out whether or not it's true is what's the

18
00:01:57,840 --> 00:02:09,520
domain that x, y and z range over and what exactly the P and Q mean. Well, I want to argue informally,

19
00:02:09,520 --> 00:02:14,319
let's just look at what this is saying together. What this is saying is suppose that for everything

20
00:02:14,319 --> 00:02:21,920
in the domain, both P of z and P of Q, in other words, everything in the domain have property P

21
00:02:22,479 --> 00:02:28,560
and property Q. Well, that certainly implies that everything in the domain has property P because

22
00:02:28,560 --> 00:02:34,079
they have both properties and also everything in the domain has property Q because everything has

23
00:02:34,079 --> 00:02:42,399
both properties. So when you say it that way, the sense that this is a fundamental logical fact

24
00:02:42,959 --> 00:02:48,719
that doesn't depend on what P and Q mean or what the domain is, it's just a fact about the

25
00:02:48,719 --> 00:02:54,960
nature of the meaning of the feral universal quantifier and the connectives and and implies.

26
00:02:56,560 --> 00:03:04,079
That's how we figure out that this is valid. Well, let me go one level in more detail to say again

27
00:03:04,079 --> 00:03:13,199
what I just said informally and try to be a little bit more precise and clear about a reason why

28
00:03:13,199 --> 00:03:18,240
this formula is valid. So suppose I wanted to prove that the formula is valid. Well, it's an

29
00:03:18,240 --> 00:03:23,840
implication. So the proof strategy, there it is written again, the proof strategy is I'm going to

30
00:03:23,840 --> 00:03:33,120
assume that the if part, the left hand side of the implies or hypothesis is true. That is that for

31
00:03:33,120 --> 00:03:39,760
every z, P of z holds and Q of z holds. And then I'm going to try to prove based on that that the

32
00:03:39,760 --> 00:03:45,760
consequent holds namely that the right hand side for all xp of x and for all y, Q of y holds.

33
00:03:45,759 --> 00:03:53,519
Okay, how am I going to do that? Well, so here's the formula written just to fit on the line with

34
00:03:53,519 --> 00:04:00,000
the concise mathematical symbols, the upside down v means and and the arrow means implies and we

35
00:04:00,000 --> 00:04:06,319
want to try to prove that this is validity, that this is valid a little bit more carefully.

36
00:04:07,519 --> 00:04:11,599
Well, the strategy as I said is to assume that the left hand side holds. Well, what's the left

37
00:04:11,599 --> 00:04:17,680
hand side say? It says that for every z, Q of z holds and P of z holds. That means that for every

38
00:04:17,680 --> 00:04:25,040
possible environment that assigns a value to z, Q of z and P of z both come out to be true.

39
00:04:26,079 --> 00:04:32,480
Well, suppose that the value that the environment assigns the value c to z where c is some element

40
00:04:32,480 --> 00:04:39,040
to the domain, then what this means is that in that environment Q of z and P of z is true,

41
00:04:39,040 --> 00:04:48,080
which means that Q of z and P of z holds. But Q of z holds, so Q of z certainly holds and P of

42
00:04:48,080 --> 00:04:54,240
z holds, so Q of z certainly holds all by itself. All right, so now we're in an interesting

43
00:04:54,240 --> 00:05:02,320
situation because we just proved that Q of z holds and we know nothing and have assumed nothing

44
00:05:02,320 --> 00:05:07,759
about z except that it's an element to the domain. C could have been any element to the domain

45
00:05:07,759 --> 00:05:14,319
and we've managed to prove the Q of z holds, so it follows that in fact we have really proved

46
00:05:14,319 --> 00:05:20,879
that for every x, Q of x holds. Now, that step of saying I proved it for Q of a given element

47
00:05:21,759 --> 00:05:26,639
without making any assumptions about the given element except that it's in the domain and therefore

48
00:05:26,639 --> 00:05:32,159
I can conclude that it holds for all domain elements, very natural and plausible and understandable

49
00:05:32,560 --> 00:05:38,960
and it's a basic axiom of logic called Ug universal generalization. Come back to it in a minute.

50
00:05:39,520 --> 00:05:44,800
Anyway, I've just proved that for all x, Q of x holds and by a completely symmetric argument

51
00:05:45,520 --> 00:05:53,600
for all yP of y holds and having proved both for all xQ of x and for all yP of y, clearly the

52
00:05:53,600 --> 00:05:59,920
and holds and I've just proved that the right hand side of this implication is true given that

53
00:05:59,920 --> 00:06:06,879
the left hand side is true. Now, having called this proofing validity, let me immediately clarify that

54
00:06:06,879 --> 00:06:12,240
this is not fair to call a proof because the rules of the game are really murky here.

55
00:06:13,040 --> 00:06:18,879
This theorem, you could say that it, oh, you could read it as saying that universal quantification

56
00:06:18,879 --> 00:06:28,160
distributes over and is one of these basic valid formulas that is so fundamental and intelligible

57
00:06:28,240 --> 00:06:34,080
that it's hard to see what more basic things you are allowed to assume when you're proving it.

58
00:06:34,080 --> 00:06:41,120
And this proof really isn't anything more than translating upside down a and the end symbol

59
00:06:41,120 --> 00:06:48,480
into English saying that I'm using ordinary intuitive rules about parole and and using that in the

60
00:06:48,480 --> 00:06:55,040
proof. So this is a good way to think about the formula to get an understanding of it, but it's not

61
00:06:55,120 --> 00:07:01,439
right to say that it's a proof because we haven't been exactly clear about what the proof rules are.

62
00:07:01,439 --> 00:07:07,680
And with this kind of really fundamental valid fact, it becomes a quite technical problem to decide

63
00:07:07,680 --> 00:07:13,040
what a proof is going to be, what's fair to assume and what's fair not to assume. It would actually

64
00:07:13,040 --> 00:07:19,360
be perfectly plausible to take this as an axiom and then prove other things as a consequence of it.

65
00:07:20,319 --> 00:07:27,280
Anyway, going on, let's look at this just for cultural reasons we're never going to actually

66
00:07:27,280 --> 00:07:32,319
ask you to do anything with it, but the universal generalization rule UG is would be stated this way

67
00:07:32,319 --> 00:07:41,360
as a deduction rule in logic. The stuff over the bar means if you've proved this, then you can conclude

68
00:07:41,360 --> 00:07:46,400
that you've proved the stuff below the bar. So what this is saying is if you've proved P of C,

69
00:07:46,560 --> 00:07:53,759
P of C for a constant C, then you can prove that you can deduce that for every X, P of X holds.

70
00:07:55,120 --> 00:08:01,599
And this is providing that C does not occur in any other part of the predicate P except

71
00:08:02,399 --> 00:08:09,759
that where you're talking explicitly about it. It's hard to be more precise about that for now,

72
00:08:09,759 --> 00:08:14,719
and don't worry about it. But the idea is you're not supposed to assume anything about C other than

73
00:08:14,720 --> 00:08:23,120
it's in the domain and that it has property P, and you can then conclude that everything has property

74
00:08:23,120 --> 00:08:33,200
P. So let's look at a similar example where it is possible to prove something, namely I can prove

75
00:08:33,200 --> 00:08:39,440
that something's not valid. So here's a similar looking formula. This one says that for every Z,

76
00:08:40,240 --> 00:08:48,240
if P of Z holds or Q of Z holds, then for every X, P of X holds or for every Y, Q of Y holds.

77
00:08:49,200 --> 00:08:53,840
And this one we're going to show is not valid. Let's think about it for a minute. What it's saying is

78
00:08:55,200 --> 00:09:02,240
if everything has either property P or property Q, that implies that everything has property P

79
00:09:02,240 --> 00:09:07,040
or everything has property Q. Well, when you say it that way, it's clearly not the case. But

80
00:09:07,039 --> 00:09:13,759
let's go one level more precise and lay that out. What I'm going to do is convince you that it's

81
00:09:13,759 --> 00:09:21,679
not valid by giving you a counter model where I make, I choose an interpretation, I choose a domain

82
00:09:21,679 --> 00:09:29,279
of discourse and predicates that Q and that P and Q are going to mean over that domain and

83
00:09:29,279 --> 00:09:33,839
that make the left hand side of this implication true. And then I'm going to show you that the

84
00:09:33,840 --> 00:09:39,759
right hand side is not true. And that means that in that domain, with those interpretations of P and

85
00:09:39,759 --> 00:09:47,440
Q, this implication fails, so it's not valid. So I need to make the left hand side true and the

86
00:09:47,440 --> 00:09:52,560
right hand side false. Well, I'm going to choose the domain of discourse to be the simplest one

87
00:09:52,560 --> 00:09:57,920
that will make this false. Namely, let's let it, the domain of discourse just be the numbers one and two.

88
00:09:58,079 --> 00:10:08,000
And let Q of Z be the predicate that says Z is one. And P of Z be the predicate that says Z is two.

89
00:10:10,240 --> 00:10:20,399
Well, is the left hand side true? Yeah, because the only things there are in the domain are one and two.

90
00:10:20,720 --> 00:10:28,399
And so clearly everything in the domain is either one or two. So the antecedent is true. On the

91
00:10:28,399 --> 00:10:35,360
other hand, is everything in the domain, does it satisfy P, is everything in the domain equal to two?

92
00:10:35,360 --> 00:10:42,799
No, one's not equal to two. What about is everything in the domain equal to one? Is it true that for

93
00:10:42,799 --> 00:10:51,120
all YQ of Y holds, no, two is in the domain and it's not equal to one. And so we have found exactly what

94
00:10:51,120 --> 00:10:58,000
we want that a counter model, which makes the left hand side of the implies true and the right hand side

95
00:10:58,000 --> 00:11:05,839
of the implies false. Let me close with just one more example of a valid formula that we can talk

96
00:11:05,840 --> 00:11:12,879
through. This is the version of De Morgan's law that works for quantifiers. Remember, De Morgan's law

97
00:11:12,879 --> 00:11:22,160
was the thing that said that the negation of P or Q was the same as not P and not Q. And remembering

98
00:11:22,160 --> 00:11:30,160
that the connection between universal quantification and and existential quantification and or it turns out

99
00:11:30,159 --> 00:11:37,039
that by the same kind of reasoning, De Morgan's law comes out this way. It says that if it's not true

100
00:11:37,839 --> 00:11:45,360
that everything has property P, that's possible if and only if there's something that doesn't have

101
00:11:45,360 --> 00:11:51,439
property P. And so that's what De Morgan's law is. It's another thing you could take as an axiom

102
00:11:51,439 --> 00:11:56,399
or you could try one of these hand waving proofs about. But I think I've said enough to give you

103
00:11:56,399 --> 00:12:07,759
that example of another interesting valid formula and we'll stop with that.

