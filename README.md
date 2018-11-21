# GRAPHCMS DATA MIGRATION

## Introduction

Simple utility for migrating data to a [GraphCMS](https://graphcms.com/) project database.

## How to Run

1. Go to the folder data and update the `csv` files with your own data
2. Create a `.env` file and populate it with the following settings:

```env
ENDPOINT=<YOUR_API_ENDPOINT>
TOKEN=<YOUR_TOKEN>
```

For the Token, create a new one if you don't have from your [GraphCMS](https://app.graphcms.com) dashboard(settings page). For permission, make sure to set it as `OPEN` to allow for both READ and WRITE operations. You'll find your `ENDPOINT` on the same page too,

3. Install dependencies

```bash
npm install
```

4. Run the script

After you have supplied your data in the `data/*csv` files, execute the following commands in order:

```bash
npm run categories
npm run posts
```

If you wish to clear out your database contents, you can execute the following command:

```bash
npm run reset
```

This will clear out content for Categories, Posts and Comments.

## LICENSE

MIT License

Copyright (c) 2018 Michael Wanyoike

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
