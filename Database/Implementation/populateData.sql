-- INSERT USERS
INSERT into User (UserId, UserFirstName, UserLastName, Username, PasswordHashed, Salt, IsActive) VALUES (1, "Peter", "Singer", "PSinger", "4a3e06108c0df6efa8af65b205f7d16ec765a57a73e9311403e0cc5860c9df913a6e177fe8eae2d6c2573c8c80fd57bc1c278aebababeb60c8028ad65fe590ff", "1867c1eb8a192f66f2cd4bd6878c5af1e54cba12f0514e50cbabc663c2d4e8644defae8fb93bc58853c7946ac2928f013e4421bb497f39812b094365d2750740", 1);

INSERT into User (UserId, UserFirstName, UserLastName, Username, PasswordHashed, Salt, IsActive) VALUES (2, "Peter", "Hurford", "HurfmasterP", "68ca91994a7843458c3917faf9bd7488ab850a4bd41ca37ffb39746174f3f9f05bd1a8098bcbba214e28b8cd7e3d159d8610edb743a865781229aa06eed87cee", "d10736a7e2e0b877fd1d103c9ddbc19d2bdd44bfedd4b57f273794de4e121f94300c9ffc6353a708de486cd34eb7f35c9c97c861576049397967d67ada5e2a43", 1);

-- Has no donations, in order to account for what happens in that case.
INSERT into User (UserId, UserFirstName, UserLastName, Username, PasswordHashed, Salt, IsActive) VALUES (3, "Peter", "Thiel", "PTCruiser", "2949a610c968815a9b3cd102017f27dff6d0ccb201a9c7958d89d79bc5394a677ca575763886dbd13c950918966e241fc76754967cd775edb6825a26a142b6bb", "2a94d3cea472e243095a876496194b866693db89fd4b70c468e8ef117e909b167319fa13909b50c426aed0c0839aec40a7483303112b58cae240a2c2b6240ab3", 1);

-- Inactive user. Cannot log in or view donations.
INSERT into User (UserId, UserFirstName, UserLastName, Username, PasswordHashed, Salt, IsActive) VALUES (4, "Peter", "Gaster", "CorePeterEssence", "44753c2d7b44cb7e2825cc5a60a2d78dde7c96db3ef0199e9afdb64bc3412c48b227231b3f1147853b989053e4249292da5ce2d8c387943e7d4bfe1d4a4323a9", "68065906e5aaca9a89f7fb50622efe9eb6c2993357b1aafc3fd4b40220841ce28d5aa07a3f3d87ed3cc314a8bf5140e0f1033122cebae64f9ad4da38627d0658", 0);

-- INSERT INCOMES
INSERT into UserIncome (UserIncomeId, UserId, Income, IsCurrent) VALUES (1, 1, 70000, 1);

-- include old income - this should be passed over in most use cases but is kept as legacy data
INSERT into UserIncome (UserIncomeId, UserId, Income, IsCurrent) VALUES (2, 2, 40000, 0);

INSERT into UserIncome (UserIncomeId, UserId, Income, IsCurrent) VALUES (3, 2, 50000, 1);

INSERT into UserIncome (UserIncomeId, UserId, Income, IsCurrent) VALUES (4, 3, 4000000, 1);

INSERT into UserIncome (UserIncomeId, UserId, Income, IsCurrent) VALUES (5, 4, 1000, 1);

-- INSERT PLEDGES
INSERT into UserPledge (UserPledgeId, UserId, PledgeAmount) VALUES (1, 1, 50);

INSERT into UserPledge (UserPledgeId, UserId, PledgeAmount) VALUES (2, 2, 15);

INSERT into UserPledge (UserPledgeId, UserId, PledgeAmount) VALUES (3, 3, 10);

INSERT into UserPledge (UserPledgeId, UserId, PledgeAmount) VALUES (4, 4, 10);

-- INSERT DONATIONS
INSERT into UserDonation (UserDonationId, UserId, Amount, DonatedDate, DonationOrg) VALUES (1, 1, 25000, "2017-1-1", "AMF");

INSERT into UserDonation (UserDonationId, UserId, Amount, DonatedDate, DonationOrg) VALUES (2, 1, 15000, "2017-2-5", "AMF");

INSERT into UserDonation (UserDonationId, UserId, Amount, DonatedDate, DonationOrg) VALUES (3, 2, 1124.50, "2017-1-7", "MIRI");

INSERT into UserDonation (UserDonationId, UserId, Amount, DonatedDate, DonationOrg) VALUES (4, 2, 4000, "2017-5-14", "ACE");

-- Neither the inactive user nor UserId 3 has made any donations this year.
