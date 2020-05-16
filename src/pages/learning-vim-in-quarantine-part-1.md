---
title: Learning Vim in Quarantine - Part 1
date: '2020-05-16'
spoiler: Why I am learning Vim in 2020?
---



Wow, it has been a long time since I wrote anything on this blog. To be honest the last year was a bit too much. And surprisingly this year is no better.


Anyways, just like everyone, I am using this quarantine to skill up and make good use of it. I am picking up things I always wanted to do and one of those things was learning Vim.
I have seen a lot of tutorials with people using Vim which mostly confused me. Like why would you want to write in a command line tool. WITHOUT A MOUSE??? Are you kidding me. How are you even going to navigate around? That doesn't even make sense! 

> This is not a tutorial, rather my story of deciding to use Vim as my primary text editing tool. 

## Problems with IDEs

Well, turns out, if you start spending 10+ hours writing code everyday, you realise that using a mouse is actually slower. Like really slow. Hear me out. If you use VSCode/Any other editor it has some basic issues which become annoying. 
- You constantly have to switch your right hand between the keyboard and mouse. That takes around 0.75 seconds for me (This includes the time to position my hand properly on the mouse, move the mouse around and 0.5s more when I switch back my hand to keyboard).
- You have to point your mouse to tiny icons on the screen, which at 4.30AM in the morning is just too much to ask of me.
- On a good day, loading up IntelliJ easily takes 10 seconds out of my life. And then starts the indexing process which takes forever!
- I spend a good amount of my time being SSHed into remote servers. Normally I would have at least 3 SSH sessions open into different servers. While it mostly involves checking logs, there are cases when I have to edit config files on remote servers and `nano` is not present. But Vim is always on each one of the servers. So yeah it makes sense to invest time in Vim.
- Other editors are just not as cool as Vim. This is probably the biggest drawback. I like the minimal look of Vim(by default, even line numbers are not shown!)

## But why Vim?

But what makes Vim so good that I want to learn it? Well I am still to experience the benefits myself as I have literally just started. But here are some good things I heard about it:
- It is fast. It is always going to be faster than your normal IDEs since it has a lot less UI to process.
- It is highly customizable. There are plugins for almost anything you can think of. Anything you can do in any other IDE, you can do it in Vim too and probably faster. 
- Since Vim is on almost all the servers, you can literally use the same Vim setup on any machine you SSH into by just downloading your `.vimrc` file and BOOM! you feel right at home.
- You forget about your mouse. Since I started using it I have realised how fast I am without a mouse/trackpad. 
- Also, if you are staring up with Vim, DO NOT USE THE ARROW KEYS. I read this in a lot of posts. Well it is true. Hear me out. Time to switch to your arrow keys is easily `0.25s` and if you are not a touch typer (I am not) you are even slower when you come back to the home rows because you have to position your hands back to where they were. But if you use `h`, `j`, `k` and `l` to navigate around, it really becomes easy to just keep your hands at one place and enjoy typing!
- There are things called motions, tags and macros which make our life much easier. This is not a post about them since I am yet to use any of them, but yeah they are a big part of the Vim experience. Maybe we can talk about them in the next part.

## I am sold, let's start!

Glad you are sold. Start by installing Vim (It should already be installed on most linux based OS) you can find tons of tutorials by just Googling `Install Vim on X operating system`

Okay, now that we have Vim installed, the first thing I did was complete the `vimtutor` file. It is a text file which gives you an idea about using Vim by actually asking you to editing the file while you are reading it. Felt like an episode of Bandersnatch to me. It is okay if you have to read it more than one to get the hang of commands.

Most of the commands are pretty intuitive, you want to quit? `:q`, you want to save(write)? `:w` Want to move a word forward? just press `w`. `i` puts you in insert mode. `ciw` changes inside word, ~~`d` deletes the character you are at~~ (d actually waits for a motion before deleting anything. Like diw for delete inner word, this will delete a word when your caret is on any letter of the word). You actually don't have to memorise the commands, after sometime, they just flow naturally, like you are speaking... in Vim's language.

Okay, so one more thing. There is a thing called `.vimrc` I talked about, that is the configuration file for Vim. Which means any modifications/plugins you add to `.vimrc`configurations can and will be persisted across different Vim sessions. One benefit is that these can be persisted across different machines as well. Just push your `.vimrc` file to Github/any server from where you can download later. On the new server just download your `.vimrc` file, and you are in your familiar setup on the new machine as well, with all the syntax highlighting and all your plugins.

## What all plugins to Install??

There are a lot of Vim plugins and a lot more `.vimrc` files available on the web. **A quick search on Github returns around 19,519 repository results**. This is just mind-blowing and you will never be able to go through all those `.vimrc` files. 

The approach I am taking on is to create my own `.vimrc` file from scratch by adding plugins and settings on need basis rather than blindly copying/using someone else's `.vimrc` file. I am still looking at other people's vimrc's and adding bits and pieces here and there but only after understanding what it does and is it actually adding any value to my flow.

The ones I have added for now are [Vundler](https://github.com/VundleVim/Vundle.vim), [NerdTree](https://github.com/preservim/nerdtree) and Enable Line Numbers! :D

Anyways for those interested, I am adding my `.vimrc` on Github hoping it would motivate someone to use Vim in 2020 and beyond (If we make it past 2020).


[My super slim vim configuration](https://github.com/anamritraj/vimrc) 
