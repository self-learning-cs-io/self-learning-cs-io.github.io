---
title: MIT6042J P44241RSAPublicKeyEncryptionVideo
---

1
00:00:00,000 --> 00:00:05,879
The RSA crypto system is one of the lovely and really important applications of

2
00:00:05,879 --> 00:00:12,759
number theory in computer science. So let's start talking about it. The RSA

3
00:00:12,759 --> 00:00:17,100
crypto system is what is known as a public key crypto system which has the

4
00:00:17,100 --> 00:00:24,580
following really amazing properties. Namely, anyone can send a secret

5
00:00:24,579 --> 00:00:30,739
encrypted message to a designated receiver. This is without there being any

6
00:00:30,739 --> 00:00:37,299
prior contact using only publicly available information. Now if you think about

7
00:00:37,299 --> 00:00:41,140
that it's really terrific because it means that you can send a secret message

8
00:00:41,140 --> 00:00:46,619
to Amazon that nobody but Amazon can read even though the entire world knows

9
00:00:46,619 --> 00:00:51,259
what you know and can see what you sent to Amazon. And Amazon knows that it's

10
00:00:51,259 --> 00:00:57,079
the only one that can decrypt the message you sent. This in fact is hard to

11
00:00:57,079 --> 00:01:01,420
believe if you think about it. It sounds paradoxical. How can secrets it be

12
00:01:01,420 --> 00:01:07,140
possible using only public info? And in fact the existence of this public key

13
00:01:07,140 --> 00:01:12,140
crypto system has some genuinely paradoxical consequences which kind of are

14
00:01:12,140 --> 00:01:15,739
a mind-bender. So let me tell you about one of them. I don't know if you've

15
00:01:15,739 --> 00:01:18,700
heard of mental chess but it's a standard thing in the chess world.

16
00:01:18,700 --> 00:01:24,140
chess masters are so talented and have such deep insight into the game that

17
00:01:24,140 --> 00:01:27,100
they don't need a chess board and they don't need chess pieces. They can just

18
00:01:27,100 --> 00:01:31,620
go for a walk through the on a country lane talking to each other and saying

19
00:01:31,620 --> 00:01:38,540
point to king four and and knight to bishop three and just talking chess code and

20
00:01:38,540 --> 00:01:42,780
playing an entire chess game that way. That's known as mental chess. It's quite

21
00:01:42,780 --> 00:01:47,379
impressive. In fact the grandmasters can play multiple games of mental chess

22
00:01:47,420 --> 00:01:51,299
against opponents who are staring at the chess board and win the great

23
00:01:51,299 --> 00:01:54,939
majority of the games. Of course these are not against other grandmasters but

24
00:01:54,939 --> 00:02:00,259
still. Okay so now this is what I propose. How about playing mental poker? If you

25
00:02:00,259 --> 00:02:05,219
know how to play poker we deal out cards and we bet and so on and my only

26
00:02:05,219 --> 00:02:11,340
condition is that I'll deal. Now that sounds like a joke and an absurd thing

27
00:02:11,340 --> 00:02:16,019
for you to agree to do but it's amazing. It's actually possible. One of the

28
00:02:16,020 --> 00:02:24,580
famous papers of Revest and Shamir was had to play mental poker using

29
00:02:24,580 --> 00:02:33,420
public key crypto. So I once tried to persuade an eminent MIT dean who's an ex

30
00:02:33,420 --> 00:02:37,020
who's a physicist researcher about this and he just wouldn't believe it. He

31
00:02:37,020 --> 00:02:42,020
argued that it was just impossible logically. And what he was thinking about

32
00:02:42,060 --> 00:02:47,540
was that if you know how to compute a function then of course you can figure

33
00:02:47,540 --> 00:02:54,340
out how to invert it. That is to say if I know how to compute some function f of

34
00:02:54,340 --> 00:03:00,100
a number and let's say that the function is one arrow in that is an injection

35
00:03:00,100 --> 00:03:04,580
then if I know what f of n is there's a unique n that it came from. So how can

36
00:03:04,580 --> 00:03:11,140
I not be able to find n? And it's an insight of computer science and complexity

37
00:03:11,139 --> 00:03:17,099
theory that says it's quite possible. It's not that you can't find the n that

38
00:03:17,099 --> 00:03:22,819
produced f of n. It's that the search for it will be prohibitive. There are in

39
00:03:22,819 --> 00:03:28,819
short one-way function that is functions that are easy to compute in one

40
00:03:28,819 --> 00:03:34,019
direction but hard to invert. They're easy to compute but hard to invert. In

41
00:03:34,020 --> 00:03:41,740
particular we're thinking about multiplying and factoring. It is an observation

42
00:03:41,740 --> 00:03:45,140
that it's easy to compute the product of two large prime numbers. We all know

43
00:03:45,140 --> 00:03:50,260
how to multiply and in fact there are faster ways to multiply than you know. But

44
00:03:50,260 --> 00:03:55,379
the current state of our knowledge of number theory and complexity theory is

45
00:03:55,379 --> 00:04:01,020
that given a number n that happens to be the product of two primes it seems to

46
00:04:01,020 --> 00:04:07,900
be hopelessly hard in general to factor and into the components p and q. Now

47
00:04:07,900 --> 00:04:13,219
this is an open problem. It's similar to the P equals nP question that famous

48
00:04:13,219 --> 00:04:20,300
open problem. It's actually a weaker. It's quite possible that you could factor

49
00:04:20,300 --> 00:04:24,860
and nP would not equal to nP but nevertheless it's the same kind of problem and

50
00:04:24,860 --> 00:04:28,939
more generally the existence of one-way functions is closely related to that

51
00:04:28,939 --> 00:04:32,980
P equals nP question. Nevertheless even though it's an open problem and

52
00:04:32,980 --> 00:04:38,420
theoretically has not been settled either way it's widely believed. I mean the

53
00:04:38,420 --> 00:04:45,939
banks the governments and the commercial world have really bet the family

54
00:04:45,939 --> 00:04:53,740
jewels on the difficulty of factoring when they use the RSA protocol. So I like to

55
00:04:53,740 --> 00:05:01,420
make the joke that my most important contribution to MIT was being involved in

56
00:05:01,420 --> 00:05:10,780
the hiring of RSNA. So this is a adi shameer or run revest and l and a

57
00:05:10,780 --> 00:05:18,300
linadlement back in the late 70s when they first came up with these ideas. So

58
00:05:18,819 --> 00:05:25,819
let's look at the way this RSA protocol actually works. So here's what happens to

59
00:05:25,819 --> 00:05:29,740
begin with you have to make some information public so that people can

60
00:05:29,740 --> 00:05:35,100
communicate with you. So there's a we're looking at two players here. There's a

61
00:05:35,100 --> 00:05:40,860
receiver who's going to get encrypted messages and there's a sender who is

62
00:05:40,860 --> 00:05:44,860
trying to send an encrypted message to the receiver. So what the receiver does

63
00:05:44,860 --> 00:05:51,460
beforehand is generates two primes P and Q. Now in practice you want these to be

64
00:05:51,460 --> 00:05:55,939
pretty big primes hundreds of digits and they will examine in a moment the

65
00:05:55,939 --> 00:06:01,420
question of how you find them but the receiver's job is to find two quite

66
00:06:01,420 --> 00:06:07,020
substantial large primes P and Q chosen more or less randomly because if you have

67
00:06:07,020 --> 00:06:10,980
any kind of predictable procedure for how you got them that would be a

68
00:06:10,980 --> 00:06:16,340
vulnerability but if you just choose them at random then there's enough primes

69
00:06:16,340 --> 00:06:20,660
in the hundreds of digits that it's hopeless that people would guess which one

70
00:06:20,660 --> 00:06:25,259
you wound up with. Okay well you do to begin with this multiply P and Q together

71
00:06:25,259 --> 00:06:30,300
which is easy to do. Let's call that number N and now the other thing that

72
00:06:30,300 --> 00:06:36,259
receiver is going to do is find a number E that's relatively prime to this

73
00:06:36,259 --> 00:06:42,019
peculiar number P minus 1 Q minus 1. Now as a hint you might notice that P minus

74
00:06:42,019 --> 00:06:47,300
1 Q minus 1 is in fact a Euler's function event, Fee event but for now we don't

75
00:06:47,300 --> 00:06:53,300
need to understand that this is Euler's function. It's just the recipe of what

76
00:06:53,300 --> 00:06:57,300
the receiver has to do. Find a number E that's relatively prime to P minus 1

77
00:06:57,300 --> 00:07:02,219
Q minus 1. Again you don't want E to be too small and we can we'll discuss in a

78
00:07:02,220 --> 00:07:07,220
moment how do you find such an E but the receiver's job is to find such an E.

79
00:07:07,220 --> 00:07:15,260
This pair of numbers E and N will be the public key which the receiver

80
00:07:15,260 --> 00:07:24,300
publishes widely where it can easily be found by anyone who cares to look for it.

81
00:07:24,300 --> 00:07:27,900
Basically there's a phone directory where if you want to know how to send

82
00:07:27,900 --> 00:07:31,740
somebody a secret message you look them up and you find the receivers name in

83
00:07:31,740 --> 00:07:35,819
there and then you see his public E and N and that's what you use to send him a

84
00:07:35,819 --> 00:07:42,660
message. Now how do you use it to send him a message? Well I'll explain that a

85
00:07:42,660 --> 00:07:48,120
minute but let's look at one more thing that the receiver needs to do to set

86
00:07:48,120 --> 00:07:53,900
himself up. The receiver is going to find an inverse of this number E that he's

87
00:07:53,899 --> 00:08:03,259
published, the part of his public key, a modulo P minus 1 Q minus 1. That is this

88
00:08:03,259 --> 00:08:07,819
E since it's relatively prime to P minus 1 Q minus 1 it will have an inverse

89
00:08:07,819 --> 00:08:14,060
in Z star P minus 1 Q minus 1. Let's let that inverse be D and of course we know

90
00:08:14,060 --> 00:08:18,979
how to find D because you can do that with the pulverizer. D is the private key.

91
00:08:18,979 --> 00:08:23,419
That's this crucial piece of information that the receiver has that the

92
00:08:23,420 --> 00:08:28,040
receiver is not going to tell anybody. Only the receiver knows that because the

93
00:08:28,040 --> 00:08:33,080
receiver chose the P and the Q and the E more or less randomly maybe even as

94
00:08:33,080 --> 00:08:37,019
randomly as they can manage and then they find the D and that's their secret.

95
00:08:37,019 --> 00:08:44,200
Okay that's what the receiver does. How does the sender send a message? Well to send

96
00:08:44,200 --> 00:08:50,580
a message what the the the sender wants to do is choose a message that is in fact

97
00:08:50,580 --> 00:08:57,400
a number in the range from 1 to N where we're thinking again of N if it's a

98
00:08:57,400 --> 00:09:02,340
product of two primes of a couple hundred digits each then the product is around

99
00:09:02,340 --> 00:09:08,500
400 digits and so you can pick any number any message am that can be represented

100
00:09:08,500 --> 00:09:13,740
by a 400 digit number. Now there's a lot of messages that will fit within 400

101
00:09:13,740 --> 00:09:17,259
digits and of course if it's bigger you just break it up into 400 digit

102
00:09:17,259 --> 00:09:22,019
pieces so that that's the kind of message you're going to send. So the message is

103
00:09:22,019 --> 00:09:29,460
going to be a number in this range from 1 to N and what the sender is going to do is look

104
00:09:29,460 --> 00:09:36,379
up the public key and the other part of the public key N and raise the secret message to

105
00:09:36,379 --> 00:09:46,539
the power E in ZN. So we're going to compute M to the E in ZN and send that encoded message

106
00:09:46,539 --> 00:09:54,860
M hat. So M hat is what we think of as the encrypted version of the message M. So then

107
00:09:54,860 --> 00:09:59,419
we have the problem if that's what the sender sends to the receiver how does the receiver

108
00:09:59,419 --> 00:10:05,980
decode the message M hat and the answer is the receiver just computes M hat to the power

109
00:10:05,980 --> 00:10:14,379
D the secret key also in the ring ZN and the claim is that in fact that's equal to M.

110
00:10:14,379 --> 00:10:20,700
Now you can check in a class problem and it's easy to see that the reason why that method

111
00:10:20,700 --> 00:10:27,100
of decrypting works is precisely an application of Euler's theorem at least when M happens

112
00:10:27,100 --> 00:10:33,939
to be relatively prime to N. Now the odds of finding an M that's not relatively prime

113
00:10:33,939 --> 00:10:39,740
to N are basically negligible because if you'd find such an M it would enable you to

114
00:10:39,740 --> 00:10:45,500
factor and believe factoring is very hard but in fact it actually works for all M which is a

115
00:10:45,500 --> 00:10:52,220
nice theoretical result and you'll work this out in a class problem. Okay that's how it works.

116
00:10:54,379 --> 00:11:02,779
The receiver publishes E and N, keeps the secret key D, the sender expenentiates the message to

117
00:11:02,779 --> 00:11:10,379
the power E, the receiver simply decodes by raising the receive message to the power D and reads

118
00:11:10,379 --> 00:11:16,860
off what the original was. Okay so we need to think about the feasibility of all of this because

119
00:11:16,860 --> 00:11:24,059
we believe that it's impossible to decrypt but there's a lot of other stuff going on that the

120
00:11:24,059 --> 00:11:28,539
players have to be able to perform and let's examine what their responsibilities and abilities

121
00:11:28,539 --> 00:11:34,860
have to be. So the receiver to begin with has to be able to find large primes and how on earth do

122
00:11:34,860 --> 00:11:41,500
they do that? Well without going into too much detail we can make the remark that there are

123
00:11:43,179 --> 00:11:48,539
lots of primes that is to say by appealing to the prime number theorem we know that

124
00:11:48,860 --> 00:11:58,939
in among the end digit numbers about log N of them are going to be primes so that you don't have

125
00:11:58,939 --> 00:12:06,860
to go too long before you stumble upon a random prime. That is if you're dealing with a 200 digit

126
00:12:08,139 --> 00:12:15,659
N and you're searching for a prime of around that size you're not going to have to search more than

127
00:12:15,659 --> 00:12:21,819
a few hundred numbers before you're likely to stumble on a prime. And of course how do you know

128
00:12:21,819 --> 00:12:25,980
that you stumbled on a prime? Well you need to be able to check whether a number is prime or not

129
00:12:26,620 --> 00:12:31,980
and efficiently in order for this whole thing to be feasible so I have to discuss that briefly how do

130
00:12:31,980 --> 00:12:39,179
you test whether or not a number is prime in an efficient way. The other thing the receiver has to

131
00:12:39,500 --> 00:12:47,099
do is find an E that's relatively prime to p-1, q-1 but that's easy. Well it's easy because first of all

132
00:12:47,099 --> 00:12:56,459
if you just kind of randomly guess a medium sized E and then search consecutively from some random

133
00:12:56,459 --> 00:13:04,699
number you've chosen somewhere in the middle of the interval up to p-1, q-1. Again you're

134
00:13:05,340 --> 00:13:13,980
likely very likely to find in a few steps a number E that is relatively prime to p-1, q-1. How do

135
00:13:13,980 --> 00:13:20,060
you recognize that it's relatively prime? Well you just compute the GCD which we know how to do using

136
00:13:20,060 --> 00:13:25,340
Euclid's algorithm so that's really quite efficient. Recognizing that it's relatively prime is easy

137
00:13:25,340 --> 00:13:30,300
and you just don't have to search very many numbers until you stumble on an E. Okay the other

138
00:13:30,299 --> 00:13:37,979
thing you have to do is find the D that's an E inverse modulo p-1, q-1 and again that is the

139
00:13:37,979 --> 00:13:46,139
extended Euclidean algorithm, the extended GCD namely the pulverizer. So those are the pieces

140
00:13:46,139 --> 00:13:52,699
that the receiver has to do. Now let's look at this a little bit more and think about the information

141
00:13:52,699 --> 00:13:57,659
about the prime. So the famous theorem about the primes is their density which is if you let a

142
00:13:57,659 --> 00:14:05,579
pi of n be the number of primes less than or equal to n then it's a deep theorem of number theory

143
00:14:05,579 --> 00:14:13,259
that pi of n actually approaches a limit in an asymptotic sense which we'll discuss in more

144
00:14:13,259 --> 00:14:20,620
detail but that pi of n as n grows gets to be very close to n over log n that's the natural log

145
00:14:20,620 --> 00:14:27,820
of n and then now that's a deep theorem but in fact if we want a self-contained treatment for

146
00:14:27,820 --> 00:14:34,139
our purposes there's an exercise that will be in the text where we can derive Chebbi Chev's

147
00:14:34,139 --> 00:14:39,740
bound which is weaker than the tight prime number theorem but Chebbi Chev's bound which can

148
00:14:39,740 --> 00:14:44,940
be proved by more elementary means that's within the ability of our own ability at this point with

149
00:14:44,940 --> 00:14:52,220
the number theory we have to be able to show that n over 4 log n is a lower bound on pi of n.

150
00:14:53,020 --> 00:14:59,100
So basically that says that if you're dealing with numbers of numbers of size n which means

151
00:14:59,100 --> 00:15:06,620
there are length log n a few hundred digits then you only have to search maybe a thousand digits

152
00:15:06,620 --> 00:15:12,380
before you're very likely to stumble on a prime and if you search 2000 digits it becomes

153
00:15:13,100 --> 00:15:18,220
extremely likely that it will stumble on a prime so the primes are dense enough that we can

154
00:15:18,220 --> 00:15:23,419
afford to look for them providing we can have a reasonably fast way to recognize when a number is

155
00:15:23,419 --> 00:15:31,179
prime well one simple way that it almost is perfect but works pragmatically pretty well is called

156
00:15:31,179 --> 00:15:36,860
the firm I test but let me just emphasize this remark I got ahead of myself that if I'm dealing

157
00:15:36,860 --> 00:15:42,620
with 200 digit numbers then about one in a thousand is prime using just the weaker Chebbi Chev's bound

158
00:15:42,620 --> 00:15:48,139
and that says that I don't have to search too long only a few thousand numbers to be able to

159
00:15:48,139 --> 00:15:53,740
find a prime and you know a few thousand numbers as well within the ability of a of a computer to

160
00:15:53,740 --> 00:15:59,100
carry out providing that the test for recognizing that a number is prime isn't too time consuming.

161
00:15:59,820 --> 00:16:07,740
So one naive way that that really almost works to be a reliable primality test is to check whether

162
00:16:08,300 --> 00:16:12,940
a firmost theorem is obeyed. Firmost theorem, the special case of Euler's theorem says that

163
00:16:12,940 --> 00:16:21,180
if n is prime then if I compute a number a to the n minus one it's going to equal one in z n

164
00:16:22,300 --> 00:16:26,779
and that's going to be the case for all a that are not zero if n is prime.

165
00:16:26,779 --> 00:16:36,379
Now that means that if this equality fails in z n then I immediately know a is not prime go on search

166
00:16:36,379 --> 00:16:45,740
for another one. Okay so suppose I'm unlucky or lucky and I choose an a to test and it turns out

167
00:16:45,740 --> 00:16:51,740
that a to the n minus one is one does that mean that n is prime unfortunately not it might be that

168
00:16:51,740 --> 00:17:00,460
there's that I just hit an n that happened to satisfy firmost equation even though n was not prime

169
00:17:00,460 --> 00:17:09,339
but it's not a very hard thing to prove that if n is not prime then half of the numbers

170
00:17:10,779 --> 00:17:17,259
from one to n are not going to pass the firmost. So if half of the numbers are not going to pass the

171
00:17:17,819 --> 00:17:23,339
the firmost then what I can do is just choose a random non-zero number in the interval from one to

172
00:17:23,339 --> 00:17:31,819
n raise it to the n minus first power and see what happens and if n is not prime the probability

173
00:17:31,819 --> 00:17:39,980
that this random number that I've chosen fails this test is at least a half. So I try it 50 times

174
00:17:39,980 --> 00:17:46,140
and if in fact 50 randomly chosen a's in this in the interval from one to n all satisfy

175
00:17:47,259 --> 00:17:56,940
firmost theorem then there's one chance in two to the minus 50th that in two to the 50th rather

176
00:17:56,940 --> 00:18:04,619
that n is not prime that's a great bet leap for it. So that basically is the idea of a probabilistic

177
00:18:04,619 --> 00:18:10,220
primality test. Now there's a small complication which is that there are certain numbers n where

178
00:18:10,779 --> 00:18:17,500
this property that half the numbers will fail to satisfy firmost theorem doesn't hold

179
00:18:17,500 --> 00:18:22,059
there known as the Carmichael numbers in there known to be pretty sparse so that really if you're

180
00:18:22,059 --> 00:18:27,420
choosing an n that had random which is kind of what we're doing when we choose random prime's

181
00:18:27,420 --> 00:18:32,220
p and q the likelihood that you'll stumble on a Carmichael number is another thing that you just

182
00:18:32,220 --> 00:18:38,460
don't have to worry about. So really the firmost primality test is a plausible pragmatic test that

183
00:18:38,460 --> 00:18:45,340
you could use to pretty reliably detect whether or not a number was prime what was the last component

184
00:18:45,340 --> 00:18:52,140
of the powers that we needed the receiver to have. Okay so now we come to the question of why

185
00:18:53,019 --> 00:18:58,940
do we believe that the RSA protocol is secure and the first thing to notice is that if you could

186
00:18:58,940 --> 00:19:06,779
factor n then it's easy to break because if you can factor n then you have the p and the q and

187
00:19:06,779 --> 00:19:13,019
that means you know what p minus 1 times q minus 1 is and therefore you can use the pulverizer

188
00:19:13,019 --> 00:19:19,019
in exactly the same way the receiver did to find the inverse of the public key you could find the

189
00:19:19,019 --> 00:19:26,460
easily. So surely if if you can factor then RSA breaks no question about that. What about the

190
00:19:26,460 --> 00:19:32,700
converse? Well what you can approve and there's an argument that's sketched in a class problem not

191
00:19:32,700 --> 00:19:41,980
fully in the book is that if I could find the private key d then in fact I could also factor n.

192
00:19:41,980 --> 00:19:49,340
So if I believe that factoring is hard then in fact finding the secret key is also hard and we

193
00:19:49,340 --> 00:19:54,220
could try to be confident that our secret key is not going to be found even given the public key.

194
00:19:54,779 --> 00:20:01,019
Now unfortunately this is not the strongest kind of security guarantee you'd like.

195
00:20:03,259 --> 00:20:08,140
Because there's a logical possibility that you might be able to decrypt messages without

196
00:20:08,140 --> 00:20:13,580
knowing the secret key. Maybe there's some other walk around whereby you can decrypt the secret

197
00:20:13,580 --> 00:20:20,220
message m hat by a method other than raising it to the death power and what you really like is a

198
00:20:20,220 --> 00:20:28,059
theorem of security that said that breaking RSA, reading RSA messages by any means whatsoever

199
00:20:28,059 --> 00:20:33,819
would be as hard as factoring. That's not known for RSA. It's an open problem. And so RSA doesn't have

200
00:20:33,819 --> 00:20:42,139
the theoretically most desirable security assurance but we really believe in it and the reason we

201
00:20:42,139 --> 00:20:47,659
really believe in it is that for a hundred or more years mathematicians and number theorists have

202
00:20:47,659 --> 00:20:55,899
been trying to find efficient ways to factor and more pragmatically the most sophisticated cryptographers

203
00:20:55,900 --> 00:21:02,700
and decoders in the world using the most powerful networks of supercomputers have been attacking RSA

204
00:21:02,700 --> 00:21:10,540
for 35 years and have yet to crack it. Now the truth is that in the course of the 35 years various

205
00:21:10,540 --> 00:21:18,860
kinds of glitches were found that required some added rules about how you found the P in the Q

206
00:21:18,859 --> 00:21:27,099
and how you found the E but they were easily identified and fixed and RSA really is a robust

207
00:21:28,539 --> 00:21:36,379
encryption method, public key encryption method that has withstood attack for all these years and

208
00:21:36,379 --> 00:21:39,819
that's why we believe in it.

