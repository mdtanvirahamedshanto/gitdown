# How to Create an Access Token on GitHub

GitHub access tokens provide a secure way to authenticate when interacting with the GitHub API or performing actions such as pushing to repositories. Here's a step-by-step guide on how to create an access token:

## Prerequisites

- **GitHub Account**: You need to have a GitHub account. If you don’t have one, sign up at [GitHub](https://github.com/).

## Steps

1. **Sign in to GitHub**: Go to [GitHub](https://github.com/) and sign in with your credentials.

2. **Access Personal Settings**:

   - Click on your profile icon in the top-right corner of the page.
   - From the dropdown menu, select `Settings`.

3. **Navigate to Developer Settings**:

   - In the left sidebar, scroll down and click on `Developer settings`.

4. **Access Personal Access Tokens**:

   - Under `Developer settings`, click on `Personal access tokens`.

5. **Generate New Token**:

   - Click on the `Generate new token` button.

6. **Configure Token**:

   - Enter a descriptive name for the token in the `Note` field to remember its purpose.
   - Select the desired scopes for the token based on the permissions you need. Scopes define what actions the token can perform.

7. **Generate Token**:

   - After configuring the token, scroll down and click on `Generate token`.

8. **Copy Token**:
   - Once the token is generated, GitHub will display it. **Copy the token immediately** as it will not be displayed again.

## Important Notes

- **Keep Your Token Secure**: Treat your access token like a password and keep it secure. Do not share it publicly or hardcode it in your code.
- **Token Expiry**: By default, tokens do not expire. However, it's good practice to review and revoke tokens that are no longer needed.

## Conclusion

Creating an access token on GitHub is essential for authenticating and performing various actions securely. Follow these steps to generate a token with the required permissions and integrate it into your workflows.
