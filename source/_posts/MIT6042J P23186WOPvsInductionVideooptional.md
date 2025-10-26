---
title: MIT6042J P23186WOPvsInductionVideooptional
---

1
00:00:00,000 --> 00:00:11,000
So we come to the point that a lot of students have been asking about, but which in fact is entirely optional,

2
00:00:11,000 --> 00:00:17,000
so that if you care to skip this little piece of video, welcome to, it's not going to appear on any exam or anything.

3
00:00:17,000 --> 00:00:28,000
But people have consistently asked whether how they choose which method of proof to use among ordinary induction or strong induction or well ordering.

4
00:00:28,000 --> 00:00:36,000
And the answer is that it's hard to tell them apart because in a technical, easy technical sense, they're really all equivalent.

5
00:00:36,000 --> 00:00:38,000
So let's look at them one by one.

6
00:00:38,000 --> 00:00:44,000
First of all, it's clear that ordinary induction is a special case of strong induction.

7
00:00:44,000 --> 00:00:49,000
In ordinary induction, you're allowed to assume only P of N in strong.

8
00:00:49,000 --> 00:00:55,000
You can assign everything from P of 0 up to P of N to prove P of N plus 1.

9
00:00:55,000 --> 00:01:06,000
But you don't have to use all the extra assumptions that you could just use P of N so that any ordinary induction can be seen as just a special case of strong induction.

10
00:01:06,000 --> 00:01:12,000
It would be a loom misleading to call it strong induction, but it is strong induction.

11
00:01:12,000 --> 00:01:17,000
So why bother with it? Well, the answer is basically it's an expository difference.

12
00:01:17,000 --> 00:01:30,000
It helps your reader to know that the proof for N plus 1 is only going to depend on N, not on the case that are less than N as they would typically in a genuine strong induction proof.

13
00:01:30,000 --> 00:01:45,000
Second, there's some argument that ordinary induction going from N to N plus 1 is more intuitive than strong induction that goes from anywhere less than or equal to N up to N plus 1.

14
00:01:45,000 --> 00:01:50,000
I'm not sure that I subscribed to that, but I've heard people make that claim.

15
00:01:50,000 --> 00:02:00,000
All right, there's another perspective which is interesting and maybe surprising, which is why not always use ordinary induction?

16
00:02:00,000 --> 00:02:06,000
Oh, wait a minute. How do you replace strong induction with ordinary induction? Well, it's easy.

17
00:02:06,000 --> 00:02:14,000
Suppose that you've proved for all MP of M using strong induction with induction hypothesis P of M, what have you done?

18
00:02:14,000 --> 00:02:29,000
Well, it's the same base case whether you're using ordinary or strong, but in strong you would do an inductive step where you actually assumed not just P of N, but P of K for all K less than or equal to N.

19
00:02:29,000 --> 00:02:38,000
Right? And then using all those hypotheses about P of K, you proved P of N plus 1 in the strong induction.

20
00:02:38,000 --> 00:02:48,000
Well, how do you turn it into an ordinary induction? Just let Q of N be that assumption that for all K less than or equal to N, P of K.

21
00:02:48,000 --> 00:03:04,000
And if you think about it for a moment, just revising the induction as a hypothesis to include that universal quantifier for all K less than or equal to N means that the strong induction on P of K becomes an ordinary induction on Q of N.

22
00:03:04,000 --> 00:03:20,000
And we have, with a trivial change, decorating a bunch of occurrences of formulas with, with for alls, we have converted an strong induction into an ordinary induction.

23
00:03:20,000 --> 00:03:37,000
So we see that strong induction adds no power beyond ordinary induction. It just lets you omit a bunch of universal quantifiers that would otherwise have to be made explicit if you were going to do it by ordinary induction.

24
00:03:37,000 --> 00:03:49,000
Okay. Then why you're strong? Just precisely because it's cleaner, you don't have to write those for all K less than or equal to N's all over.

25
00:03:49,000 --> 00:04:00,000
And now we come to the final question about what's the relation between the well-ordering principle and induction? Well, it's basically the same deal.

26
00:04:00,000 --> 00:04:10,000
You can easily rephrase an induction proof, an induction proof, just transform its template to fit the template of a well-ordering proof and vice versa.

27
00:04:10,000 --> 00:04:16,000
And without going into the details of exactly how, because it's not important, but it is routine.

28
00:04:16,000 --> 00:04:27,000
It follows that well-ordering principle is not adding any new power or even new perspective on the mathematics of any given proof.

29
00:04:27,000 --> 00:04:34,000
It's just a different way to organize and tell the same story.

30
00:04:34,000 --> 00:04:49,000
And it also means conceptually which is nice that these apparently different inference rules, strong induction, ordinary induction, well-ordering principle, there's really only one and the others can be justified in terms of it and explained as variations of it.

31
00:04:49,000 --> 00:04:55,000
So that's intellectually economical, they not have a proliferation of different reasoning principles.

32
00:04:55,000 --> 00:05:01,000
Which brings us to the question of which one to use and what I can say is that it's a matter of taste.

33
00:05:01,000 --> 00:05:16,000
The truth is that when I'm writing up proofs, I will often try different versions. I'll try it by ordinary induction and I'll try it by well-ordering and I'll read the two and decide which one seems to come out more cleanly.

34
00:05:16,000 --> 00:05:18,000
And I'll go with that one.

35
00:05:18,000 --> 00:05:26,000
So there isn't any simple rule about which to choose, but in a certain sense it really doesn't matter. Just pick one.

36
00:05:26,000 --> 00:05:38,000
The only exception to that of course is when on an exam or similar setting, you're told to use one of these particular methods as a way to demonstrate that you understand it, then of course you can't pick and choose.

37
00:05:38,000 --> 00:06:00,000
So finally we come to a pedagogical question about why is it that in this in 6042 we taught well-ordering principle first, in fact, the second lecture, and are only now in the third, we at the end of the third week, getting to the induction principle which is much more familiar and people argue they like it better at least most of them.

38
00:06:00,000 --> 00:06:29,000
Well, the answer is that it's a pedagogical strategy and it's one in fact which the authors disagree with. I'm not united on. My view is that we're better off doing well-ordering principle first and the reason is that our impression from conversations with students in surveys and from exam performance shows that only about 20% of the students get induction no matter how hard we try to explain it and teach it.

39
00:06:29,000 --> 00:06:44,000
They worry about, they report worrying about things about that assuming P of N to prove P of N plus 1 is somehow circular and it's certainly measurable that 20% or so of the class just can't reliably do proofs by induction.

40
00:06:44,000 --> 00:06:59,000
Now, this baffles the 80% to whom it's obvious and who know how to do it easily and it baffles us instructors. We can't figure out what the problem is that those 20% have and we've been trying to teach induction lots of different ways.

41
00:07:00,000 --> 00:07:16,000
On the other hand, nobody has trouble believing the well-ordering principle and working with it and they certainly don't have any harder time using it than they do using ordinary induction or strong induction.

42
00:07:16,000 --> 00:07:30,000
This conceptual problem about is it safe and do I really believe in it just doesn't come up with the well-ordering principle. Everybody agrees that it's obvious that a non-negative set of non-empty set of non-negative integers is going to have a least one.

43
00:07:30,000 --> 00:07:54,000
And so we chose to do well-ordering right away because there's no overhead in explaining it and it lets us get going on interesting proofs from the get-go as opposed to waiting a while or spending a couple of lectures working through induction and leaving that with the main if only method that people have for proving things about non-negative integers.

