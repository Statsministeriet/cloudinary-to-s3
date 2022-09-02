# Migrate from Clodinary to AWS S3 🚀
This script will help you move you Cloudinary files to AWS S3.

## Getting started
#### AWS Credentials
You will need to create an IAM account with S3 Authorization (or full access for the quick and dirty 😉)

#### Cloudinary Credentials
You can set your Cloudinary credentials in the shell. [See reference](https://cloudinary.com/documentation/node_quickstart#set_your_api_environment_variable)

#### AWS S3 Bucket configurations
It should be a prerequiste that the bucket policy has ACL Disabled.
Make sure that Static website hosting is enabled. [Read more](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)