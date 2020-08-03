---
title: Learning Vim in Quarantine - Part 2
date: '2020-08-03'
spoiler: Learning Vim is like trying to bench 80 Kilograms on your first day of Gym!
---


Starting to use Vim was probably one of the best decisions of my life. It made me realise, how much time and effort I have wasted moving my hand back and forth between keyboard and mouse. Don't get me wrong, mouse is a really useful device and I don't plan on getting rid of it. But when it comes to coding it's just more natural to use a keyboard.

It took me some time to understand that Vim is actually making me efficient. Once you pass the whole "What keys I should press to get to that line?", "Why are there 3 modes!!", "I hate Vim so much!" and "Arrrgghhhhhh!!", believe me, after writing the first part, there was a time when I was frustrated with Vim so much that I did not use it for a whole week (*We were on a break, and I might have used VSCode*).

It made me realize the mistake I was making, I was trying to learn all of Vim at once. Like all of it! I wanted to be a master at Vim. It made me recall of a time from the Gym.

> If you want to bench 80 Kgs on your first day of the Gym, you are going to fail. Miserably.

Just like benching 80 Kgs, you don't learn all of the Vim on the first day. You cannot. You start with 10 Kgs, and gradually improve yourself to 80 Kilograms. (For those who are wondering, I still can't lift more than 50 Kgs 😅).

Anyways, the point here is that if you want to learn Vim, start with the basic key movements. I know its really tempting to learn all the tricks and install all sorts of plugins to do the thing you want to do in 2 key-strokes, but that's not going to help in the long run. At least it did not help me. I realized that if I try to learn all 100+ combinations at once, I am not learning anything at all. You need to learn the basic movements first (start with 10 or so) and then gradually add more keys to your Vim arsenal. First, try to get it done using brute force.

## Something which helped me

In your early days, if you are going to directly use Vim in your projects where you need to do a lot of thinking (like you are figuring out an algorithm or debugging a nasty bug from last 3 days), I would recommend not use Vim use at all (at least during the first few weeks). It will only make you more frustrated. Initially, I only used Vim for writing documentations, and blog posts like these. There's not a lot of mode switching and you are more or less in your comfort zone.

Also, I changed my Vim color theme to match my VSCode theme (which tricked my  little brain to think I was still in VSCode).

If you want you can also install one of those VIM-mode plugins in your favourite editor and get started there. It personally felt a little weird to me, but I would recommend you to try.

## Start with these keys

To start with, I would recommend with these ~10 keys to help you understand the movement and basic editing. Spend a week or 2 focussing on just these keys until you feel comfortable with them.

Also remember, this is going to be the hardest part of your Vim journey.

1. `j` and `k` to move up and down
2. `h` and `l` to move left and right
3. `w` to move forward by a word
4. `b` to move backward by a word

What should be your aim here? When can you say that you are good at using these keys?

The point when you can say that you have mastered these keys would be when you don't have to think about what keys to press when you want to "move 5 words forward" or "go 4 lines down". It should naturally come to you without thinking. We can then say that you are ready for the next keys!

These are a couple of keys to help you with the basic editing. You can learn them in parallel with the keys above.

1. `yy` Yank (Copy) a line
2. `p` paste the line you just yanked, a line below your current line (It will paste whatever is in your *register* (think of it as your clipboard))
3. `dd` delete the line that you just pasted (it will also move it to the *register*)
4. `u` will undo your last command

These are some very basic commands (and easy to learn) but very powerful. Take some time to master these.

Let's move to our final set of keys!

Many a times you might need to delete a block of text all at once. You can do `dd dd dd dd` to delete multiple lines (4 in this case), but you can also do this

1. Press `Shift + v` this will put you in "Visual Line mode" and now you can use the  `j` and `k` keys to start highlighting lines and then press `d` to delete all the highlighted part at once!
2. There's one more "Visual mode". If you just press `v` it will put you in visual mode but only highlight your current character. From there you can perform your usual movements using `w`, `b`, `h`, `j` , `k` and `l`  keys to highlight the parts you want to delete with `d`.  (Or you can use `y` to yank that part and paste somewhere else using `p`)

Mastering  `h`, `j` , `k` and `l`  is coming handy now 😉

## Writing text

Now probably at sometime in your coding, you would want to write your own stuff and not just copy paste from other files (I hate when this happens).

For those times we have the "Insert mode". Pressing `i` would put you into the insert mode and you can then write all the text you want just like any regular text editor.

## Getting out of the insert mode

There are a couple of ways I found which take you out of the insert mode:

1. Escape key
2. `Ctrl + c`
3. `Ctrl + [`

I am yet to understand why there are 3 ways, but I mostly use the Escape key and `Ctrl + c`

## Check the mode you are in

In the bottom left of your code window you should see an indicator about which mode you are in

1. `INSERT` for Insert Mode
2. `VISUAL` for Visual Mode
3. `VISUAL-LINE` for Visual line Mode
4. `NORMAL`  means you are in the default mode which I like to call movement mode

## Saving the file

Now that you have made edits, you would want to save those changes. Use `:w` to save the file.

## Quitting Vim

I will update this section when I learn how to quit Vim 😂

![exit-vim](./exit-vim.jpg)

You can use `:q` to exit Vim when you are in the `NORMAL` mode. This will fail if you have made changes to the file.

If you have made edits and don't want to save the edits, use `:q!` to quit without saving.

## Final thoughts

I would recommend to spend around a week or two with just these commands till the point where you press these keys without thinking about them. (Just like you press `Cmd + c` and `Cmd + v` to copy and paste). Then once you are comfortable, incorporate a few more keys (or combinations) in your editing. Just keep them less than 4-5 keys/commands at a time.

Here's a quick Vim cheatsheet if you need one. Its not pretty but gets the job done: [https://www.fprintf.net/vimCheatSheet.html](https://www.fprintf.net/vimCheatSheet.html)

I will write part 3 of this series based on my personal experience once I am done with the current set of keys. Hope this is helpful!
