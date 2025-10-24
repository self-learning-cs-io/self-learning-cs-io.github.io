---
title: CS144 NetworkP1218 6cConfidentiality
---

1
00:00:00,000 --> 00:00:08,339
The answer is yes. If an eavesdropper named Eave hears both C1 and C2, she can reconstruct

2
00:00:08,339 --> 00:00:16,500
M1 XRM2. If M1 and M2 are both ASCII text messages, this could provide a lot of information.

3
00:00:16,500 --> 00:00:27,179
Since C1 XRC2 is equal to M1 XRK XRM2 XRK, the two case cancel. This means C1 XRC2 is equal

4
00:00:27,179 --> 00:00:34,340
to M1 XRK M2. As a trivial example, if it happens to be that M1 is equal to M2, then

5
00:00:34,340 --> 00:00:39,700
you've configured this out, since C1 and C2 will be the same. There's a reason why it's

6
00:00:39,700 --> 00:00:42,820
called a one-time pad. Only use it once.

