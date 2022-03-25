# CW-Kinesis-Processor

This Lambda Function Parses Lex CloudWatch Logs to output just the results of the conversation with Lex to a S3 bucket. This function only contains basic error checking and logging as well as hardcoded aspects.. This code is shared as a sample and not targetted for production without adding you own standards.

### Sample CloudWatch Log from Lex
```
{
    "timestamp": "2022-03-25T02:06:07.382Z",
    "messageVersion": "2.0",
    "requestId": "6181aaac-5ea3-4f86-a283-6b38084577c6",
    "sessionId": "455980081820937",
    "inputMode": "Text",
    "operationName": "RecognizeText",
    "developerOverride": false,
    "missedUtterance": false,
    "bot": {
        "name": "BookTrip-POC",
        "version": "DRAFT",
        "id": "RTH0HOHD3Q",
        "aliasName": "TestBotAlias",
        "aliasId": "TSTALIASID",
        "localeId": "en_US"
    },
    "sessionState": {
        "originatingRequestId": "e9c7c38c-fd55-4264-b70a-64fda8c939f0",
        "intent": {
            "name": "MakeAppointment",
            "state": "ReadyForFulfillment",
            "confirmationState": "Confirmed",
            "slots": {
                "AppointmentType": {
                    "value": {
                        "originalValue": "Trip",
                        "interpretedValue": "Trip",
                        "resolvedValues": []
                    },
                    "shape": "Scalar"
                },
                "Time": {
                    "value": {
                        "originalValue": "23:00",
                        "interpretedValue": "23:00",
                        "resolvedValues": [
                            "23:00"
                        ]
                    },
                    "shape": "Scalar"
                },
                "Date": {
                    "value": {
                        "originalValue": "Tomorrow",
                        "interpretedValue": "2022-03-25",
                        "resolvedValues": [
                            "2022-03-25"
                        ]
                    },
                    "shape": "Scalar"
                }
            }
        },
        "dialogAction": {
            "type": "Close"
        }
    },
    "interpretations": [
        {
            "nluConfidence": "1.00",
            "intent": {
                "name": "MakeAppointment",
                "state": "ReadyForFulfillment",
                "confirmationState": "Confirmed",
                "slots": {
                    "AppointmentType": {
                        "value": {
                            "originalValue": "Trip",
                            "interpretedValue": "Trip",
                            "resolvedValues": []
                        },
                        "shape": "Scalar"
                    },
                    "Time": {
                        "value": {
                            "originalValue": "23:00",
                            "interpretedValue": "23:00",
                            "resolvedValues": [
                                "23:00"
                            ]
                        },
                        "shape": "Scalar"
                    },
                    "Date": {
                        "value": {
                            "originalValue": "Tomorrow",
                            "interpretedValue": "2022-03-25",
                            "resolvedValues": [
                                "2022-03-25"
                            ]
                        },
                        "shape": "Scalar"
                    }
                }
            }
        },
        {
            "intent": {
                "name": "FallbackIntent",
                "slots": {}
            }
        }
    ],
    "inputTranscript": "yes"
}
```

### Sample output from Lambda
```
[
    {
        "nluConfidence": "1.00",
        "intent": {
            "name": "MakeAppointment",
            "state": "ReadyForFulfillment",
            "confirmationState": "Confirmed",
            "slots": {
                "AppointmentType": {
                    "value": {
                        "originalValue": "Trip",
                        "resolvedValues": [],
                        "interpretedValue": "Trip"
                    },
                    "shape": "Scalar"
                },
                "Time": {
                    "value": {
                        "originalValue": "23:00",
                        "resolvedValues": [
                            "23:00"
                        ],
                        "interpretedValue": "23:00"
                    },
                    "shape": "Scalar"
                },
                "Date": {
                    "value": {
                        "originalValue": "Tomorrow",
                        "resolvedValues": [
                            "2022-03-25"
                        ],
                        "interpretedValue": "2022-03-25"
                    },
                    "shape": "Scalar"
                }
            }
        }
    },
    {
        "intent": {
            "name": "FallbackIntent",
            "slots": {}
        }
    }
]
```

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. 
- `template.yaml` - A template that defines the application's AWS resources.

Resources for this project are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

## Deploy the sample application

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 14](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
my-application$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke S3JsonLoggerFunction --event events/event-s3.json
```