---
title: How I created this blog?
date: "2018-12-25"
spoiler: Merry Christmas!
---

We have already covered why I created this blog. You might be wondering how I created this amazing, super fast, mobile-first, super-responsive (..100 more words..) website.

If you are not, you should. Let's unfold how it all works!

## What did I use?

The whole blog is a server-side rendered static website powered by [Gatsby.js](https://www.gatsbyjs.org/). If you are not living under a rock for the past few months you must have heard about it. Gatsby.js is an amazing piece of technology which lets you create super-fast websites with minimal code.

It uses the power of React.js, web pack and modern JavaScript and CSS to build powerful web apps. As the backend you can use anything, for my case I will be using simple MarkDown files. Gatsby.js will automatically (read *magically*) convert you markdown files into HTML and load them as blog posts. And there are tons of plugins available to build additional features to your website. For instance, there are plugins which will convert your website into a Progressive Web App without you having to do anything.

Gatsby.js will generate static assets which can be served through any server which can handle HTML, CSS and JavaScript. This means that you can use Github Pages to host your website for free, *forever*. There are other *free* ways to host a Gatsby.js website but I will cover what I am using for this awesome website.

## Why did I choose Gatsby.js?

It's simple, easy to deploy and *hot* right now! Apart from that it is super fast, SEO friendly, responsive and provides a PWA out of the box without having to do much.

![Also this!](./metrics-25-05-2018.PNG)

You can see pretty high numbers in the Google Lighthouse Audit tool. Those are some pretty high scores and great for SEO and Mobile.

## How can I build my own?

So you want to build your own blog like this? You are at the right place! Let's cover that!

I will assume you have the following things already, if not please search the internet on how to get them.

1. Git
2. A GitHub Account
3. A text-editor (use VS code)
4. A Travis-CI account. (This is optional)

### Step 1: Clone

Clone [this repository](https://github.com/anamritraj/anamritraj.tech.git)
```bash
git clone https://github.com/anamritraj/anamritraj.tech.git
```

### Step 2: Make changes

Now that you have cloned this repository, move into that folder using you cmd/terminal and run
```bash
yarn
# or if you are an npm user
npm install
```
This will install all the project dependencies in your machine. Now, let's test this..

```bash
yarn dev 
# or 
npm run dev
```

This will start the development server on http://localhost:8000.

Go to `/src/pages/` and create a new file. Keep an eye on your browser. As soon as you hit save, the post will be reflected in the browser. This is Hot-reloading and one of the features I love the most. This is by far my favourite feature of Gatsby.js. 


Now before deploying a website with my name and photo on it (which I would love, but you probably don't want to) let's make some changes.

I will list the exact places where you may want to make the changes.

```
README.md
package.json
script/deploy-to-gh-pages.sh
gatsby-config.js
src/components/Bio.js
src/templates/blog-post.js
static/CNAME
```
**Note**: If you are not planning to use a custom domain delete that `static/CNAME` file. Otherwise, add your domain there.

There's one particular change which I would like to talk about. If you check the `/gatsby-config.js` file. There is a parameter called `pathPrefix`. If you are not planning to use a custom domain then you need to set it to `/REPO_NAME`. This will tell Gatsby.js to add the necessary path to links while navigating around your website.

These are all the files where you will have make changes to customize the names and some variables. I'll leave the exact changes for you to explore.

### Step 3: Deploy!
Now that you have made changes to *your* site. Let's deploy it for the world to see. We are going to use Github Pages for this.

If you don't have a Github account then its probably a good idea to create one now.

Now let's create a new repository on Github. 
Goto https://github.com/YOUR_USERNAME?tab=repositories

Click that big green button which says *New*. Give your repo a name and keep it Public. Don't select anything else and click Create Repository.

From your terminal, run
```bash
# Rename any old origins if you have any
git remote rename origin destination
# Point to the newly created repository
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin master
# Now the usual stuff
git add .
git commit -m "Initial commit"
git push -u origin master
```

Reload the page on GitHub and you should see the code there. 

Now, there are 2 ways to deploy code and both use GitHub Pages to serve the static files. 

1. Use your terminal to deploy to `gh-pages` branch
2. Use Travis-CI to deploy your static assets

**WAY 1: The easy way**

If you look at the `package.json` file there is a `npm` script `git-deploy`. This will build the project and push everything in the `/public` directory to the `gh-pages` remote branch.

From there you can go to repository settings here https://github.com/YOUR_USERNAME/REPO_NAME/settings and enable GitHub pages to use `gh-pages` branch.

Congratulations! You have successfully deployed your code and your website is live at 

https://YOUR_USERNAME.github.io/REPO_NAME

**WAY 2: The cool way, and less annoying, and less manual**

Let's setup a Travis-CI account for this repository. Goto https://travis-ci.com and SignUp / Sign In. Go ahead and setup your Github Repository with Travis-CI.

Now that you have this setup, go to Travis dashboard, choose your repository, Goto settings for that repository and then go to the section of **Environment Variables**

Let's add a couple of environment variables which are used in our `/script/deploy-to-gh-pages.sh` script.
The first one is the path of your repo
```bash
repo_path = YOUR_GITHUB_USERNAME/REPO_NAME
# In my case it is anamritraj/anamritraj.tech
```

The second one is a GitHub API key. Goto [this page](https://github.com/settings/tokens) and click generate new token. Select the first checkbox which says `repo`. Give your token a name. Now make sure you save this somewhere safe, treat it like your password and don't share it with anyone.

Now, back to the Travis settings page, add another environment variable.
```bash
github_token = YOUR_TOKEN
```

Also, make sure that the **Display value in build log** is off. This will prevent this token to show up in build logs.

Now all you have to do is make changes and push the code to `master`. Travis will automatically build it for you and deploy the code to `gh_pages` branch.

The script for this is written in `/script/deploy-to-gh-pages.sh`. You can tweak the settings if you want to.

## Step 4: Iterate!

This was in no way a complete tutorial and only scratches the top of what you can achieve with Gatsby.js. If you know basic React.js then you can make it do whatever you want.

I feel like writing more stuff on this blog just because it feels so snappy while reading it. I probably will write more.

Till then Merry Christmas and Happy New year!
