In the database, each password is stored hashed, with an accompanying salt.

These hashed and salt values were created using a function in the server's utils.js file, which is itself dependent on the npm package password-hash-and-salt.

For auditing purposes, and in case an auditor would like to validate the hashes and salts, the original passwords are listed below, which can be authenticated using the 'verifyAgainst' command in the password-hash-and-salt package.

This verification process is demonstrated in the server project file: tests.js.

UserId 1: Peter Singer
Password: ExpensiveSuit1

UserId 2: Peter Hurford
Password: K4rmaM4ster

UserId 3: Peter Thiel
Password: Bl00d0fTheY0ung

UserId 4: Peter Gaster
Password: Wingding

In case my final commit for this trial task does not include authentication, I have included this file to explain the dummy data values in the database.
