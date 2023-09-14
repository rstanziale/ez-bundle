# EZ-BUNDLE

As a web developer I found myself in the situation of internationalizing a web application, and clearly after a few years the language bundles can grow out of proportion. It is also possible that the application has been modified, refactored, etc...

Now, are all the keys in the language bundles still being used?

This _tool_ allows you to answer that question.

## How it works

To be executed, it needs two things:

- A JSON file containing your bundle of keys to verify
- A target directory where you want to look for the keys in the bundle

## How to execute it

It is necessary to run the command:

```
node index.js bundle.json src/
```

Where _bundle.json_ and _src/_ are examples of arguments passed as input to the script.

## Performance

For large bundles, it may take a while, for example:

```
[2023-09-14T10:34:22.663Z] [INFO] Number of keys: 1422
[2023-09-14T10:34:22.666Z] [INFO] Starting process...
[2023-09-14T10:51:52.683Z] [INFO] End process!
```

With 1422 keys and more than 950 files to scan, it takes about 17 minutes to complete.

## Constraints

Currently, this tool only works on *Linux* shells. For Windows, you can run it on shells like [git bash](https://git-scm.com/download/win).

Also, it only searches for files with **ts** and **html** extensions.
