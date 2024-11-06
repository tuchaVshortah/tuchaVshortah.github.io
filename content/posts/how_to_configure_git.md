+++
date = '2024-11-06T07:27:06+05:00'
draft = false
title = 'How to configure Git'

tags = ["github", "signatures"]
categories = ["tutorials", "git"]

[cover]
image = "/assets/images/git_logo.jpg"
alt = "Git logo"
relative = false
+++

# About Git and Remote Code Repositories

Git was designed to enable versioning of the source code. You can use it to store and modify your code reliably in a local or a remote repository. It allows you to collaborate with others and revert changes if you need to do so. The main advantage of using Git it shows how the source code changed and the descriptions and comments left by developers.

Remote code repositories such as Github and GitLab allow you to conveniently share your code with others. Depending on your needs you might want to verify your identity you create new commits. Both Github and GitLab allow you to do so by utilizing signed commits. We will focus on Github in this article.



# About Verified/Signed commits

By default, whenever you push a commit to a remote Github repository it does not know a true identity attached to the commit. This might, potentially, make it harder for other users and your collaborators verify your identity. 

![Unverified commits](/assets/images/git_unverified_commits.png)

Other changes applied through the Github's web interface and pull requests are verified using a verified signature managed by Github.

![Github signed commit](/assets/images/github_signed_commit.png)

Depending on your needs you might want to use your own signature to verify your commits and other changes such as merge requests.

![Git verified commits](/assets/images/git_verified_commits.png)

This can be configured by notifying Github about the *identity* or a *GPG key* attached to your commits.

![Git user signed commit](/assets/images/git_user_signed_commit.png)

[**Learn more**](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)



# Install Git

## Windows

To install Git on Windows you might open a Powershell terminal and paste this command:
```bash {linenos=inline}
winget install --id Git.Git -e --source winget
```

## Ubuntu

Use this command to install Git on Ubuntu:
```bash {linenos=inline}
apt-get install git
```

Or you can add a PPA for the latest stable version:
```bash {linenos=inline}
add-apt-repository ppa:git-core/ppa
```

# Mac

On Mac if you have homebrew installed:
```bash {linenos=inline}
brew install git
```

Or if you have MacPorts installed:
```bash {linenos=inline}
sudo port install git
```

[**Learn more**](https://git-scm.com/downloads)



# How to configure signed commits for Git

Before configuring signature verification on Github you have to first setup Git and attach an *identity* that will be used to sign your commits.

Basically, you are required to tell Git the following information in order to be able to push commits: username and email. Everything else is optional.

Configure a username and an email:
```bash {linenos=inline}
git config set user.name "<your_name> <your_surname>"
git config set user.email "<your_username>@<server>.<tld>"
```