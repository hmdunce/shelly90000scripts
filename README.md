# shelly90000scripts

## BronzeMUD rules

- hackmud from scratch (ish)
- outside resources allowed
- 3rd party scripts allowed (?)
- chat help allowed and BEGGED FOR
- AI allowed (sue me)
- all code for my scripts written on stream
  and saved at:
  https://github.com/hmdunce/shelly90000scripts

## Notes

### How hack those mofos?

#### Goals

- resumable; state in db
- detect rotations and other changes (e.g. loc replaced by scam script)
- record data about lock stack etc
- WANT MULTIPLE HACKERS TO COLLABORATE ON CURRENT ROTATION ???
  - ideally hackers should divide the work?
  - else they each use random order?
  - or is this stupid? hacking easy, binmat harder?
  - let's try it even if it's stupid

#### Thoughts

Given current data, we have certain expectations.

If I do X, I expect to see Y, or Z... unless W!

- given it's a loc, PUBLIC HIDDEN and no shifting
- given we're hacking that mofo, "Connected to mofo" on poke
- given first lock is c001, when I call with {}, I should see LOCK_ERROR about c001
  (hmm)
- given rot is [c001{color:"orange"}, EZ_40{ez_cmd:"open",ez_prime:2}, c002]
  - if I call with {}, should see LOCK_ERROR about c001
  - if I call with {c001:"orange",color_digit:6}, should see
    LOCK_UNLOCKED c001 plus LOCK_ERROR about EZ_40

How to handle db state?

Idea: Just log calls! Then write code to process log...

Problem: need to understand outputs like

```
"LOCK_ERROR\n"lime" is not the correct color name."
```



### Junk

// [NOTICE] trying to hack that mofo anon_ddttl_2we3k1.entry_7e6j9l
// [INFO] Connected to anon_ddttl_2we3k1.entry_7e6j9l
// [NOTICE] hacked? «VLOCK_ERROR«
// Denied access by CORE «Nc001« lock.
// [ERROR] still don't know how to hack mofos


mofo done got hacked:
"WARNING: BINMAT security shell inactive. Intelligent defense system offline.\n`NLOCK_UNLOCKED`\nConnection terminated."
