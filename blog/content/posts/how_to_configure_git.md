+++
date = '2024-11-06T07:27:06+05:00'
draft = false
title = 'How to configure Git?'

tags = ["configurations", "signatures", "git", "github", "gitlab"]
categories = ["Tutorials"]

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

![Unverified commits](/assets/images/git_unverified_commits.png#center)

Other changes applied through the Github's web interface and pull requests are verified using a verified signature managed by Github.

![Github signed commit](/assets/images/github_signed_commit.png#center)

Depending on your needs you might want to use your own signature to verify your commits and other changes such as merge requests.

![Git verified commits](/assets/images/git_verified_commits.png#center)

This can be configured by notifying Github about the *identity* or a *GPG key* attached to your commits.

![Git user signed commit](/assets/images/git_user_signed_commit.png#center)

\
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

## Mac

On Mac if you have homebrew installed:
```bash {linenos=inline}
brew install git
```

Or if you have MacPorts installed:
```bash {linenos=inline}
sudo port install git
```

\
[**Learn more**](https://git-scm.com/downloads)



# Install GPG

Canonical release forms can be found here: [www.gnupg.org/download/](https://www.gnupg.org/download/)

## Windows

You can download a full featured binary release from [gpg4win.org](https://gpg4win.org/download.html)

## Linux

Download a package using a package manager of your distribution.

## Mac

Installer for MacOS can be downloaded from [sourceforge.net/p/gpgosx/docu/Download/](https://sourceforge.net/p/gpgosx/docu/Download/)



# Create a GPG key pair

## Windows/Linux/Mac

For the version 2.1.17 or above:
```bash {linenos=inline}
gpg --full-generate-key
```

For versions lower than 2.1.17:
```bash {linenos=inline}
gpg --default-new-key-algo rsa4096 --gen-key
```

\
[**Learn more**](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)



# Export your PGP public key

This step is *required* to let Github be able to verify your signature. Otherwise Github would not be able to distinguish the relation between your public and private keys. Remember that private keys are used only to sign your commits locally. Public keys can be used to verify the signature.



## Windows/Linux/Mac

Use this command to list your keys. Copy a fingerprint of the key you just created. Let's use *3AA5C34371567BD2*:
```bash {linenos=inline, hl_lines="1"}
gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot <hubot@example.com>
ssb   4096R/4BB6D45482678BE3 2016-03-10

```

Let's export the public key block relevant to that key:
```bash {linenos=inline, hl_lines="1"}
gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
```

\
[**Learn more**](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)



# Add the Public key block to your Github account

After you have copied the Public Key Block relevant to your Private Key you can add it to your Github account

1. Navigate to [Github](https://github.com/) and click on your profile icon on the top right and click on *Settings*:
![Github right sidebar](/assets/images/github_right_sidebar.png)

2. Click on *SSH and GPG keys*:
![Github profile settings left sidebar](/assets/images/github_profile_settings_sidebar.png)

3. Press the *New GPG Key* button*:
![Github profile settings New GPG Key](/assets/images/github_profile_settings_new_gpg_key.png)

4. Then paste the Public Key Block and press *Add GPG Key*:
![Github profile settings Public Key Block](/assets/images/github_profile_settings_public_key_block.png)

5. Congrats! You have successfully added your public key to Github. There is only one step left - telling git which key to use to sign commits.

[**Learn more**](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)

# Configure signed commits for Git

Before configuring signature verification on Github you have to first setup Git and attach an *identity* that will be used to sign your commits.

Basically, you are required to tell Git the following information in order to be able to push commits: username and email. Everything else is optional.

Configure a username and an email:
```bash {linenos=inline}
git config set user.name "<your_name> <your_surname>"
git config set user.email "<your_username>@<server>.<tld>"
```

Configure the GPG program, enable GPG commit signing and set the fingerprint of your private key:
```{linenos=inline, hl_lines="4 9 12"}
# Use the path where GPG installation is located.
# Your actual installation might differ from the one in the example.
# Make sure to verify the path or git would not be able to sign commits.
git config set gpg.program "C:\Program Files (x86)\GnuPG\bin\gpg.exe"

# Make sure to use fingerprint of the correct private key.
# Otherwise git and Github would be configure for different key pairs.
# You can list your keys using the command from a previous step.
git config set user.signingKey 3AA5C34371567BD2

# Enable GPG commit signing.
git config set commit.gpgSign true
```



# Congratulations!

I am glad to tell that you have completed the setup and can verify your results by creating a commit. Remember that your system might periodically ask you for the password you have used to encrypt your private key. **Do not share this password and the private key**.

I hope you enjoyed this tutorial. If so, please consider leaving a comment or a reaction below. Thank you for your attention!